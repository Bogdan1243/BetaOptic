import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const OUTLET_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Optician', 'MedicalClinic'],
      '@id': 'https://betaoptic.ro/outlet#organization',
      name: 'Beta Optic Outlet',
      alternateName: 'Beta Optic Outlet Timișoara',
      description:
        'Showroom de optică medicală și cabinet de consult oftalmologic în Timișoara (Str. Paris 2a), cu colecții de rame de vedere și ochelari de soare la prețuri speciale de outlet.',
      url: 'https://betaoptic.ro/outlet',
      telephone: '+40748241952',
      email: 'betaoptic@yahoo.com',
      image: 'https://betaoptic.ro/og-image.jpg',
      medicalSpecialty: ['Ophthalmology', 'Optometric'],
      areaServed: {
        '@type': 'City',
        name: 'Timișoara',
      },
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
          medicalSpecialty: 'Ophthalmology',
        },
        {
          '@type': 'Physician',
          name: 'Dr. Costache Georgiana Larisa',
          jobTitle: 'Medic Specialist Oftalmolog',
          medicalSpecialty: 'Ophthalmology',
        },
        {
          '@type': 'Physician',
          name: 'Dr. Zinculescu Laura Miruna',
          jobTitle: 'Medic Specialist Oftalmolog',
          medicalSpecialty: 'Ophthalmology',
        },
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Rame de vedere începând de la 100 RON',
          priceCurrency: 'RON',
          price: '100',
          description:
            'Colecții de rame de vedere și ochelari de soare originale la prețuri speciale de outlet în Timișoara.',
        },
        {
          '@type': 'Offer',
          name: 'Consult Oftalmologic în cadrul Beta Optic Outlet',
          description:
            'Consult oftalmologic realizat de medici specialiști oftalmologi (gratuit în lunile Noiembrie și Decembrie).',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://betaoptic.ro/outlet#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beta Optic Timișoara',
          item: 'https://betaoptic.ro/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Beta Optic Outlet Timișoara',
          item: 'https://betaoptic.ro/outlet',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://betaoptic.ro/outlet#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Ce este Beta Optic Outlet și ce găsesc aici?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beta Optic Outlet este showroom-ul nostru din Timișoara unde găsești colecții de rame de vedere și ochelari de soare atent selecționate la prețuri speciale de outlet.',
          },
        },
        {
          '@type': 'Question',
          name: 'Unde se află Beta Optic Outlet și ce program are?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Showroom-ul Beta Optic Outlet se află pe Strada Paris 2a, 300003 Timișoara. Te așteptăm de luni până vineri în intervalul orar 10:00–18:00 (sâmbăta și duminica este închis).',
          },
        },
        {
          '@type': 'Question',
          name: 'Se fac consultații oftalmologice și în locația Outlet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Da, Beta Optic Outlet dispune de propriul cabinet oftalmologic, unde oferă consultații medicii specialiști oftalmologi Dr. Calaver Iancu Daniela, Dr. Costache Georgiana Larisa și Dr. Zinculescu Laura Miruna.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ce promoții și oferte găsesc la Beta Optic Outlet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rame începând de la 100 de lei, iar în lunile Noiembrie și Decembrie beneficiați de consult gratuit.',
          },
        },
        {
          '@type': 'Question',
          name: 'Cum mă pot programa la Beta Optic Outlet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Te poți programa telefonic la: +40 748 241 952 ori în sediul de pe Strada Paris 2a, Timișoara, de luni până vineri (10:00–18:00).',
          },
        },
        {
          '@type': 'Question',
          name: 'Pot comanda ochelari compleți cu lentile personalizate în Outlet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Da, ramele alese în Outlet pot fi echipate cu lentile oftalmice personalizate conform rețetei tale, prelucrate și montate cu precizie în atelierul propriu Beta Optic din Timișoara.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ramele din Outlet au aceeași calitate și garanție?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolut: toate ramele de vedere, ochelarii de soare și lentilele din Beta Optic Outlet sunt originale și beneficiază de aceeași calitate garantată, consiliere de specialitate și montaj verificat Beta Optic.',
          },
        },
        {
          '@type': 'Question',
          name: 'Care este diferența dintre sediul central și Beta Optic Outlet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sediul de pe Str. Lucian Blaga 7 reunește colecțiile actuale de lux și atelierul de montaj, iar Outlet-ul de pe Str. Paris 2a oferă colecții selecționate la prețuri speciale și cabinet oftalmologic propriu.',
          },
        },
      ],
    },
  ],
};

const DOCTORS_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': 'https://betaoptic.ro/medici#clinic',
      name: 'Cabinet Oftalmologic Beta Optic Timișoara',
      description:
        'Cabinet de consult oftalmologic și optometrie clinică în cadrul Beta Optic Timișoara, Strada Lucian Blaga 7.',
      url: 'https://betaoptic.ro/medici',
      telephone: '+40721316224',
      email: 'contact@betaoptic.ro',
      medicalSpecialty: ['Ophthalmology', 'Optometric'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Strada Lucian Blaga 7',
        postalCode: '300002',
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
          medicalSpecialty: 'Ophthalmology',
        },
        {
          '@type': 'Physician',
          name: 'Dr. Oroș Nicoleta',
          jobTitle: 'Medic Specialist Oftalmolog',
          medicalSpecialty: 'Ophthalmology',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://betaoptic.ro/medici#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beta Optic Timișoara',
          item: 'https://betaoptic.ro/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Medici Oftalmologi Colaboratori',
          item: 'https://betaoptic.ro/medici',
        },
      ],
    },
  ],
};

const ROUTES = [
  {
    view: 'home',
    outFile: 'index.html',
    description:
      'Beta Optic Timișoara oferă servicii de optică medicală, consult oftalmologic, atelier propriu de montaj lentile și rame de ochelari pe Str. Lucian Blaga 7.',
    canonical: 'https://betaoptic.ro/',
    jsonLd: null, // keeps template JSON-LD
  },
  {
    view: 'outlet',
    outFile: path.join('outlet', 'index.html'),
    description:
      'Beta Optic Outlet Timișoara (Str. Paris 2a) — colecții de rame de vedere și ochelari de soare la prețuri speciale de outlet, promoții zilnice și cabinet oftalmologic propriu.',
    canonical: 'https://betaoptic.ro/outlet',
    jsonLd: OUTLET_JSON_LD,
  },
  {
    view: 'doctors',
    outFile: path.join('medici', 'index.html'),
    description:
      'Echipa de medici primari și specialiști oftalmologi de la Beta Optic Timișoara (Str. Lucian Blaga 7): Dr. Gherman Cristiana și Dr. Oroș Nicoleta. Consult oftalmologic și optometrie clinică.',
    canonical: 'https://betaoptic.ro/medici',
    jsonLd: DOCTORS_JSON_LD,
  },
  {
    view: 'lenses',
    outFile: path.join('lentile-ochelari-timisoara', 'index.html'),
    description:
      'Lentile de ochelari în Timișoara la Beta Optic (Str. Lucian Blaga 7): singurii parteneri oficiali Nikon în Timișoara, plus lentile progresive și monofocale Zeiss, Hoya, Essilor și ItalLenti.',
    canonical: 'https://betaoptic.ro/lentile-ochelari-timisoara',
    jsonLd: null,
  },
  {
    view: 'frames',
    outFile: path.join('rame-ochelari-timisoara', 'index.html'),
    description:
      'Rame de ochelari de vedere și ochelari de soare în Timișoara la Beta Optic: Brunello Cucinelli, Linda Farrow, Henry Jullien, Blackfin, Miu Miu, Maui Jim, Ray-Ban, Tom Ford și 50 de branduri.',
    canonical: 'https://betaoptic.ro/rame-ochelari-timisoara',
    jsonLd: null,
  },
  {
    view: 'atelier',
    outFile: path.join('atelier-montaj-ochelari', 'index.html'),
    description:
      'Atelier propriu de montaj lentile și ajustare ochelari în Timișoara (Str. Lucian Blaga 7) cu echipamente computerizate Nidek și Essilor Mr. Blue conform standardului ISO 8980.',
    canonical: 'https://betaoptic.ro/atelier-montaj-ochelari',
    jsonLd: null,
  },
  {
    view: 'privacy',
    outFile: path.join('politica-de-confidentialitate', 'index.html'),
    description:
      'Politica de Confidențialitate (GDPR) și Regulamentul Oficial al Campaniei Voucher 100 RON Reducere la Beta Optic Timișoara.',
    canonical: 'https://betaoptic.ro/politica-de-confidentialitate',
    jsonLd: null,
  },
  {
    view: 'unsubscribe',
    outFile: path.join('dezabonare', 'index.html'),
    description:
      'Pagină de dezabonare și retragere a consimțământului GDPR pentru comunicările comerciale pe WhatsApp Beta Optic Timișoara.',
    canonical: 'https://betaoptic.ro/dezabonare',
    jsonLd: null,
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
  const { render, PAGE_TITLES } = await import(pathToFileURL(serverEntryPath).href);

  for (const route of ROUTES) {
    const title = PAGE_TITLES[route.view] || PAGE_TITLES.home;
    const appHtml = render(route.view);
    const renderedHtml = applyRouteMeta(template, { ...route, title }, appHtml);
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
