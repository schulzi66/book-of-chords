import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { UiStore } from '../state/ui.store';
import { UserStore } from '../state/user.store';

@Component({
    selector: 'boc-layout',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatBottomSheetModule,
        MatProgressBarModule,
    ],
    templateUrl: './layout.component.html',
    standalone: true,
})
export class LayoutComponent {
    private breakpointObserver = inject(BreakpointObserver);
    public userStore = inject(UserStore);
    public uiStore = inject(UiStore);
    public title = 'Book of Chords';

    public drawer = viewChild<MatSidenav>(MatSidenav);

    public isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(map(result => result.matches));

    // Navigation items
    public navItems = [
        { icon: 'home', label: 'Home', route: '/' },
        { icon: 'library_music', label: 'Songs', route: '/songs' },
        { icon: 'event', label: 'Gigs', route: '/gigs' },
        { icon: 'fitness_center', label: 'Exercises', route: '/exercises' },
    ];
}
