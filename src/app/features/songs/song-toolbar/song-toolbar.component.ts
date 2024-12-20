import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { UiStore } from '../../../shared/state/ui.store';
import { SongsStore } from '../state/songs.store';

@Component({
    selector: 'boc-song-toolbar',
    imports: [MatIconModule, MatButtonModule, MatToolbarModule],
    templateUrl: './song-toolbar.component.html',
})
export class SongToolbarComponent {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    public songsStore = inject(SongsStore);
    public uiStore = inject(UiStore);

    public deselectSong(): void {
        this.songsStore.deselectSong();
        this.router.navigate(['..'], { relativeTo: this.route });
    }
}
