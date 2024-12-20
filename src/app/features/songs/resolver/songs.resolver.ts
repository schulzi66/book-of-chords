import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SongsStore } from '../state/songs.store';

export const songsResolver: ResolveFn<boolean> = (route, state) => {
    const songsStore = inject(SongsStore);

    // E.g after logout and relogin there is still a song selected
    if (state.url === '/songs' && songsStore.selectedSong()) {
        songsStore.deselectSong();
    }

    return true;
};
