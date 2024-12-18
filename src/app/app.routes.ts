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
        loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent),
        canActivate: [redirectToSongsIfAuthenticated],
    },
    {
        path: '',
        loadComponent: () => import('./shared/layout/layout.component').then(c => c.LayoutComponent),
        canActivate: [redirectToLoginIfNotAuthenticated],
        children: [
            {
                path: 'songs',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./features/songs/song-list/song-list.component')
                            .then(c => c.SongListComponent),
                        outlet: 'list'
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('./features/songs/song-detail/song-detail.component')
                            .then(c => c.SongDetailComponent)
                    }
                ]
            },
            // Add similar patterns for gigs and exercises
        ],
    },
];
