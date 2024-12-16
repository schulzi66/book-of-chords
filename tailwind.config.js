// import { withMaterialColors } from 'tailwind-material-colors';

/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        colors: {
            'background': 'var(--mat-sys-background)',
            'error-container': 'var(--mat-sys-error-container)',
            'error': 'var(--mat-sys-error)',
            'inverse-on-surface': 'var(--mat-sys-inverse-on-surface)',
            'inverse-primary': 'var(--mat-sys-inverse-primary)',
            'inverse-surface': 'var(--mat-sys-inverse-surface)',
            'on-background': 'var(--mat-sys-on-background)',
            'on-error-container': 'var(--mat-sys-on-error-container)',
            'on-error': 'var(--mat-sys-on-error)',
            'on-primary-container': 'var(--mat-sys-on-primary-container)',
            'on-primary-fixed-variant': 'var(--mat-sys-on-primary-fixed-variant)',
            'on-primary-fixed': 'var(--mat-sys-on-primary-fixed)',
            'on-primary': 'var(--mat-sys-on-primary)',
            'on-secondary-container': 'var(--mat-sys-on-secondary-container)',
            'on-secondary-fixed-variant': 'var(--mat-sys-on-secondary-fixed-variant)',
            'on-secondary-fixed': 'var(--mat-sys-on-secondary-fixed)',
            'on-secondary': 'var(--mat-sys-on-secondary)',
            'on-surface-variant': 'var(--mat-sys-on-surface-variant)',
            'on-surface': 'var(--mat-sys-on-surface)',
            'on-tertiary-container': 'var(--mat-sys-on-tertiary-container)',
            'on-tertiary-fixed-variant': 'var(--mat-sys-on-tertiary-fixed-variant)',
            'on-tertiary-fixed': 'var(--mat-sys-on-tertiary-fixed)',
            'on-tertiary': 'var(--mat-sys-on-tertiary)',
            'outline-variant': 'var(--mat-sys-outline-variant)',
            'outline': 'var(--mat-sys-outline)',
            'primary-container': 'var(--mat-sys-primary-container)',
            'primary-fixed-dim': 'var(--mat-sys-primary-fixed-dim)',
            'primary-fixed': 'var(--mat-sys-primary-fixed)',
            'primary': 'var(--mat-sys-primary)',
            'scrim': 'var(--mat-sys-scrim)',
            'secondary-container': 'var(--mat-sys-secondary-container)',
            'secondary-fixed-dim': 'var(--mat-sys-secondary-fixed-dim)',
            'secondary-fixed': 'var(--mat-sys-secondary-fixed)',
            'secondary': 'var(--mat-sys-secondary)',
            'shadow': 'var(--mat-sys-shadow)',
            'surface-bright': 'var(--mat-sys-surface-bright)',
            'surface-container-high': 'var(--mat-sys-surface-container-high)',
            'surface-container-highest': 'var(--mat-sys-surface-container-highest)',
            'surface-container-low': 'var(--mat-sys-surface-container-low)',
            'surface-container-lowest': 'var(--mat-sys-surface-container-lowest)',
            'surface-container': 'var(--mat-sys-surface-container)',
            'surface-dim': 'var(--mat-sys-surface-dim)',
            'surface-tint': 'var(--mat-sys-surface-tint)',
            'surface-variant': 'var(--mat-sys-surface-variant)',
            'surface': 'var(--mat-sys-surface)',
            'tertiary-container': 'var(--mat-sys-tertiary-container)',
            'tertiary-fixed-dim': 'var(--mat-sys-tertiary-fixed-dim)',
            'tertiary-fixed': 'var(--mat-sys-tertiary-fixed)',
            'tertiary': 'var(--mat-sys-tertiary)',
        },
        extend: {},
    },
    plugins: [],
};

// const config = {
//     content: [
//         "./src/**/*.{html,ts}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }

// export default withMaterialColors(config, {
//     // Your base colors as HEX values. 'primary' is required.
//     primary: '#EB8D04',
//     // secondary and/or tertiary are optional, if not set they will be derived from the primary color.
//     secondary: '#A9D600',
//     tertiary: '#A9D600',
//     // add any named colors you need:
//     bocOrange: '#FF9800',
// },
//     {
//         /* one of 'content', 'expressive', 'fidelity', 'monochrome', 'neutral', 'tonalSpot' or 'vibrant' */
//         scheme: 'content',
//         // contrast is optional and ranges from -1 (less contrast) to 1 (more contrast).
//         contrast: 0,
//     });
