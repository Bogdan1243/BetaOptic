import myVideo from '../assets/Video_Atelier.mp4';
export const HERO_DATA = {
  slogan: "Vizibilitatea ta, viziunea noastră",
  welcomeMessages: [
    "personalizează-ți acuitatea vizuală cu suportul nostru, analizăm nevoile vizuale,",
    "construim cele mai corecte variante, avem nevoie de mai mulți ochelari :)",
    "te așteptăm cu rețeta de la medicul tău, actualizată",
    "analizăm istoricul, urmărim evoluția"
  ]
};

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Analiza Nevoilor Vizuale",
    description: "Analiza nevoilor vizuale corelată cu activitatea ta (serviciu, timp liber, sport etc.)",
    icon: "Activity"
  },
  {
    number: "02",
    title: "Alegerea Ramelor",
    description: "Alegerea ramelor adaptate stilului personal și activităților",
    icon: "Glasses"
  },
  {
    number: "03",
    title: "Alegerea Lentilelor",
    description: "Alegerea lentilelor tehnologizate conform specificațiilor optice ideale",
    icon: "Disc"
  },
  {
    number: "04",
    title: "Măsurarea Parametrilor",
    description: "Măsurarea parametrilor personalizați cu rigurozitate milimetrică",
    icon: "Ruler"
  },
  {
    number: "05",
    title: "Ajustarea Ramei",
    description: "Ajustarea anatomică a ramei pentru un confort purtării fără presiune",
    icon: "Sliders"
  },
  {
    number: "06",
    title: "Montarea în Laborator",
    description: "Montarea lentilelor în laboratorul nostru de înaltă precizie",
    icon: "Wrench"
  },
  {
    number: "07",
    title: "Verificarea Parametrilor",
    description: "Verificarea parametrilor și controlul de calitate la finalizarea ochelarilor",
    icon: "CheckCircle2"
  }
];

export const LENS_BRANDS_MAIN = [
  {
    id: "nikon",
    name: "Nikon",
    tagline: "Inginerie Ultra-Subțire de Înaltă Definiție",
    origin: "Japonia",
    badge: "Singurii Parteneri Oficiali Nikon din Timișoara",
    text: "Nikon: Măiestria legendară a opticii nipone, tradusă într-o estetică a invizibilului. Suntem singurii parteneri oficiali Nikon din Timișoara. Lentilele Nikon se disting printr-un design ultra-plat și o reducere remarcabilă a grosimii, păstrând liniile feței complet nealterate. O performanță vizuală de înaltă definiție, ascunsă în lentile de o finețe și o transparență aristocratice."
  },
  {
    id: "hoya",
    name: "Hoya",
    tagline: "Rezistență Extremă & Minimalism Japonez",
    origin: "Japonia",
    badge: "Durabilitate Impecabilă",
    text: "Hoya: Echilibrul perfect între durabilitate inegalabilă și estetică minimalistă japoneză. Prin tratamente premium de o rezistență extraordinară, lentilele Hoya sunt concepute să își păstreze puritatea în timp, integrându-se perfect în cele mai subțiri și prețioase rame. Luxul de a te bucura de claritate constantă, într-o formă estetică impecabilă."
  },
  {
    id: "zeiss",
    name: "Zeiss",
    tagline: "Optică Germană Supremă • Din 1846",
    origin: "Germania",
    badge: "Etalon Absolut",
    text: "Zeiss: Etalonul absolut al opticii germane, cu o moștenire de peste 175 de ani. O lentilă Zeiss nu doar corectează vederea, ci oferă o puritate vizuală incontestabilă. Este alegerea naturală a celor care refuză compromisul, unde luxul se traduce printr-o claritate impecabilă și tratamente antireflex invizibile, care lasă privirea și eleganța ramei să vorbească de la sine."
  },
  {
    id: "essilor",
    name: "Essilor",
    tagline: "Pionieri ai Lentilei Progresive",
    origin: "Franța",
    badge: "Inovație Continuă",
    text: "Essilor: Tradiția și inovația franceză, dedicate unui confort vizual obținut fără cel mai mic efort. Inventatori ai lentilei progresive, Essilor transformă complexitatea științifică într-o experiență vizuală fluidă. Un lux al vederii perfect adaptate, care însoțește un stil de viață exigent cu o discreție tehnologică absolută."
  }
];



export const FRAME_BRANDS_MAIN = [
  {
    id: "brunello-cucinelli",
    name: "Brunello Cucinelli",
    tagline: "Eleganță Subtilă din Solomeo",
    materials: "Corn Natural • Titan • Acetat Fin",
    text: "Brunello Cucinelli: O expresie desăvârșită a filozofiei din Solomeo, unde luxul nu strigă, ci se simte. Ramele Brunello Cucinelli sunt eliberate de orice monogramă ostentativă, prestanța lor fiind trădată exclusiv de noblețea absolută a materialelor: corn natural, titan și acetați fini. O estetică a rafinamentului suprem, dedicată celor care preferă o eleganță asumată, rezervată și invizibilă maselor."
  },
  {
    id: "linda-farrow",
    name: "Linda Farrow",
    tagline: "Piese de Moștenire & Detalii din Aur",
    materials: "Acetat Japonez • Aur 22K • Titan",
    text: "Linda Farrow: O reinterpretare a siluetelor iconice ale anilor ’70, transformate în veritabile piese de moștenire. Departe de capriciile modei trecătoare, ramele Linda Farrow se disting prin densitatea excepțională a acetaților japonezi și strălucirea caldă a detaliilor din metale prețioase. Un echilibru perfect între o prezență vizuală marcantă și un rafinament clasic, de o prestanță incontestabilă."
  },
  {
    id: "blackfin",
    name: "Blackfin",
    tagline: "Minimalism Arhitectural din Dolomiți",
    materials: "Titan Japonez Pur • Prelucrare Manuală",
    text: "Blackfin: Minimalismul arhitectural ridicat la rang de artă în inima Dolomiților. Ramele Blackfin redefinesc discreția prin puritatea absolută a titanului prelucrat manual. Fără artificii de design sau detalii inutile, ele oferă luxul suprem al imponderabilității și o estetică esențializată, menită să completeze o ținută impecabilă prin rigoare și proporții perfecte."
  },
  {
    id: "alain-mikli",
    name: "Alain Mikli",
    tagline: "Identitate Artistică & Eleganță Intelectuală",
    materials: "Acetați Exclusivi • Cromatică Profundă",
    text: "Alain Mikli: O fuziune rară între vocația artistică și rigoarea optică. Creațiile Alain Mikli transcend noțiunea de simplu accesoriu, devenind piese cu o identitate puternică, dar profund rafinată. Prin utilizarea acetaților exclusivi și a nuanțelor profunde, nestridente, aceste rame se adresează spiritelor erudite, care apreciază o formă de eleganță intelectuală și sofisticată."
  },
  {
    id: "charmant",
    name: "Charmant",
    tagline: "Luxul Tăcut al Ingineriei Japoneze",
    materials: "Excellence Titan • Ergonomie Sensorială",
    text: "Charmant: Luxul tăcut al ingineriei japoneze de excepție. Artizanii Charmant creează ochelari a căror complexitate tehnologică este ascunsă sub un design de o simplitate dezarmantă. Excelența lor nu este făcută pentru a fi privită, ci pentru a fi purtată: un confort absolut și o flexibilitate inegalabilă, reprezentând o experiență senzorială rezervată exclusiv purtătorului."
  }
];

export const FRAME_BRANDS_EXTRA = [
  {
    name: "Oliver Peoples",
    origin: "SUA",
    category: "Vintage Elegance",
    material: "Acetat Clasic & Titan",
    desc: "Siluete clasice inspirate de cultura vintage din Los Angeles"
  },
  {
    name: "Bottega Veneta",
    origin: "Italia",
    category: "Haute Couture Italiană",
    material: "Acetat Sculptat & Metal Aurit",
    desc: "Rafinament discret marcat de detalii inspirate din textura iconică Intrecciato"
  },
  {
    name: "Alexander McQueen",
    origin: "Marea Britanie",
    category: "Design Avangardist",
    material: "Acetat Dens & Linii Metalice",
    desc: "Estetică avangardistă cu accente dramatice și finisaje structurale puternice"
  },
  {
    name: "Burberry",
    origin: "Marea Britanie",
    category: "Tradiție Britanică",
    material: "Acetat Nobil & Oțel Inoxidabil",
    desc: "Eleganță britanică clasică, detalii subtile Tartan și proporții atemporale"
  },
  {
    name: "Ray-Ban",
    origin: "Italia",
    category: "Design Iconic Global",
    material: "Acetat & Aliaje Metalice",
    desc: "Modele iconice de referință mondială, ergonomie verificată și stil inconfundabil"
  },
  {
    name: "Chantal Thomass",
    origin: "Franța",
    category: "Haute Lingerie Eyewear",
    material: "Acetat Finisat Manual",
    desc: "Feminitate senzuală pariziană, linii retro-șic și detalii sofisticate de atelier"
  },
  {
    name: "Vogue",
    origin: "Italia",
    category: "Fashion Contemporan",
    material: "Acetat Ușor & Metal Polizat",
    desc: "Tendințe contemporane vibrante, profiluri expresive și eleganță accesibilă"
  },
  {
    name: "Dolce&Gabbana",
    origin: "Italia",
    category: "Glamour Italian",
    material: "Acetat Decorat & Accente Aurii",
    desc: "Opulență mediteraneană, motive baroce rafinate și accente luxoase distinctive"
  },
  {
    name: "Emporio Armani",
    origin: "Italia",
    category: "Eleganță Urbană",
    material: "Bio-Acetat & Titan Fin",
    desc: "Linii dinamice urbane, minimalism contemporan și confort pentru purtare zilnică"
  },
  {
    name: "Giorgio Armani",
    origin: "Italia",
    category: "Lux Discret Milanez",
    material: "Acetat Fin & Titan Lustruit",
    desc: "Esența luxului discret milanez, proporții armonioase și sobrietate aristocratică"
  },
  {
    name: "Silhouette",
    origin: "Austria",
    category: "Minimalism Ultra-Ușor",
    material: "Titan High-Tech & Polimer SPX",
    desc: "Ochelari fără ramă de o imponderabilitate legendară, precizie anatomică absolută"
  },
  {
    name: "Miu Miu",
    origin: "Italia",
    category: "Avangardă Chic",
    material: "Acetat Sculptural & Cristale",
    desc: "Creativitate nonconformistă, geometrii îndrăznețe și spirit sofisticat modern"
  },
  {
    name: "Oakley",
    origin: "SUA",
    category: "Performanță Sportivă",
    material: "O-Matter & Aliaje C-5",
    desc: "Performanță optică sportivă fără compromis, geometrie anatomică de mare stabilitate"
  },
  {
    name: "Henry Jullien",
    origin: "Franța",
    category: "Artizanat Istoric Francez",
    material: "Aur Dublat Laminat & Titan",
    desc: "Capodopere din aur laminat realizate manual în munții Jura conform tradiției din 1921"
  },
  {
    name: "Persol",
    origin: "Italia",
    category: "Tradiție Artizanală Clasică",
    material: "Acetat de Bumbac & Sistem Meflecto",
    desc: "Moștenire torineză din 1917, săgeata argintie Silver Arrow și balamale flexibile"
  },
  {
    name: "Tom Ford",
    origin: "Italia",
    category: "Lux Cosmopolit",
    material: "Acetat Japonez Dens & Titan",
    desc: "Design sculptural cu balamaua iconică T-Logo și eleganță cosmopolită magnetică"
  },
  {
    name: "Prada",
    origin: "Italia",
    category: "Minimalism Arhitectural",
    material: "Acetat Pur & Detalii Geometrice",
    desc: "Geometrii arhitecturale conceptuale, unghiuri curate și eleganță milaneză pură"
  },
  {
    name: "Versace",
    origin: "Italia",
    category: "Opulență & Caracter",
    material: "Acetat Lucios & Accente Nobile",
    desc: "Prezență impunătoare, emblema Medusa iconică și finisaje metalice somptuoase"
  },
  {
    name: "Azzaro",
    origin: "Franța",
    category: "Șic Francez",
    material: "Acetat Clasic & Inox Fin",
    desc: "Rafinament mediteranean parizian, linii fluide și accente de croială impecabilă"
  },
  {
    name: "Gucci",
    origin: "Italia",
    category: "Fashion Eclectic",
    material: "Acetat Multistrat & Metal Auriu",
    desc: "Estetică eclectică sofisticată, motive monogramă reinterpretate și lux asumat"
  },
  {
    name: "Arnette",
    origin: "SUA",
    category: "Street Style Activ",
    material: "Bio-Acetat & Grilamid",
    desc: "Spirit tineresc activ, confort ergonomic și materiale bio-sustenabile ușoare"
  },
  {
    name: "Swarovski",
    origin: "Austria",
    category: "Haute Cristallerie",
    material: "Cristale Fațetate & Metal Rodiat",
    desc: "Jocuri de lumină radiante, fațetări precise de cristal și eleganță rafinată"
  },
  {
    name: "Montblanc",
    origin: "Germania",
    category: "Excelență Tehnică & Statut",
    material: "Rășină Prețioasă & Titan Finisat",
    desc: "Rigoare mecanică germană, emblema stelei albe alpine și materiale nobile durabile"
  },
  {
    name: "Catherine de Medici",
    origin: "Italia",
    category: "Artă Optică Renașcentistă",
    material: "Acetat Nobil & Piese Turnate Fin",
    desc: "Bijuterii optice inspirate din Renașterea toscană, forme artistice și detalii nobile"
  },
  {
    name: "Brioni",
    origin: "Italia",
    category: "Sartorial Roman de Lux",
    material: "Corn Natural & Titan Placat",
    desc: "Croială sartorială romană supremă transpusă în rame discrete de o sobrietate rară"
  },
  {
    name: "Bvlgari",
    origin: "Italia",
    category: "Haute Joaillerie Romană",
    material: "Metale Nobile & Cristale Emblematice",
    desc: "Motive Haute Joaillerie Serpenti și B.zero1, rafinament somptuos de bijuterie"
  },
  {
    name: "Tiffany&Co.",
    origin: "SUA",
    category: "Bijuterie Clasică Americană",
    material: "Acetat Fin & Argint/Aur Tratate",
    desc: "Rafinament new-yorkez inconfundabil cu atingeri de Tiffany Blue și motive iconice T"
  },
  {
    name: "Balenciaga",
    origin: "Franța",
    category: "Avangardă High-Fashion",
    material: "Acetat Dens & Aliaje Turnate",
    desc: "Siluete futuriste sculpturale, linii cat-eye ascuțite și volumetrii avangardiste"
  },
  {
    name: "GigiStudios",
    origin: "Spania",
    category: "Design Independent Barcelona",
    material: "Titan Japonez & Acetat Italian",
    desc: "Design independent din Barcelona, realizat manual cu o atenție meticuloasă la detalii"
  },
  {
    name: "Porsche Design",
    origin: "Germania",
    category: "Inginerie Funcțională",
    material: "Titan Grade-5 & Fibră de Carbon",
    desc: "Inginerie de precizie puristă, mecanisme inteligente de balama și materiale high-tech"
  },
  {
    name: "Rodenstock",
    origin: "Germania",
    category: "Precizie Optică Germană",
    material: "Titan & Polimeri Medicali",
    desc: "Peste 140 de ani de perfecțiune optică germană și stabilitate biomecanică remarcabilă"
  },
  {
    name: "Saint Laurent",
    origin: "Franța",
    category: "Parizian Minimalist",
    material: "Acetat Negru Profund & Titan",
    desc: "Eleganță pariziană minimalistă, siluete androgine curate și atitudine sobră"
  },
  {
    name: "Seiko",
    origin: "Japonia",
    category: "Inginerie Titan Japonia",
    material: "Titan Pur 100% & Beta-Titan",
    desc: "Maeștri ai titanului japonez ultra-rezistent, puritate tehnologică și ergonomie perfectă"
  }
];

export const ATELIER_GALLERY = [
  {
    title: "Centrare 3D și Vizualizare Parametri",
    subtitle: "Măsurători digitale de precizie sub-milimetrică",
    type: "photo",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
    detail: "Scanăm poziția pupilară și unghiul pantoscopic în raport cu anatomia feței tale."
  },
  {
    title: "Laboratorul de Șlefuire Automatizată",
    subtitle: "Mașinări CNC de ultimă generație",
    type: "video",
    image: myVideo,
    detail: "Lentilele sunt prelucrate cu diamant sintetic pentru o fixare impecabilă în șanțul ramei."
  },
  {
    title: "Finisare Manuală a Ramei",
    subtitle: "Ajustări anatomice bespoke",
    type: "photo",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80",
    detail: "Brațele și puntea nazală sunt aduse la echilibrul termic ideal pentru a preveni orice punct de presiune."
  },
  {
    title: "Controlul de Calitate și Verificarea Focalei",
    subtitle: "Frontofocometrie digitală",
    type: "photo",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=1200&q=80",
    detail: "Fiecare pereche este supusă la 12 teste stricte de convergență și claritate a tratamentului antireflex."
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80",
    caption: "Puritatea materialelor. Rame Brunello Cucinelli confecționate din corn natural și detalii din titan. #BetaOptic #QuietLuxury",
    likes: "248",
    comments: "14"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    caption: "Claritate fără egal cu tratamentele invizibile Zeiss SmartLife. Viziune fără oboseală la ecrane. #ZeissVision #BetaOptic",
    likes: "412",
    comments: "29"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    caption: "Artizanii noștri calibrează mecanic fiecare ramă Linda Farrow înainte de predare. #AtelierBetaOptic #Precision",
    likes: "318",
    comments: "19"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1582142839970-2b9e058a6963?auto=format&fit=crop&w=800&q=80",
    caption: "Imponderabilitate din Dolomiți. Blackfin Titanium — doar 9 grame de rafinament arhitectural. #BlackfinEyewear",
    likes: "529",
    comments: "33"
  }
];
