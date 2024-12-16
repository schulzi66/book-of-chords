import { Routes } from '@angular/router';
import { redirectToLoginIfNotAuthenticated, redirectToSongsIfAuthenticated } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'songs',
    },
    {
        path: 'login',
        loadComponent: () => import('./feature/login/login.component').then(c => c.LoginComponent),
        canActivate: [redirectToSongsIfAuthenticated],
    },
    {
        path: '',
        loadComponent: () => import('./shared/layout/layout.component').then(c => c.LayoutComponent),
        canActivate: [redirectToLoginIfNotAuthenticated],
        children: [
            {
                path: 'songs',
                loadComponent: () => import('./feature/songs/songs.component').then(c => c.SongsComponent),
            },
        ],
    },
];
