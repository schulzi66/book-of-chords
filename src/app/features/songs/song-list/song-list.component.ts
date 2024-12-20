import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { SongsStore } from '../state/songs.store';

@Component({
    selector: 'boc-song-list',
    imports: [CommonModule, MatListModule],
    templateUrl: './song-list.component.html',
})
export class SongListComponent {
    public songsStore = inject(SongsStore);
    private readonly router = inject(Router);

    public selectSong(id: string): void {
        this.songsStore.selectSong(id);
        this.router.navigate(['/songs', id]);
    }
}
