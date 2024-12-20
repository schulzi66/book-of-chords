import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { SongsStore } from '../state/songs.store';

export const songResolver: ResolveFn<boolean> = route => {
    const songsStore = inject(SongsStore);
    const router = inject(Router);

    // If no song id is provided or no songs are loaded, navigate to the songs list
    if (!route.params['id'] || !songsStore.songs().length) {
        return router.navigate(['/songs']);
    }

    songsStore.selectSong(route.params['id']);

    return true;
};
