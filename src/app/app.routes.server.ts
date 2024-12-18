import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'songs/:id',
        renderMode: RenderMode.Client,
    },
    {
        path: '**',
        renderMode: RenderMode.Prerender,
    },
];
