const DATA = {
  world: "data/countries-all-50m.json",
  france: "data/fr-departement-10m.geojson",
  us: "data/us-states-10m.geojson",
};

const SKIP_ADM = new Set([
  "IOA", "HMD", "NFK", "ATC",
  "MAC", "HKG",
  "FRO", "ALD",
  "SPM", "WLF", "MAF", "BLM", "PYF", "NCL", "ATF",
  "ABW", "CUW", "SXM",
  "NIU", "COK",
  "SGS", "IOT", "SHN", "PCN", "AIA", "FLK", "CYM", "BMU", "VGB", "TCA", "MSR", "JEY", "GGY", "IMN",
  "MNP", "VIR", "GUM", "ASM", "PRI",
  "ATA", "KAS", "SOL", "CYN",
]);

const RENAME = { CHN: "Chine" };

const ALIAS = {
  USA: ["usa", "us", "etats unis d amerique"],
  GBR: ["uk", "grande bretagne"],
  MMR: ["myanmar"],
  VNM: ["vietnam"],
  ARE: ["emirats", "eau"],
  SWZ: ["swaziland"],
  MKD: ["macedoine"],
  TLS: ["timor", "timor leste"],
  TWN: ["taiwan"],
  KOR: ["coree du sud"],
  PRK: ["coree du nord"],
  BIH: ["bosnie"],
  PNG: ["papouasie"],
  STP: ["sao tome"],
  CPV: ["cap vert"],
};

const NOUNS = {
  world: ["pays", "pays"],
  us: ["État", "États"],
  france: ["département", "départements"],
};

const UNKNOWN = {
  world: "Aucun pays à ce nom.",
  us: "Aucun État à ce nom.",
  france: "Aucun département à ce nom.",
};

const PLACEHOLDER = {
  world: "Un pays…",
  us: "Un État…",
  france: "Un département…",
};

const WORLD_ARTICLE = {
  Afghanistan: "l", "Afrique du Sud": "l", Albanie: "la", Algérie: "l", Allemagne: "l", Andorre: "l",
  Angola: "l", "Antigua-et-Barbuda": "l", "Arabie saoudite": "l", Argentine: "la", Arménie: "l",
  Australie: "l", Autriche: "l", Azerbaïdjan: "l", Bahamas: "les", Bahreïn: "le", Bangladesh: "le",
  Barbade: "la", Belgique: "la", Belize: "le", Bénin: "le", Bhoutan: "le", Biélorussie: "la",
  Birmanie: "la", Bolivie: "la", "Bosnie-Herzégovine": "la", Botswana: "le", Brésil: "le", Brunei: "le",
  Bulgarie: "la", "Burkina Faso": "le", Burundi: "le", Cambodge: "le", Cameroun: "le", Canada: "le",
  "Cap-Vert": "le", Chili: "le", Chine: "la", Chypre: "", "Cité du Vatican": "la", Colombie: "la",
  Comores: "les", "Corée du Nord": "la", "Corée du Sud": "la", "Costa Rica": "le", "Côte d'Ivoire": "la",
  Croatie: "la", Cuba: "", Danemark: "le", Djibouti: "", Dominique: "la", Égypte: "l",
  "Émirats arabes unis": "les", Équateur: "l", Érythrée: "l", Espagne: "l", Estonie: "l", Eswatini: "l",
  "États fédérés de Micronésie": "les", "États-Unis": "les", Éthiopie: "l", Fidji: "les", Finlande: "la",
  France: "la", Gabon: "le", Gambie: "la", Géorgie: "la", Ghana: "le", Grèce: "la", Grenade: "la",
  Groenland: "le", Guatemala: "le", Guinée: "la", "Guinée équatoriale": "la", "Guinée-Bissau": "la",
  Guyana: "le", Haïti: "", Honduras: "le", Hongrie: "la", "Îles Marshall": "les", "Îles Salomon": "les",
  Inde: "l", Indonésie: "l", Irak: "l", Iran: "l", Irlande: "l", Islande: "l", Israël: "", Italie: "l",
  Jamaïque: "la", Japon: "le", Jordanie: "la", Kazakhstan: "le", Kenya: "le", Kirghizistan: "le",
  Kiribati: "les", Kosovo: "le", Koweït: "le", Laos: "le", Lesotho: "le", Lettonie: "la", Liban: "le",
  Liberia: "le", Libye: "la", Liechtenstein: "le", Lituanie: "la", Luxembourg: "le",
  "Macédoine du Nord": "la", Madagascar: "", Malaisie: "la", Malawi: "le", Maldives: "les", Mali: "le",
  Malte: "", Maroc: "le", Maurice: "", Mauritanie: "la", Mexique: "le", Moldavie: "la", Monaco: "",
  Mongolie: "la", Monténégro: "le", Mozambique: "le", Namibie: "la", Nauru: "", Népal: "le",
  Nicaragua: "le", Niger: "le", Nigeria: "le", Norvège: "la", "Nouvelle-Zélande": "la", Oman: "",
  Ouganda: "l", Ouzbékistan: "l", Pakistan: "le", Palaos: "les", Palestine: "la", Panama: "le",
  "Papouasie-Nouvelle-Guinée": "la", Paraguay: "le", "Pays-Bas": "les", Pérou: "le", Philippines: "les",
  Pologne: "la", Portugal: "le", Qatar: "le", Centrafrique: "la", Congo: "le",
  "République centrafricaine": "la", "République démocratique du Congo": "la",
  "République dominicaine": "la", "République du Congo": "la", "République tchèque": "la",
  Roumanie: "la", "Royaume-Uni": "le", Russie: "la", Rwanda: "le", "Saint-Christophe-et-Niévès": "",
  "Saint-Marin": "", "Saint-Vincent-et-les-Grenadines": "", "Sainte-Lucie": "", Salvador: "le",
  Samoa: "les", "Sao Tomé-et-Principe": "", Sénégal: "le", Serbie: "la", Seychelles: "les",
  "Sierra Leone": "la", Singapour: "", Slovaquie: "la", Slovénie: "la", Somalie: "la", Soudan: "le",
  "Soudan du Sud": "le", "Sri Lanka": "le", Suède: "la", Suisse: "la", Suriname: "le", Syrie: "la",
  Tadjikistan: "le", Taïwan: "", Tanzanie: "la", Tchad: "le", Tchéquie: "la", Thaïlande: "la",
  "Timor oriental": "le", Togo: "le", Tonga: "les", "Trinité-et-Tobago": "la", Tunisie: "la",
  Turkménistan: "le", Turquie: "la", Tuvalu: "les", Ukraine: "l", Uruguay: "l", Vanuatu: "le",
  Venezuela: "le", "Viêt Nam": "le", Yémen: "le", Zambie: "la", Zimbabwe: "le",
};

const US_ARTICLE = {
  Alabama: "l", Alaska: "l", Arizona: "l", Arkansas: "l", Californie: "la", "Caroline du Nord": "la",
  "Caroline du Sud": "la", Colorado: "le", Connecticut: "le", "Dakota du Nord": "le",
  "Dakota du Sud": "le", Delaware: "le", Floride: "la", Géorgie: "la", Hawaï: "", Idaho: "l",
  Illinois: "l", Indiana: "l", Iowa: "l", Kansas: "le", Kentucky: "le", Louisiane: "la", Maine: "le",
  Maryland: "le", Massachusetts: "le", Michigan: "le", Minnesota: "le", Mississippi: "le",
  Missouri: "le", Montana: "le", Nebraska: "le", Nevada: "le", "New Hampshire": "le",
  "New Jersey": "le", "New York": "", "Nouveau-Mexique": "le", Ohio: "l", Oklahoma: "l", Oregon: "l",
  Pennsylvanie: "la", "Rhode Island": "le", Tennessee: "le", Texas: "le", Utah: "l", Vermont: "le",
  Virginie: "la", "Virginie-Occidentale": "la", Washington: "", Wisconsin: "le", Wyoming: "le",
};

const DEPT_ARTICLE = {
  Ain: "l", Aisne: "l", Allier: "l", "Alpes-de-Haute-Provence": "les", "Alpes-Maritimes": "les",
  Ardèche: "l", Ardennes: "les", Ariège: "l", Aube: "l", Aude: "l", Aveyron: "l", "Bas-Rhin": "le",
  "Bouches-du-Rhône": "les", Calvados: "le", Cantal: "le", Charente: "la", "Charente-Maritime": "la",
  Cher: "le", Corrèze: "la", "Corse-du-Sud": "la", "Côte-d'Or": "la", "Côtes-d'Armor": "les",
  Creuse: "la", "Deux-Sèvres": "les", Dordogne: "la", Doubs: "le", Drôme: "la", Essonne: "l",
  Eure: "l", "Eure-et-Loir": "l", Finistère: "le", Gard: "le", Gers: "le", Gironde: "la",
  Guadeloupe: "la", Guyane: "la", "Haut-Rhin": "le", "Haute-Corse": "la", "Haute-Garonne": "la",
  "Haute-Loire": "la", "Haute-Marne": "la", "Haute-Saône": "la", "Haute-Savoie": "la",
  "Haute-Vienne": "la", "Hautes-Alpes": "les", "Hautes-Pyrénées": "les", "Hauts-de-Seine": "les",
  Hérault: "l", "Ille-et-Vilaine": "l", Indre: "l", "Indre-et-Loire": "l", Isère: "l", Jura: "le",
  "La Réunion": "", Landes: "les", "Loir-et-Cher": "le", Loire: "la", "Loire-Atlantique": "la",
  Loiret: "le", Lot: "le", "Lot-et-Garonne": "le", Lozère: "la", "Maine-et-Loire": "le", Manche: "la",
  Marne: "la", Martinique: "la", Mayenne: "la", Mayotte: "", "Meurthe-et-Moselle": "la", Meuse: "la",
  Morbihan: "le", Moselle: "la", Nièvre: "la", Nord: "le", Oise: "l", Orne: "l", Paris: "",
  "Pas-de-Calais": "le", "Puy-de-Dôme": "le", "Pyrénées-Atlantiques": "les",
  "Pyrénées-Orientales": "les", Rhône: "le", "Saône-et-Loire": "la", Sarthe: "la", Savoie: "la",
  "Seine-et-Marne": "la", "Seine-Maritime": "la", "Seine-Saint-Denis": "la", Somme: "la", Tarn: "le",
  "Tarn-et-Garonne": "le", "Territoire de Belfort": "le", "Val-d'Oise": "le", "Val-de-Marne": "le",
  Var: "le", Vaucluse: "le", Vendée: "la", Vienne: "la", Vosges: "les", Yonne: "l", Yvelines: "les",
};

const MAX_LINK_DEG = 13;
const MAX_FROM_MAIN_DEG = 13.2;
const MIN_PART_RATIO = 0.008;

const $ = (id) => document.getElementById(id);

const ui = {
  load: $("load-overlay"),
  loadText: $("load-text"),
  loadFill: $("load-bar-fill"),
  intro: $("intro-modal"),
  paceNote: $("pace-note"),
  lead: $("intro-lead"),
  start: $("btn-start"),
  timerBlock: $("timer-block"),
  timerFill: $("timer-fill"),
  timerValue: $("timer-value"),
  timerBar: document.querySelector("#timer-block .timer-bar"),
  chrome: $("chrome"),
  kicker: $("round-kicker"),
  scoreLine: $("score-line"),
  historyWrap: $("history-wrap"),
  history: $("history"),
  stage: $("stage"),
  askLine: $("ask-line"),
  letter: $("letter"),
  slots: $("slots"),
  dock: $("dock"),
  form: $("guess-form"),
  guess: $("guess"),
  validate: $("btn-validate"),
  hint: $("guess-hint"),
  feedback: $("feedback"),
  feedbackKicker: $("feedback-kicker"),
  feedbackDetail: $("feedback-detail"),
  next: $("btn-next"),
  finish: $("finish-modal"),
  finalScore: $("final-score"),
  finishPace: $("finish-pace"),
  recap: $("finish-recap"),
  replay: $("btn-replay"),
  confetti: $("confetti"),
};

const lengthTen = document.querySelector("[data-length='10']");
const settings = { territory: "world", places: 3, length: 5, ms: 15000 };
let catalogs = null;
let indexes = null;
let rounds = [];
let index = 0;
let locked = false;
let roundEndsAt = 0;
let timerFrame = 0;
let countdownTimer = 0;
let leaving = false;
let fitFrame = 0;
let confettiTimer = 0;
let fullHeight = window.innerHeight;

const CONFETTI_COLORS = ["#c23b33", "#8d241e", "#1c1915", "#a68456", "#6d645b"];

function norm(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .toLowerCase()
    .replace(/['’]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function keysFor(name, extra) {
  const keys = new Set();
  for (const raw of [name, ...(extra || [])]) {
    const spaced = norm(raw);
    if (!spaced) continue;
    keys.add(spaced);
    keys.add(spaced.replace(/ /g, ""));
  }
  return [...keys];
}

function letterOf(name) {
  const stripped = norm(name).replace(/[^a-z]/g, "");
  return stripped ? stripped[0].toUpperCase() : "";
}

function articleOf(name, table) {
  if (Object.prototype.hasOwnProperty.call(table, name)) return table[name];
  console.warn("déterminant manquant", name);
  const bare = norm(name).replace(/[^a-z]/g, "");
  return /^[aeiouyh]/.test(bare) ? "l" : "le";
}

function penserA(entity) {
  const { name, article } = entity;
  if (article === "le") return `au ${name}`;
  if (article === "la") return `à la ${name}`;
  if (article === "les") return `aux ${name}`;
  if (article === "l") return `à l’${name}`;
  return `à ${name}`;
}

function articleName(entity) {
  const { name, article } = entity;
  if (article === "le") return `le ${name}`;
  if (article === "la") return `la ${name}`;
  if (article === "les") return `les ${name}`;
  if (article === "l") return `l’${name}`;
  return name;
}

function exampleSentence(round) {
  const left = round.pool.filter((item) => !round.found.includes(item));
  if (left.length === 1) return `Il te manquait juste ${articleName(left[0])} !`;
  const picked = shuffle(left).slice(0, 2);
  if (picked.length < 2) return "";
  return `On aurait pu penser ${penserA(picked[0])} ou ${penserA(picked[1])} par exemple.`;
}

function countPhrase(places, territory) {
  const [one, many] = NOUNS[territory];
  if (places === 1) return `un ${one}`;
  if (places === 2) return `deux ${many}`;
  return `trois ${many}`;
}

function askText() {
  const verb = settings.places === 1 ? "commence" : "commencent";
  return `Trouvez ${countPhrase(settings.places, settings.territory)} qui ${verb} par…`;
}

function roundCount() {
  if (settings.territory === "us" && settings.places === 3 && settings.length === 10) return 9;
  return settings.length;
}

function fixRing(ring) {
  if (!ring.length) return [];
  const out = [[ring[0][0], ring[0][1]]];
  for (let i = 1; i < ring.length; i += 1) {
    let lon = ring[i][0];
    const prev = out[i - 1][0];
    while (lon - prev > 180) lon -= 360;
    while (prev - lon > 180) lon += 360;
    out.push([lon, ring[i][1]]);
  }
  return out;
}

function ringStats(ring) {
  let crossSum = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const x1 = ring[i][0];
    const y1 = ring[i][1];
    const x2 = ring[i + 1][0];
    const y2 = ring[i + 1][1];
    const cross = x1 * y2 - x2 * y1;
    crossSum += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  const area = Math.abs(crossSum) / 2;
  if (area < 1e-12) {
    let sx = 0;
    let sy = 0;
    ring.forEach((point) => {
      sx += point[0];
      sy += point[1];
    });
    return { cx: sx / ring.length, cy: sy / ring.length, area: 0 };
  }
  return { cx: cx / (3 * crossSum), cy: cy / (3 * crossSum), area };
}

function polygonsOf(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function degreeDistance(a, b) {
  const midLat = ((a.cy + b.cy) / 2) * Math.PI / 180;
  const dx = (a.cx - b.cx) * Math.cos(midLat);
  const dy = a.cy - b.cy;
  return Math.hypot(dx, dy);
}

function cluster(geometry) {
  const items = polygonsOf(geometry).map((polygon) => {
    const rings = polygon.map(fixRing).filter((ring) => ring.length >= 4);
    if (!rings.length) return null;
    const stats = ringStats(rings[0]);
    return { rings, cx: stats.cx, cy: stats.cy, area: stats.area };
  }).filter((item) => item && item.area > 0);

  if (!items.length) return [];
  items.sort((a, b) => b.area - a.area);
  const ref = items[0].cx;
  items.forEach((item) => {
    while (item.cx - ref > 180) {
      item.cx -= 360;
      item.rings = item.rings.map((ring) => ring.map(([lon, lat]) => [lon - 360, lat]));
    }
    while (ref - item.cx > 180) {
      item.cx += 360;
      item.rings = item.rings.map((ring) => ring.map(([lon, lat]) => [lon + 360, lat]));
    }
  });

  const kept = [items[0]];
  const rest = items.slice(1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = rest.length - 1; i >= 0; i -= 1) {
      const item = rest[i];
      if (item.area < items[0].area * MIN_PART_RATIO) continue;
      if (degreeDistance(item, items[0]) > MAX_FROM_MAIN_DEG) continue;
      const near = kept.some((other) => degreeDistance(item, other) <= MAX_LINK_DEG);
      if (near) {
        kept.push(item);
        rest.splice(i, 1);
        changed = true;
      }
    }
  }
  return kept;
}

function shiftLon(lon, ref) {
  let next = lon;
  while (next - ref > 180) next -= 360;
  while (ref - next > 180) next += 360;
  return next;
}

function boundsOf(rings) {
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;
  rings.forEach((ring) => {
    ring.forEach(([lon, lat]) => {
      minLon = Math.min(minLon, lon);
      minLat = Math.min(minLat, lat);
      maxLon = Math.max(maxLon, lon);
      maxLat = Math.max(maxLat, lat);
    });
  });
  return { minLon, minLat, maxLon, maxLat };
}

function toSphere(lon, lat, lon0, lat0) {
  const lambda = (lon - lon0) * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  const phi0 = lat0 * Math.PI / 180;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  return [
    cosPhi * Math.sin(lambda),
    Math.cos(phi0) * sinPhi - Math.sin(phi0) * cosPhi * Math.cos(lambda),
    Math.sin(phi0) * sinPhi + Math.cos(phi0) * cosPhi * Math.cos(lambda),
  ];
}

function inverseOrtho(x, y, lon0, lat0) {
  const rho2 = x * x + y * y;
  if (rho2 > 1) return null;
  const rho = Math.sqrt(rho2);
  if (rho < 1e-12) return [lon0, lat0];
  const c = Math.asin(Math.min(1, rho));
  const phi0 = lat0 * Math.PI / 180;
  const lambda0 = lon0 * Math.PI / 180;
  const phi = Math.asin(Math.cos(c) * Math.sin(phi0) + (y * Math.sin(c) * Math.cos(phi0)) / rho);
  const lambda = lambda0 + Math.atan2(
    x * Math.sin(c),
    rho * Math.cos(c) * Math.cos(phi0) - y * Math.sin(c) * Math.sin(phi0),
  );
  return [lambda * 180 / Math.PI, phi * 180 / Math.PI];
}

function territoryCenter(polygons) {
  const box = boundsOf(polygons.flat());
  let lon0 = (box.minLon + box.maxLon) / 2;
  let lat0 = (box.minLat + box.maxLat) / 2;
  for (let pass = 0; pass < 2; pass += 1) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    polygons.forEach((rings) => {
      if (!rings.length || !rings[0].length) return;
      const delta = shiftLon(rings[0][0][0], lon0) - rings[0][0][0];
      rings.forEach((ring) => ring.forEach(([lon, lat]) => {
        const point = toSphere(lon + delta, lat, lon0, lat0);
        if (point[2] <= 0) return;
        minX = Math.min(minX, point[0]);
        minY = Math.min(minY, point[1]);
        maxX = Math.max(maxX, point[0]);
        maxY = Math.max(maxY, point[1]);
      }));
    });
    if (!Number.isFinite(minX)) break;
    const next = inverseOrtho((minX + maxX) / 2, (minY + maxY) / 2, lon0, lat0);
    if (!next) break;
    lon0 = next[0];
    lat0 = next[1];
  }
  return [lon0, lat0];
}

function horizonPoint(a, b) {
  const dz = a[2] - b[2];
  const t = Math.abs(dz) < 1e-12 ? 0 : a[2] / dz;
  const x = a[0] + (b[0] - a[0]) * t;
  const y = a[1] + (b[1] - a[1]) * t;
  const len = Math.hypot(x, y) || 1;
  return [x / len, y / len, 0];
}

function horizonArc(a, b) {
  const start = Math.atan2(a[1], a[0]);
  let delta = Math.atan2(b[1], b[0]) - start;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  const steps = Math.ceil(Math.abs(delta) / (Math.PI / 30));
  if (steps <= 1) return [];
  const arc = [];
  for (let step = 1; step < steps; step += 1) {
    const angle = start + (delta * step) / steps;
    arc.push([Math.cos(angle), Math.sin(angle)]);
  }
  return arc;
}

function clipFront(sphere) {
  if (sphere.length < 2) return [];
  const visible = (point) => point[2] >= -1e-8;
  const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7;
  const pieces = [];
  let current = null;
  const closePiece = () => {
    if (current && current.length) pieces.push(current);
    current = null;
  };
  for (let i = 1; i < sphere.length; i += 1) {
    const a = sphere[i - 1];
    const b = sphere[i];
    const frontA = visible(a);
    const frontB = visible(b);
    if (frontA && frontB) {
      if (!current) current = [a];
      current.push(b);
    } else if (frontA) {
      if (!current) current = [a];
      current.push(horizonPoint(a, b));
      closePiece();
    } else if (frontB) {
      current = [horizonPoint(a, b), b];
    }
  }
  if (current && pieces.length && same(current[current.length - 1], pieces[0][0])) {
    pieces[0] = current.concat(pieces[0].slice(1));
    current = null;
  }
  if (current) pieces.push(current);
  if (!pieces.length) return [];
  if (pieces.length === 1 && same(pieces[0][0], pieces[0][pieces[0].length - 1])) {
    return [pieces[0].map((point) => [point[0], point[1]])];
  }
  const ring = [];
  pieces.forEach((piece, pieceIndex) => {
    piece.forEach((point) => ring.push([point[0], point[1]]));
    const next = pieces[(pieceIndex + 1) % pieces.length];
    horizonArc(piece[piece.length - 1], next[0]).forEach((point) => ring.push(point));
  });
  if (ring.length >= 3) ring.push(ring[0]);
  return ring.length >= 4 ? [ring] : [];
}

function projectPolygons(polygons, lon0, lat0) {
  const projected = [];
  polygons.forEach((rings) => {
    if (!rings.length || !rings[0].length) return;
    const delta = shiftLon(rings[0][0][0], lon0) - rings[0][0][0];
    const visible = [];
    rings.forEach((ring) => {
      const sphere = ring.map(([lon, lat]) => toSphere(lon + delta, lat, lon0, lat0));
      clipFront(sphere).forEach((part) => visible.push(part));
    });
    if (visible.length) projected.push(visible);
  });
  return projected;
}

function fitPath(rings) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  rings.forEach((ring) => ring.forEach(([x, y]) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }));
  const width = maxX - minX;
  const height = maxY - minY;
  if (!(width > 1e-8) || !(height > 1e-8)) return "";
  const pad = 7;
  const avail = 100 - pad * 2;
  const scale = avail / Math.max(width, height);
  const offsetX = pad + (avail - width * scale) / 2;
  const offsetY = pad + (avail - height * scale) / 2;
  const commands = [];
  rings.forEach((ring) => {
    if (ring.length < 2) return;
    ring.forEach(([x, y], pointIndex) => {
      const px = offsetX + (x - minX) * scale;
      const py = offsetY + (y - minY) * scale;
      commands.push(`${pointIndex === 0 ? "M" : "L"}${px.toFixed(2)} ${py.toFixed(2)}`);
    });
    commands.push("Z");
  });
  return commands.join("");
}

function silhouette(geometry) {
  const kept = cluster(geometry);
  if (!kept.length) return "";
  const polygons = kept.map((item) => item.rings);
  const [lon0, lat0] = territoryCenter(polygons);
  const projected = projectPolygons(polygons, lon0, lat0)
    .map((rings) => rings.map((ring) => ring.map(([x, y]) => [x, -y])));
  return fitPath(projected.flat());
}

const LAMBERT = (() => {
  const a = 6378137;
  const flattening = 1 / 298.257222101;
  const e = Math.sqrt(flattening * (2 - flattening));
  const phi1 = 49 * Math.PI / 180;
  const phi2 = 44 * Math.PI / 180;
  const phi0 = 46.5 * Math.PI / 180;
  const lam0 = 3 * Math.PI / 180;
  const x0 = 700000;
  const y0 = 6600000;
  const m = (phi) => Math.cos(phi) / Math.sqrt(1 - e * e * Math.sin(phi) ** 2);
  const t = (phi) => {
    const s = Math.sin(phi);
    return Math.tan(Math.PI / 4 - phi / 2) / ((1 - e * s) / (1 + e * s)) ** (e / 2);
  };
  const n = Math.log(m(phi1) / m(phi2)) / Math.log(t(phi1) / t(phi2));
  const f = m(phi1) / (n * t(phi1) ** n);
  const rho0 = a * f * t(phi0) ** n;
  return (lonDeg, latDeg) => {
    const phi = latDeg * Math.PI / 180;
    const lam = lonDeg * Math.PI / 180;
    const rho = a * f * t(phi) ** n;
    const theta = n * (lam - lam0);
    return [x0 + rho * Math.sin(theta), -(y0 + rho0 - rho * Math.cos(theta))];
  };
})();

function lambertPath(geometry) {
  const rings = [];
  polygonsOf(geometry).forEach((polygon) => {
    polygon.forEach((ring) => {
      if (ring.length < 4) return;
      rings.push(ring.map(([lon, lat]) => LAMBERT(lon, lat)));
    });
  });
  return fitPath(rings);
}

function makeEntity(id, name, aliases, geometry, articles, overseas) {
  let d = "";
  if (overseas === true) d = silhouette(geometry);
  else if (overseas === false) d = lambertPath(geometry) || silhouette(geometry);
  else d = silhouette(geometry);
  if (!d) return null;
  return {
    id,
    name,
    letter: letterOf(name),
    article: articleOf(name, articles),
    keys: keysFor(name, aliases),
    d,
  };
}

function worldEntities(collection) {
  const list = [];
  collection.features.forEach((feature) => {
    const props = feature.properties || {};
    const id = props.ADM0_A3;
    if (!id || SKIP_ADM.has(id)) return;
    const sourceName = props.NAME_FR || props.NAME;
    const name = RENAME[id] || sourceName;
    const aliases = [...(ALIAS[id] || [])];
    if (sourceName && sourceName !== name) aliases.push(sourceName);
    const item = makeEntity(id, name, aliases, feature.geometry, WORLD_ARTICLE, null);
    if (item) list.push(item);
  });
  return addShortNames(list);
}

const SHORT_NAMES = [
  { id: "COG", name: "Congo", aliases: ["Congo-Brazzaville"] },
  { id: "CAF", name: "Centrafrique" },
  { id: "CZE", name: "République tchèque" },
];

function addShortNames(list) {
  const byId = new Map(list.map((item) => [item.id, item]));
  SHORT_NAMES.forEach((extra) => {
    const source = byId.get(extra.id);
    if (!source) return;
    const name = extra.name;
    list.push({
      id: source.id,
      name,
      letter: letterOf(name),
      article: articleOf(name, WORLD_ARTICLE),
      keys: keysFor(name, extra.aliases),
      d: source.d,
    });
  });
  return list;
}

function franceEntities(collection) {
  return collection.features.map((feature) => {
    const props = feature.properties || {};
    const name = props.name_fr || props.name;
    const aliases = [];
    if (props.name && norm(props.name) !== norm(name)) aliases.push(props.name);
    if (name === "La Réunion") aliases.push("Réunion");
    if (name === "Territoire de Belfort") aliases.push("Belfort");
    const overseas = /overseas/i.test(`${props.type_en || ""} ${props.type || ""}`);
    return makeEntity(props.iso_3166_2 || name, name, aliases, feature.geometry, DEPT_ARTICLE, overseas);
  }).filter(Boolean);
}

function usEntities(collection) {
  return collection.features.map((feature) => {
    const props = feature.properties || {};
    if (props.type === "Federal District" || props.iso_3166_2 === "US-DC") return null;
    let name = props.name_fr || props.name;
    name = name.replace(/^État de /, "").replace(/^Etat de /, "");
    const aliases = [];
    if (props.name && norm(props.name) !== norm(name)) aliases.push(props.name);
    if (props.name_fr && norm(props.name_fr) !== norm(name)) aliases.push(props.name_fr);
    return makeEntity(props.iso_3166_2 || name, name, aliases, feature.geometry, US_ARTICLE, null);
  }).filter(Boolean);
}

function indexEntities(list) {
  const map = new Map();
  const ambiguous = new Set();
  list.forEach((entity) => {
    entity.keys.forEach((key) => {
      if (ambiguous.has(key)) return;
      const previous = map.get(key);
      if (previous && previous !== entity) {
        map.delete(key);
        ambiguous.add(key);
        return;
      }
      map.set(key, entity);
    });
  });
  return map;
}

function lookup(table, query) {
  const spaced = norm(query);
  if (!spaced) return null;
  return table.get(spaced) || table.get(spaced.replace(/ /g, "")) || null;
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function groupsFor(list, places) {
  const groups = new Map();
  list.forEach((item) => {
    if (!groups.has(item.letter)) groups.set(item.letter, []);
    groups.get(item.letter).push(item);
  });
  return [...groups.entries()]
    .filter(([, items]) => items.length >= places)
    .map(([letter, pool]) => ({ letter, pool }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function pointsSoFar() {
  return rounds.reduce((sum, round) => sum + (round.points || 0), 0);
}

function setPressed(selector, key, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset[key] === String(value) ? "true" : "false");
  });
}

function paceLabel(ms) {
  if (ms === 10000) return "Stressant";
  if (ms === 5000) return "Hyper stressant";
  return "À la cool";
}

const TAGLINE = {
  world: "Le petit bac, mais avec que les pays.",
  us: "Le petit bac, mais avec que les États des États-Unis.",
  france: "Le petit bac, mais avec que les départements.",
};

function syncIntro() {
  const nine = settings.territory === "us" && settings.places === 3;
  lengthTen.textContent = nine ? "9 manches" : "10 manches";
  ui.lead.textContent = TAGLINE[settings.territory];
  const seconds = settings.ms / 1000;
  ui.paceNote.textContent = `${seconds} secondes pour trouver ${countPhrase(settings.places, settings.territory)}.`;
}

function renderHistory() {
  const done = rounds.filter((round) => round.done);
  ui.historyWrap.hidden = done.length === 0;
  if (!done.length) {
    ui.history.innerHTML = "";
    return;
  }
  const total = done.reduce((sum, round) => sum + round.points, 0);
  const max = done.length * settings.places;
  const items = done.map((round) => {
    const miss = round.points === 0 ? " is-miss" : "";
    return `<li><span>${round.letter}</span><span class="score-num${miss}">${round.points}/${settings.places}</span></li>`;
  });
  items.push(`<li class="score-history-total"><span>Score</span><span class="score-num">${total}/${max}</span></li>`);
  ui.history.innerHTML = items.join("");
}

function renderSlots(animateLast) {
  const round = rounds[index];
  ui.slots.dataset.count = String(settings.places);
  ui.slots.replaceChildren();
  for (let slot = 0; slot < settings.places; slot += 1) {
    const found = round.found[slot];
    const figure = document.createElement("figure");
    figure.className = found ? "slot is-filled" : "slot is-empty";
    if (found && animateLast && slot === round.found.length - 1) figure.classList.add("is-new");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", found ? found.d : "");
    svg.append(path);
    const caption = document.createElement("figcaption");
    caption.textContent = found ? found.name : "";
    figure.append(svg, caption);
    ui.slots.append(figure);
  }
}

function focusGuess() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  ui.guess.focus();
}

function reject(message) {
  ui.hint.textContent = message;
  ui.guess.value = "";
  ui.guess.classList.remove("is-shake");
  void ui.guess.offsetWidth;
  ui.guess.classList.add("is-shake");
  ui.guess.focus();
}

function stopRoundTimer() {
  cancelAnimationFrame(timerFrame);
  timerFrame = 0;
}

function tickRoundTimer() {
  if (locked) return;
  const left = roundEndsAt - Date.now();
  if (left <= 0) {
    ui.timerFill.style.width = "0%";
    ui.timerBar.setAttribute("aria-valuenow", "0");
    ui.timerValue.textContent = "0 s";
    closeRound("timeout");
    return;
  }
  const pct = (left / settings.ms) * 100;
  ui.timerFill.style.width = `${pct}%`;
  ui.timerBar.setAttribute("aria-valuenow", String(Math.round(pct)));
  ui.timerValue.textContent = `${Math.ceil(left / 1000)} s`;
  timerFrame = requestAnimationFrame(tickRoundTimer);
}

function startRoundTimer() {
  stopRoundTimer();
  roundEndsAt = Date.now() + settings.ms;
  ui.timerBlock.hidden = false;
  ui.timerFill.style.width = "100%";
  ui.timerBar.setAttribute("aria-valuenow", "100");
  ui.timerValue.textContent = `${settings.ms / 1000} s`;
  timerFrame = requestAnimationFrame(tickRoundTimer);
}

function stopCountdown() {
  window.clearInterval(countdownTimer);
  countdownTimer = 0;
}

function startCountdown(label) {
  stopCountdown();
  let left = 5;
  const paint = () => {
    ui.next.textContent = `${label} · ${left}`;
  };
  paint();
  countdownTimer = window.setInterval(() => {
    left -= 1;
    if (left <= 0) {
      stopCountdown();
      goNext();
      return;
    }
    paint();
  }, 1000);
}

function closeRound(kind) {
  if (locked) return;
  locked = true;
  stopRoundTimer();
  const round = rounds[index];
  round.done = true;
  round.outcome = kind;
  round.examples = kind === "hit" ? "" : exampleSentence(round);
  ui.timerBlock.hidden = true;
  ui.form.hidden = true;
  ui.feedback.hidden = false;
  ui.feedback.classList.toggle("is-hit", kind === "hit");
  ui.feedback.classList.toggle("is-miss", kind !== "hit");
  ui.feedbackKicker.textContent = kind === "hit" ? "Bravo !" : "Temps écoulé";
  if (kind === "hit") launchConfetti();
  ui.feedbackDetail.hidden = kind === "hit" || !round.examples;
  ui.feedbackDetail.textContent = round.examples;
  const last = index >= rounds.length - 1;
  const label = last ? "Voir le score" : "Manche suivante";
  startCountdown(label);
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  renderHistory();
  ui.guess.blur();
  scheduleFit();
}

function renderRound() {
  const round = rounds[index];
  locked = false;
  leaving = false;
  ui.kicker.textContent = `Manche ${index + 1} / ${rounds.length}`;
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  ui.askLine.textContent = askText();
  ui.letter.textContent = round.letter;
  ui.guess.placeholder = PLACEHOLDER[settings.territory];
  ui.guess.value = "";
  ui.hint.textContent = "";
  ui.guess.classList.remove("is-shake");
  ui.form.hidden = false;
  ui.feedback.hidden = true;
  ui.feedbackDetail.textContent = "";
  clearConfetti();
  renderSlots(false);
  renderHistory();
  startRoundTimer();
  scheduleFit();
  focusGuess();
}

function goNext() {
  if (leaving) return;
  leaving = true;
  stopCountdown();
  if (index >= rounds.length - 1) finish();
  else {
    index += 1;
    renderRound();
  }
}

function clearConfetti() {
  window.clearTimeout(confettiTimer);
  confettiTimer = 0;
  ui.confetti.replaceChildren();
}

function launchConfetti() {
  clearConfetti();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 36; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const wide = Math.random() > 0.35;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${wide ? 5 + Math.random() * 4 : 6 + Math.random() * 3}px`;
    piece.style.height = `${wide ? 8 + Math.random() * 5 : 6 + Math.random() * 3}px`;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.borderRadius = wide ? "1px" : "50%";
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 140}px`);
    piece.style.setProperty("--spin", `${160 + Math.random() * 560}deg`);
    piece.style.animationDuration = `${1.45 + Math.random() * 1.15}s`;
    piece.style.animationDelay = `${Math.random() * 0.22}s`;
    ui.confetti.append(piece);
  }
  confettiTimer = window.setTimeout(clearConfetti, 2900);
}

function finish() {
  stopCountdown();
  stopRoundTimer();
  clearConfetti();
  ui.timerBlock.hidden = true;
  ui.dock.hidden = true;
  ui.chrome.hidden = true;
  ui.historyWrap.hidden = true;
  const total = pointsSoFar();
  const max = rounds.length * settings.places;
  ui.finalScore.textContent = `${total}/${max}`;
  ui.finishPace.textContent = paceLabel(settings.ms);
  ui.recap.innerHTML = rounds.map((round) => {
    const miss = round.points === 0 ? " is-miss" : "";
    const names = round.found.map((item) => item.name).join(", ");
    const detail = names || "Ben alors ?";
    return `<li>
      <p class="finish-recap-name">${round.letter}</p>
      <p class="finish-recap-score${miss}">${round.points}/${settings.places}</p>
      <p class="finish-recap-detail">${escapeHtml(detail)}</p>
    </li>`;
  }).join("");
  ui.finish.hidden = false;
}

function submitGuess(typed) {
  if (locked) return;
  const query = String(typed || "").trim();
  if (!query) return;
  const round = rounds[index];
  const entity = lookup(indexes[settings.territory], query);
  if (!entity) {
    reject(UNKNOWN[settings.territory]);
    return;
  }
  if (entity.letter !== round.letter) {
    reject(`Ça ne commence pas par ${round.letter}.`);
    return;
  }
  if (round.found.some((item) => item.id === entity.id)) {
    reject("Déjà trouvé.");
    return;
  }
  round.found.push(entity);
  round.points = round.found.length;
  ui.hint.textContent = "";
  ui.guess.value = "";
  renderSlots(true);
  ui.scoreLine.textContent = `Score ${pointsSoFar()}`;
  scheduleFit();
  if (round.found.length >= settings.places) {
    ui.guess.blur();
    closeRound("hit");
    return;
  }
  ui.guess.focus();
}

function startGame() {
  const pool = groupsFor(catalogs[settings.territory], settings.places);
  const count = Math.min(roundCount(), pool.length);
  if (!count) return;
  rounds = shuffle(pool).slice(0, count).map((group) => ({
    letter: group.letter,
    pool: group.pool,
    found: [],
    points: 0,
    done: false,
    outcome: null,
    examples: "",
  }));
  index = 0;
  locked = false;
  ui.intro.hidden = true;
  ui.finish.hidden = true;
  ui.chrome.hidden = false;
  ui.stage.hidden = false;
  ui.dock.hidden = false;
  renderRound();
}

function showIntro() {
  stopCountdown();
  stopRoundTimer();
  locked = true;
  ui.finish.hidden = true;
  ui.chrome.hidden = true;
  ui.historyWrap.hidden = true;
  ui.stage.hidden = true;
  ui.dock.hidden = true;
  ui.timerBlock.hidden = true;
  ui.intro.hidden = false;
  scheduleFit();
}

function bindSettings() {
  document.querySelectorAll("[data-territory]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.territory = button.dataset.territory;
      setPressed("[data-territory]", "territory", settings.territory);
      syncIntro();
    });
  });
  document.querySelectorAll("[data-places]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.places = Number(button.dataset.places);
      setPressed("[data-places]", "places", settings.places);
      syncIntro();
    });
  });
  document.querySelectorAll("[data-length]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.length = Number(button.dataset.length);
      setPressed("[data-length]", "length", settings.length);
      syncIntro();
    });
  });
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      settings.ms = Number(button.dataset.ms);
      setPressed("[data-ms]", "ms", settings.ms);
      syncIntro();
    });
  });
  syncIntro();
  ui.start.addEventListener("click", startGame);
  ui.next.addEventListener("click", goNext);
  ui.replay.addEventListener("click", showIntro);
  ui.validate.addEventListener("mousedown", (event) => event.preventDefault());
  ui.form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitGuess(ui.guess.value);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.repeat || event.isComposing) return;
    if (!locked || leaving || !ui.finish.hidden) return;
    if (ui.feedback.hidden || !ui.feedback.classList.contains("is-hit")) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    event.preventDefault();
    goNext();
  }, true);
  ui.guess.addEventListener("input", () => {
    if (ui.hint.textContent) ui.hint.textContent = "";
  });
}

function fitPlayfield() {
  const viewport = window.visualViewport;
  const top = viewport ? viewport.offsetTop : 0;
  const height = viewport ? viewport.height : window.innerHeight;
  const root = document.documentElement;
  const focused = document.activeElement === ui.guess;
  const shrunk = fullHeight - height > 120;
  const keyboard = shrunk && (focused || root.classList.contains("is-keyboard"));
  if (!keyboard) fullHeight = Math.max(window.innerHeight, height);
  root.classList.toggle("is-keyboard", keyboard);
  root.style.setProperty("--vv-top", `${top}px`);
  root.style.setProperty("--vv-height", `${height}px`);
  const dockH = ui.dock && !ui.dock.hidden ? ui.dock.offsetHeight : 0;
  root.style.setProperty("--dock-h", `${dockH}px`);
  if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
}

function scheduleFit() {
  cancelAnimationFrame(fitFrame);
  fitFrame = requestAnimationFrame(fitPlayfield);
}

function bindViewport() {
  const viewport = window.visualViewport;
  if (viewport) {
    viewport.addEventListener("resize", scheduleFit);
    viewport.addEventListener("scroll", scheduleFit);
  }
  window.addEventListener("resize", scheduleFit);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleFit).observe(ui.dock);
  ui.guess.addEventListener("focus", () => {
    window.scrollTo(0, 0);
    scheduleFit();
  });
  scheduleFit();
}

function setProgress(ratio) {
  const value = Math.max(0, Math.min(100, Math.round(ratio * 100)));
  ui.loadFill.style.width = `${value}%`;
  ui.loadFill.parentElement.setAttribute("aria-valuenow", String(value));
}

async function loadJson(url, from, to) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(url);
  const total = Number(response.headers.get("content-length")) || 0;
  const reader = response.body && response.body.getReader();
  if (!reader) {
    setProgress(to);
    return response.json();
  }
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    const intra = total ? received / total : 1;
    setProgress(from + (to - from) * intra);
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.length;
  });
  return JSON.parse(new TextDecoder().decode(buffer));
}

async function boot() {
  bindSettings();
  bindViewport();
  try {
    const world = await loadJson(DATA.world, 0, 0.55);
    const france = await loadJson(DATA.france, 0.55, 0.75);
    const us = await loadJson(DATA.us, 0.75, 0.9);
    setProgress(0.92);
    catalogs = {
      world: worldEntities(world),
      france: franceEntities(france),
      us: usEntities(us),
    };
    indexes = {
      world: indexEntities(catalogs.world),
      france: indexEntities(catalogs.france),
      us: indexEntities(catalogs.us),
    };
    if (catalogs.world.length < 150 || catalogs.france.length < 100 || catalogs.us.length < 50) {
      throw new Error("catalogue incomplet");
    }
    if (indexes.world.get("hollande")) throw new Error("Hollande ne compte pas");
    if (indexes.world.get("congo")?.letter !== "C") throw new Error("Congo");
    if (indexes.world.get("republique du congo")?.letter !== "R") throw new Error("République du Congo");
    if (indexes.world.get("republique democratique du congo")?.name !== "République démocratique du Congo") {
      throw new Error("République démocratique du Congo");
    }
    if (indexes.world.get("rdc") || indexes.world.get("zaire")) throw new Error("Congo démocratique en entier");
    if (indexes.world.get("centrafrique")?.letter !== "C") throw new Error("Centrafrique");
    if (indexes.world.get("republique centrafricaine")?.letter !== "R") throw new Error("République centrafricaine");
    if (indexes.world.get("tchequie")?.letter !== "T") throw new Error("Tchéquie");
    if (indexes.world.get("republique tcheque")?.letter !== "R") throw new Error("République tchèque");
    if (!indexes.world.get("pays bas")) throw new Error("Pays-Bas manquant");
    if (indexes.france.get("reunion")?.letter !== "L") throw new Error("Réunion");
    if (indexes.us.get("california")?.name !== "Californie") throw new Error("Californie");
    setProgress(1);
    ui.load.classList.add("is-done");
    ui.load.setAttribute("aria-busy", "false");
    ui.intro.hidden = false;
    window.setTimeout(() => { ui.load.hidden = true; }, 500);
  } catch (error) {
    ui.loadText.textContent = "Le chargement des cartes a échoué.";
    console.error(error);
  }
}

boot();
