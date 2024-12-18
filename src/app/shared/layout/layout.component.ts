import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
    private breakpointObserver = inject(BreakpointObserver);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    public userStore = inject(UserStore);
    public uiStore = inject(UiStore);
    public title = 'Book of Chords';

    public hasSelectedItem = false;

    public isCompact$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(result => result.matches));
    public isMedium$ = this.breakpointObserver.observe([Breakpoints.Medium]).pipe(map(result => result.matches));
    public isLarge$ = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(map(result => result.matches));

    // Todo must come from parent component
    // Navigation items
    public navItems = [
        { icon: 'home', label: 'Home', route: '/' },
        {
            icon: 'library_music',
            label: 'Songs',
            route: '/songs',
            commands: ['/songs'],
        },
        {
            icon: 'event',
            label: 'Gigs',
            route: '/gigs',
            commands: ['/gigs'],
        },
        {
            icon: 'fitness_center',
            label: 'Exercises',
            route: '/exercises',
            commands: ['/exercises'],
        },
    ];

    public ngOnInit(): void {
        // Subscribe to router events to update hasSelectedItem
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                map(event => event.urlAfterRedirects),
            )
            .subscribe(url => {
                // Update hasSelectedItem based on your routing logic
                // For example, if detail routes contain an ID:
                this.hasSelectedItem = /\/[^/]+\/\d+/.test(url);
            });
    }

    public ngOnDestroy(): void {
        // Clean up any subscriptions if needed
    }

    public onBackdropClicked($event: MouseEvent): void {
        console.log($event);
    }

    public navigateBack(): void {
        this.router.navigate(['.'], { relativeTo: this.route });
    }
}
