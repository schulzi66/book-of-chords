import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserStore } from '../../shared/state/user.store';

@Component({
    selector: 'boc-songs',
    imports: [JsonPipe],
    templateUrl: './songs.component.html',
    standalone: true,
})
export class SongsComponent {
    public readonly userStore = inject(UserStore);
}
