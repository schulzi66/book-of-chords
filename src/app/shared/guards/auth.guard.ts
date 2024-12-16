import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const redirectToLoginIfNotAuthenticated: CanActivateFn = async () => {
    const router = inject(Router);
    const auth = inject(Auth);

    await auth.authStateReady(); // use user store evt?

    if (!auth.currentUser) {
        return router.parseUrl('/login');
    }

    return true;
};

export const redirectToSongsIfAuthenticated: CanActivateFn = async() => {
    const router = inject(Router);
    const auth = inject(Auth);

    await auth.authStateReady();

    if (auth.currentUser) {
        return router.parseUrl('/songs');
    }

    return true;
};
