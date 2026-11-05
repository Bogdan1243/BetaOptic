import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const OUTLET_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['Optician', 'MedicalClinic'],
  '@id': 'https://betaoptic.ro/outlet#organization',
  name: 'Beta Optic Outlet',
  description:
    'Showroom de optică medicală și cabinet de consult oftalmologic în Timișoara (Str. Paris 2a), cu colecții de rame de vedere și ochelari de soare la prețuri speciale de outlet.',
  url: 'https://betaoptic.ro/outlet',
  telephone: '+40748241952',
  email: 'betaoptic@yahoo.com',
  image: 'https://betaoptic.ro/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Paris 2a',
    postalCode: '300003',
    addressLocality: 'Timișoara',
    addressRegion: 'Timiș',
    addressCountry: 'RO',
  },
  hasMap:
    'https://www.google.com/maps/search/?api=1&query=Strada+Paris+2a,+300003+Timi%C8%99oara',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  parentOrganization: {
    '@type': ['Optician', 'MedicalClinic'],
    '@id': 'https://betaoptic.ro/#organization',
    name: 'Beta Optic',
    url: 'https://betaoptic.ro/',
  },
  employee: [
    {
      '@type': 'Physician',
      name: 'Dr. Calaver Iancu Daniela',
      jobTitle: 'Medic Specialist Oftalmolog',
    },
    {
      '@type': 'Physician',
      name: 'Dr. Costache Georgiana Larisa',
      jobTitle: 'Medic Specialist Oftalmolog',
    },
    {
      '@type': 'Physician',
      name: 'Dr. Zinculescu Laura Miruna',
      jobTitle: 'Medic Specialist Oftalmolog',
    },
  ],
};

const DOCTORS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': 'https://betaoptic.ro/medici#clinic',
  name: 'Cabinet Oftalmologic Beta Optic Timișoara',
  description:
    'Cabinet de consult oftalmologic și optometrie clinică în cadrul Beta Optic Timișoara, Strada Lucian Blaga 7.',
  url: 'https://betaoptic.ro/medici',
  telephone: '+40721316224',
  email: 'contact@betaoptic.ro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Lucian Blaga 7',
    addressLocality: 'Timișoara',
    addressRegion: 'Timiș',
    addressCountry: 'RO',
  },
  parentOrganization: {
    '@id': 'https://betaoptic.ro/#organization',
  },
  employee: [
    {
      '@type': 'Physician',
      name: 'Dr. Gherman Cristiana',
      jobTitle: 'Medic Primar Oftalmolog',
    },
    {
      '@type': 'Physician',
      name: 'Dr. Oroș Nicoleta',
      jobTitle: 'Medic Specialist Oftalmolog',
    },
  ],
};

const ROUTES = [
  {
    view: 'home',
    outFile: 'index.html',
    title: 'Beta Optic: Optică Medicală, Consult Oftalmologic Timișoara',
    description:
      'Beta Optic Timișoara oferă servicii de optică medicală, consult oftalmologic, atelier propriu de montaj lentile și rame de ochelari pe Str. Lucian Blaga 7.',
    canonical: 'https://betaoptic.ro/',
    jsonLd: null, // keeps template JSON-LD
  },
  {
    view: 'outlet',
    outFile: path.join('outlet', 'index.html'),
    title: 'Beta Optic Outlet Timișoara: Rame, Ochelari de Soare & Consult Oftalmologic',
    description:
      'Beta Optic Outlet Timișoara (Str. Paris 2a) — colecții de rame de vedere și ochelari de soare la prețuri speciale de outlet, promoții zilnice și cabinet oftalmologic propriu.',
    canonical: 'https://betaoptic.ro/outlet',
    jsonLd: OUTLET_JSON_LD,
  },
  {
    view: 'doctors',
    outFile: path.join('medici', 'index.html'),
    title: 'Medici Oftalmologi Colaboratori — Beta Optic Timișoara',
    description:
      'Echipa de medici primari și specialiști oftalmologi de la Beta Optic Timișoara (Str. Lucian Blaga 7): Dr. Gherman Cristiana și Dr. Oroș Nicoleta. Consult oftalmologic și optometrie clinică.',
    canonical: 'https://betaoptic.ro/medici',
    jsonLd: DOCTORS_JSON_LD,
  },
];

function applyRouteMeta(template, route, appHtml) {
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${route.title}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  if (route.jsonLd) {
    const jsonString = JSON.stringify(route.jsonLd, null, 2)
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n');
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonString}\n    </script>`
    );
  }

  return html;
}

async function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  const template = await fs.readFile(indexHtmlPath, 'utf8');

  const serverEntryPath = path.join(SSR_DIR, 'entry-server.js');
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  for (const route of ROUTES) {
    const appHtml = render(route.view);
    const renderedHtml = applyRouteMeta(template, route, appHtml);
    const targetPath = path.join(DIST_DIR, route.outFile);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, renderedHtml, 'utf8');
    console.log(`Prerendered dist/${route.outFile} successfully.`);
  }

  await fs.rm(SSR_DIR, { recursive: true, force: true });
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
