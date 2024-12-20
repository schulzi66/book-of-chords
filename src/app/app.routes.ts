import { Routes } from '@angular/router';
import { songResolver } from './features/songs/resolver/song.resolver';
import { songsResolver } from './features/songs/resolver/songs.resolver';
import { SongsStore } from './features/songs/state/songs.store';
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
                providers: [SongsStore],
                resolve: [songsResolver],
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./features/songs/songs-layout/songs-layout.component').then(c => c.SongsLayoutComponent),
                        children: [
                            {
                                path: '',
                                loadComponent: () => import('./features/songs/song-list/song-list.component').then(c => c.SongListComponent),
                                outlet: 'list',
                            },
                            {
                                path: ':id',
                                loadComponent: () => import('./features/songs/song-detail/song-detail.component').then(c => c.SongDetailComponent),
                                resolve: [songResolver],
                            },
                        ],
                    },
                    {
                        path: '',
                        loadComponent: () => import('./features/songs/song-toolbar/song-toolbar.component').then(c => c.SongToolbarComponent),
                        outlet: 'toolbar',
                    },
                ],
            },
            // Add similar patterns for gigs and exercises
        ],
    },
];
