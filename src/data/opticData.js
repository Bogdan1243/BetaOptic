import myVideo from '../assets/Video_Atelier.mp4';
import pozaAtelier from '../assets/A-53.jpg'
export const HERO_DATA = {
  slogan: "Vizibilitatea ta, viziunea noastră",
  welcomeMessages: [
    "te așteptăm cu rețeta actualizată, de la medicul tău",
    "analizăm istoricul, urmărim modificările",
    "vom discuta despre nevoile tale vizuale ",
    "activitate uzuală, timp liber, sport"
  ]
};

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Analiza nevoilor tale vizuale",
    description: "Începem prin a analiza activitatea ta curentă",
    icon: "Activity"
  },
  {
    number: "02",
    title: "Alegerea ramelor",
    description: "Îți vom selecta o varietate de rame de ochelari, pentru a alege ceea ce te definește și te reprezintă",
    icon: "Glasses"
  },
  {
    number: "03",
    title: "Despre lentile",
    description: "Vom analiza împreună activitățiile complexe de zi cu zi",
    icon: "Disc"
  },
  {
    number: "04",
    title: "Ajustarea ramei pentru a o simți confortabil",
    icon: "Sliders"
  },
  {
    number: "05",
    title: "Măsurarea parametrilor",
    description: "Măsurarea parametrilor personalizați, specifici lentilelor pe care le vom selecta",
    icon: "Ruler"
  },
  {
    number: "06",
    title: "Montarea lentilelor în laborator propriu",
    description: "Se vor introduce datele personalizate în vederea optimizării detaliilor personale",
    icon: "Wrench"
  },
  {
    number: "07",
    title: "Verificarea monturii, ajustarea și recomandările de utilizare a ochelarului ",
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
  },

  {
    id: "itallenti",
    name: "ItalLenti",
    tagline: "Pionieri ai Lentilei Progresive",
    origin: "Italia",
    badge: "Inovație Continuă",
    text: "Catalogul de lentile ITAL-LENTI se caracterizează printr-o amploare și complexitate extremă a gamei de produse: de la lentile progresive de ultimă generație, cu tehnologie FREE-FORM, ultra personalizate până la lentilele monofocale disponibile în toate materialele, trecând prin lentilele degresive, lentile cu asistență acomodativă, lentile fotocromatice, lentile speciale pentru ochelari de sport sau lentile polarizante pentru o vedere optimă în toate activitățile externe.\n" +
        "\n" +
        "Există mereu o soluție disponibilă în gama ITAL-LENTI pentru fiecare nevoie vizuală."
  }
];



export const FRAME_BRANDS_MAIN = [
  {
    id: "brunello-cucinelli",
    name: "Brunello Cucinelli",
    featured: true, // Ocupă 2 coloane
    tagline: "Eleganță Subtilă din Solomeo",
    materials: "Corn Natural • Titan • Acetat Fin",
    text: "Brunello Cucinelli: O expresie desăvârșită a filozofiei din Solomeo, unde luxul nu strigă, ci se simte. Ramele Brunello Cucinelli sunt eliberate de orice monogramă ostentativă, prestanța lor fiind trădată exclusiv de noblețea absolută a materialelor: corn natural, titan și acetați fini. O estetică a rafinamentului suprem, dedicată celor care preferă o eleganță asumată, rezervată și invizibilă maselor."
  },
  {
    id: "linda-farrow",
    name: "Linda Farrow",
    featured: false, // Ocupă 1 coloană (se poziționează în dreapta lui Brunello Cucinelli)
    tagline: "Piese de Moștenire & Detalii din Aur",
    materials: "Acetat Japonez • Aur 22K • Titan",
    text: "Linda Farrow: O reinterpretare a siluetelor iconice ale anilor ’70, transformate în veritabile piese de moștenire. Departe de capriciile modei trecătoare, ramele Linda Farrow se disting prin densitatea excepțională a acetaților japonezi și strălucirea caldă a detaliilor din metale prețioase. Un echilibru perfect între o prezență vizuală marcantă și un rafinament clasic, de o prestanță incontestabilă."
  },
  {
    id: "henry-jullien",
    name: "Henry Jullien",
    featured: true, // Ocupă 2 coloane
    tagline: "Haute Lunetterie Franceză & Aur Laminat (Doublé Or)",
    materials: "Aur Laminat (Doublé Or) • Titan Premium • Oțel Aerospațial",
    text: "Maison Henry Jullien: Fondat în 1921 în regiunea Jura, leagănul opticii franceze, brandul ridică rama de ochelari la rangul de bijuterie fină. Recunoscut la nivel mondial pentru măiestria tehnicii de Aur Laminat (Doublé Or), Henry Jullien îmbină meșteșugul artizanal de patrimoniu cu materiale de înaltă tehnologie pentru un confort și o durabilitate excepțională."
  },
  {
    id: "charriol",
    name: "Charriol",
    featured: false, // Ocupă 1 coloană (se poziționează în dreapta lui Henry Jullien)
    tagline: "Eleganță Elvețiană & Detalii de Prestigiu",
    materials: "Cablu din Oțel Nobil • Aur 22K • Titan",
    text: "Charriol: Adresat celor care cunosc și apreciază brandurile de prestigiu, dorind să poarte accesorii remarcabile printr-un stil sofisticat ce combină o mare doză de originalitate, cu echilibrul dintre tradiție și modernitate. Se diferențiază prin calitatea excepțională a finisării suprafețelor, prin juxtapuneri de materiale și texturi."
  },
  {
    id: "blackfin",
    name: "Blackfin",
    featured: false,
    tagline: "Minimalism Arhitectural din Dolomiți",
    materials: "Titan Japonez Pur • Prelucrare Manuală",
    text: "Blackfin: Minimalismul arhitectural ridicat la rang de artă în inima Dolomiților. Ramele Blackfin redefinesc discreția prin puritatea absolută a titanului prelucrat manual. Fără artificii de design sau detalii inutile, ele oferă luxul suprem al imponderabilității și o estetică esențializată, menită să completeze o ținută impecabilă prin rigoare și proporții perfecte."
  },
  {
    id: "alain-mikli",
    name: "Alain Mikli",
    featured: false,
    tagline: "Identitate Artistică & Eleganță Intelectuală",
    materials: "Acetați Exclusivi • Cromatică Profundă",
    text: "Alain Mikli: O fuziune rară între vocația artistică și rigoarea optică. Creațiile Alain Mikli transcend noțiunea de simplu accesoriu, devenind piese cu o identitate puternică, dar profund rafinată. Prin utilizarea acetaților exclusivi și a nuanțelor profunde, nestridente, aceste rame se adresează spiritelor erudite, care apreciază o formă de eleganță intelectuală și sofisticată."
  },
  {
    id: "charmant",
    name: "Charmant",
    featured: false,
    tagline: "Luxul Tăcut al Ingineriei Japoneze",
    materials: "Excellence Titan • Ergonomie Sensorială",
    text: "Charmant: Luxul tăcut al ingineriei japoneze de excepție. Artizanii Charmant creează ochelari a căror complexitate tehnologică este ascunsă sub un design de o simplitate dezarmantă. Excelența lor nu este făcută pentru a fi privită, ci pentru a fi purtată: un confort absolut și o flexibilitate inegalabilă, reprezentând o experiență senzorială rezervată exclusiv purtătorului."
  }
];

// Branduri de ochelari de soare (afișate sub separatorul "Ochelari de Soare")
export const SUNGLASS_BRANDS_MAIN = [
  {
    id: "miu-miu",
    name: "Miu Miu",
    featured: false,
    tagline: "Avangardă Chic Italiană",
    materials: "Acetat Sculptural • Cristale • Metal Aurit",
    text: "Miu Miu: Spiritul nonconformist al casei Prada, tradus într-o estetică jucăușă și profund sofisticată. Ochelarii de soare Miu Miu îmbină geometrii îndrăznețe cu detalii prețioase și finisaje de atelier, creând piese cu o personalitate magnetică. O feminitate modernă, curajoasă și rafinată, pentru cele care tratează stilul ca pe o formă de exprimare personală."
  },
  {
    id: "oakley",
    name: "Oakley",
    featured: false,
    tagline: "Performanță Optică fără Compromis",
    materials: "O-Matter • Lentile Prizm™ • Aliaje C-5",
    text: "Oakley: Etalonul mondial al performanței optice sportive, născut în California. Fiecare model Oakley este conceput în jurul preciziei vizuale și al stabilității anatomice, iar tehnologia Prizm™ amplifică contrastul și detaliile pentru o percepție superioară a mediului. Ochelari creați pentru mișcare, rezistență și claritate absolută, indiferent de condiții."
  },
  {
    id: "maui-jim",
    name: "Maui Jim",
    featured: false,
    tagline: "Claritate Polarizată din Hawaii",
    materials: "Lentile PolarizedPlus2® • Titan • Nylon Premium",
    text: "Maui Jim: Născut sub soarele intens al insulelor Hawaii, Maui Jim a transformat protecția vizuală într-o experiență senzorială. Tehnologia brevetată PolarizedPlus2® elimină reflexiile și intensifică culorile naturale, dezvăluind lumea în nuanțe vii și contraste profunde. O combinație rară între confort lejer, protecție UV completă și o claritate cu adevărat remarcabilă."
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
    title: "Atelierul Beta Optic",
    type: "photo",
    image: pozaAtelier,
  },
  {
    title: "Laboratorul de Șlefuire Automatizată",
    subtitle: "Mașinări CNC de ultimă generație",
    type: "video",
    image: myVideo,
    detail: "Lentilele sunt prelucrate cu diamant sintetic pentru o fixare impecabilă în șanțul ramei."
  }];

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
