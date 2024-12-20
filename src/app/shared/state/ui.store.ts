import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { effect, inject, InjectionToken } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { map } from 'rxjs';

type UiState = {
    darkMode: boolean;
    isCompact: boolean;
    isMedium: boolean;
    isLarge: boolean;
};

const INITIAL_UI_STATE = new InjectionToken<UiState>('UiState', {
    factory: () => {
        return {
            darkMode: localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true',
            isCompact: false,
            isMedium: false,
            isLarge: false,
        };
    },
});

export const UiStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(INITIAL_UI_STATE)),
    withComputed(() => {
        const breakpointObserver = inject(BreakpointObserver);

        return {
            isCompact: toSignal(breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(result => result.matches))),
            isMedium: toSignal(breakpointObserver.observe([Breakpoints.Medium]).pipe(map(result => result.matches))),
            isLarge: toSignal(breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(map(result => result.matches))),
        };
    }),
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
        toggleDarkMode: (): void => patchState(store, { darkMode: !store.darkMode() }),
    })),
);
