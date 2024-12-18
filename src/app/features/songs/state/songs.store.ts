import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface SongSection {
    name: string;
    value: string[];
}

interface Song {
    id: string;
    name?: string;
    uid?: string;
    sections?: SongSection[];
    bpm?: number;
    pictures?: string[];
    pdfs?: string[];
    sound?: string;
    bandId?: string;
    isArchived?: boolean;
}

type SongsState = {
    songs: Song[];
    selectedSong: Song | undefined;
    loading: boolean;
    error: string | undefined;
};

export const SongsStore = signalStore(
    withState<SongsState>({
        songs: [
            { id: '1', name: 'Song 1' },
            { id: '2', name: 'Song 2' },
            { id: '3', name: 'Song 3' },
        ],
        selectedSong: undefined,
        loading: false,
        error: undefined,
    }),
    withMethods(store => {
        const router = inject(Router);
        const route = inject(ActivatedRoute);

        return {
            selectSong: (id: string) => {
                patchState(store, { selectedSong: store.songs().find(song => song.id === id) });
                router.navigate(['/songs', id]);
            },
            deselectSong: () => {
                patchState(store, { selectedSong: undefined });
                router.navigate(['..'], { relativeTo: route });
            },
        };
    }),
);
