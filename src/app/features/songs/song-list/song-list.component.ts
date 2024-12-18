import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SongsStore } from '../state/songs.store';

@Component({
    selector: 'boc-song-list',
    imports: [CommonModule, MatListModule],
    templateUrl: './song-list.component.html',
})
export class SongListComponent {
    public songsStore = inject(SongsStore);
}
