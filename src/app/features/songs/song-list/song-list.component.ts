import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
    selector: 'boc-song-list',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule
    ],
    templateUrl: './song-list.component.html',
})
export class SongListComponent {
    private router = inject(Router);

    // Temporary mock data - replace with actual data service
    public songs = [
        { id: '1', title: 'Song 1' },
        { id: '2', title: 'Song 2' },
        { id: '3', title: 'Song 3' },
    ];

    public onSongSelect(songId: string): void {
        this.router.navigate(['/songs', songId]);
    }
}
