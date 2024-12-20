import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsStore } from '../state/songs.store';

@Component({
    selector: 'boc-song-detail',
    imports: [CommonModule],
    template: `
        <div class="p-4">
            <h2>Song Details</h2>
            <p>Song ID: {{ songsStore.selectedSong()?.id }}</p>
            <p>Song Name: {{ songsStore.selectedSong()?.name }}</p>
            <!-- Add your detail view content here -->
        </div>
    `
})
export class SongDetailComponent {
    private readonly route = inject(ActivatedRoute);
    public songsStore = inject(SongsStore);


}
