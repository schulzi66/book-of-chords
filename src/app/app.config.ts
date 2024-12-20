import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideFirebaseApp(() => {
        //     if (isPlatformBrowser(inject(PLATFORM_ID))) {
        //         console.log('Initializing app for browser');
        //         return initializeApp(environment.firebase);
        //     }
        //     // Optional, since it's null in dev-mode and SSG
        //     const request = inject(REQUEST, { optional: true });
        //     console.log('Request', request);
        //     const authIdToken = request?.headers.get('authorization')?.split('Bearer ')[1];
        //     console.log('Initializing app for server', authIdToken);
        //     return initializeServerApp(environment.firebase, {
        //         authIdToken,
        //         releaseOnDeref: request || undefined,
        //     });
        // }),
        provideAuth(() => {
            const auth = getAuth();
            if (environment.useEmulators) {
                connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
            }
            return auth;
        }),
        // provideAppCheck(() => {
        //   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
        //   const provider =
        //     new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
        //   return initializeAppCheck(undefined, {
        //     provider,
        //     isTokenAutoRefreshEnabled: true,
        //   });
        // }),
        provideFirestore(() => {
            const firestore = getFirestore();
            // TODO find out how to enable persistence for offline mode
            if (environment.useEmulators) {
                connectFirestoreEmulator(firestore, '127.0.0.1', 7070);
            }
            return firestore;
        }),
        provideFunctions(() => getFunctions()),
        providePerformance(() => getPerformance()),
        provideStorage(() => {
            const storage = getStorage();
            if (environment.useEmulators) {
                connectStorageEmulator(storage, '127.0.0.1', 9199);
            }
            return storage;
        }),
        provideRemoteConfig(() => getRemoteConfig()),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
    ],
};
