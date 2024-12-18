import { effect, inject, InjectionToken } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

type UiState = {
    darkMode: boolean;
};

const INITIAL_UI_STATE = new InjectionToken<UiState>('UiState', {
    factory: () => {
        return {
            darkMode: localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true',
        };
    },
});

export const UiStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(INITIAL_UI_STATE)),
    withHooks({
        onInit: store => {
            effect(() => {
                localStorage.setItem('darkMode', store.darkMode().toString());
                document.documentElement.style.colorScheme = store.darkMode() ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', store.darkMode());
            });
        },
    }),
    withMethods(store => ({
        toggleDarkMode: () => patchState(store, { darkMode: !store.darkMode() }),
    })),
);
