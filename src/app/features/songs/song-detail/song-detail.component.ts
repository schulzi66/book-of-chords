import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'boc-song-detail',
    imports: [CommonModule],
    template: `
        <div class="p-4">
            <h2>Song Details</h2>
            <p>Song ID: {{ songId }}</p>
            <!-- Add your detail view content here -->
        </div>
    `
})
export class SongDetailComponent {
    private readonly route = inject(ActivatedRoute);
    public songId: string | null = null;

    public ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.songId = params.get('id');
        });
    }
}
