import { inject, InjectionToken } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

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

const INITIAL_SONGS_STATE = new InjectionToken<SongsState>('SongsState', {
    factory: () => {
        const songs = localStorage.getItem('songs') ? JSON.parse(localStorage.getItem('songs')!) : [];

        return {
            songs,
            selectedSong: undefined,
            loading: songs.length === 0,
            error: undefined,
        };
    },
});

export const SongsStore = signalStore(
    withState(() => inject(INITIAL_SONGS_STATE)),
    withMethods(store => {
        const firestore = inject(Firestore);
        const auth = inject(Auth);

        return {
            selectSong: (id: string): void => {
                patchState(store, { selectedSong: store.songs().find(song => song.id === id) });
            },
            deselectSong: (): void => {
                patchState(store, { selectedSong: undefined });
            },
            saveSongs: (): void => {
                // TODO save songs to firestore
                localStorage.setItem('songs', JSON.stringify(store.songs()));
            },
            loadSongs: async (): Promise<void> => {
                const songsCollection = collection(firestore, 'songs');
                const q = query(songsCollection, where('uid', '==', auth.currentUser?.uid), orderBy('name', 'asc'));
                const songs = await getDocs(q);

                patchState(store, { songs: songs.docs.map(doc => doc.data() as Song), loading: false });
                localStorage.setItem('songs', JSON.stringify(store.songs()));
            },
        };
    }),
    withHooks({
        onInit: store => {
            store.loadSongs();
        },
    }),
);
