// Brand logos bundled from src/assets/brand-logos (file name = slug of brand name)
const BRAND_LOGOS = import.meta.glob('../assets/brand-logos/*.png', { eager: true, import: 'default' });

const SLUG_OVERRIDES = {
    'gigi-studios': 'gigistudios',
    'tiffany-co': 'tiffany',
};

export const slugify = (name) => {
    const base = name
        .toLowerCase()
        .replace(/&co\.?/g, '')
        .replace(/&/g, '-')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return SLUG_OVERRIDES[base] || base;
};

export const getBrandLogo = (name) => BRAND_LOGOS[`../assets/brand-logos/${slugify(name)}.png`];
