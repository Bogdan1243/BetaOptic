// Brand logos bundled from src/assets/brand-logos (file name = slug of brand name)
const BRAND_LOGOS = import.meta.glob('../assets/brand-logos/*.png', { eager: true, import: 'default' });

export const slugify = (name) =>
    name
        .toLowerCase()
        .replace(/&co\.?/g, '')
        .replace(/&/g, '-')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const getBrandLogo = (name) => BRAND_LOGOS[`../assets/brand-logos/${slugify(name)}.png`];
