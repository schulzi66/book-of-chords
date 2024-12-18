import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStore } from '../../../shared/state/ui.store';
import { SongsStore } from '../state/songs.store';

@Component({
  selector: 'boc-songs-layout',
  imports: [RouterOutlet],
  templateUrl: './songs-layout.component.html',
})
export class SongsLayoutComponent {
    public uiStore = inject(UiStore);
    public songsStore = inject(SongsStore);
}
