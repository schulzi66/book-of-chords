import { inject } from '@angular/core';
import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    bandId?: string;
    bandIds?: Array<string>;

    fcmTokens?: { [token: string]: true };
}

type UserState = {
    user: User | undefined;
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState<UserState>({ user: undefined }),
    withMethods(() => {
        const router = inject(Router);
        const auth = inject(Auth);

        return {
            login: async (): Promise<boolean> => {
                await signInWithPopup(auth, new GoogleAuthProvider());

                return router.navigate(['/songs']);
            },
            logout: async (): Promise<boolean> => {
                await signOut(auth);

                return router.navigate(['/login']);
            },
        };
    }),
    withHooks({
        onInit: store => {
            const auth = inject(Auth);
            const firestore = inject(Firestore);
            onAuthStateChanged(auth, async authUser => {
                if (!authUser) {
                    patchState(store, { user: undefined });
                    return;
                }

                const user = await getDoc(doc(firestore, 'users', authUser.uid));

                patchState(store, { user: user.data() as User });
            });
        },
    }),
);
