"use strict";
/* =========================================================
   HANFANDA — Peta Globe + Warna Bendera + Filter Negara
   Tema: Hitam • Cerah • Hujan (efek hujan lembut)
   Stabil + fallback jika GeoJSON gagal dimuat.
   ========================================================= */

/* Dataset hewan — menyertakan daftar negara (ISO2) untuk filter */
const animals = [
  { id:"harimau", emoji:"🐯", name:"Harimau", latin:"Panthera tigris",
    habitat:"Hutan hujan, sabana, lahan basah Asia", diet:"Karnivora (rusa, babi hutan, kerbau muda)",
    status:"Terancam Punah", lifespan:15, weightKg:220, length:"2.7–3.1 m",
    tags:["Asia","Karnivora","Kucing Besar"], teaser:"Pemburu sunyi bergaris.",
    facts:["Garis unik seperti sidik jari.","Perenang andal.","Auman terdengar km jauhnya."],
    ranges:[ {label:"India",lat:22.5,lng:79.5,r:600}, {label:"Siberia Timur",lat:46,lng:134,r:500}, {label:"Sumatra",lat:-1.65,lng:103.6,r:280} ],
    countries:["IN","RU","ID","BD","NP","MM","TH","LA","KH","VN","CN"]
  },
  { id:"singa", emoji:"🦁", name:"Singa", latin:"Panthera leo",
    habitat:"Sabana Afrika; kantong kecil di India", diet:"Karnivora (antelope, zebra, kerbau)",
    status:"Rentan", lifespan:14, weightKg:190, length:"2.4–2.8 m",
    tags:["Afrika","Karnivora","Sosial"], teaser:"Ikon sabana berkelompok.",
    facts:["Hidup berpride.","Jantan berjambang.","Cenderung nokturnal."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:36,r:800}, {label:"Afrika Selatan",lat:-20,lng:25,r:900}, {label:"Gir, India",lat:21,lng:70,r:200} ],
    countries:["KE","TZ","UG","ZA","BW","NA","ZM","MZ","IN"]
  },
  { id:"cheetah", emoji:"🐆", name:"Cheetah", latin:"Acinonyx jubatus",
    habitat:"Sabana terbuka Afrika", diet:"Karnivora (gazelle kecil, impala muda)",
    status:"Rentan", lifespan:12, weightKg:65, length:"1.1–1.5 m",
    tags:["Afrika","Karnivora","Tercepat"], teaser:"Sprinter ulung sabana.",
    facts:["~100 km/jam.","Tubuh aerodinamis.","Kuku semi-tidak ditarik."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:35,r:600}, {label:"Afrika Selatan",lat:-18,lng:22,r:800} ],
    countries:["KE","TZ","NA","ZA","BW"]
  },
  { id:"gajah", emoji:"🐘", name:"Gajah", latin:"Elephas maximus / Loxodonta africana",
    habitat:"Hutan, sabana, padang rumput Afrika & Asia", diet:"Herbivora (rumput, daun, kulit kayu)",
    status:"Rentan", lifespan:60, weightKg:4000, length:"2.5–4 m (tinggi bahu)",
    tags:["Afrika","Asia","Herbivora"], teaser:"Raksasa cerdas dan sosial.",
    facts:["Memori kuat.","Komunikasi infrasonik.","Belalai ribuan otot."],
    ranges:[ {label:"Afrika Sub-Sahara",lat:-2,lng:23,r:1400}, {label:"Asia Selatan–Tenggara",lat:10,lng:100,r:1200} ],
    countries:["KE","TZ","ZA","BW","IN","LK","TH","MY","MM","LA","KH"]
  },
  { id:"jerapah", emoji:"🦒", name:"Jerapah", latin:"Giraffa camelopardalis",
    habitat:"Sabana Afrika", diet:"Herbivora (daun akasia, pucuk)",
    status:"Rentan", lifespan:25, weightKg:800, length:"4.5–5.5 m (tinggi)",
    tags:["Afrika","Herbivora","Tertinggi"], teaser:"Si jangkung pemakan pucuk.",
    facts:["Mamalia tertinggi.","Lidah ~45 cm.","Tekanan darah tinggi."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:36,r:700}, {label:"Afrika Selatan",lat:-22,lng:24,r:800} ],
    countries:["KE","TZ","ZA","NA","BW"]
  },
  { id:"badak", emoji:"🦏", name:"Badak (putih/india)", latin:"C. simum / R. unicornis",
    habitat:"Sabana Afrika; dataran banjir India/Nepal", diet:"Herbivora (rumput, pucuk)",
    status:"Terancam Punah", lifespan:40, weightKg:2300, length:"3.5–4.2 m",
    tags:["Afrika","Asia","Herbivora"], teaser:"Raksasa berkulit tebal.",
    facts:["Kulit bagai zirah.","Penciuman tajam.","Tanduk keratin."],
    ranges:[ {label:"Afrika Selatan",lat:-24,lng:26,r:600}, {label:"India Timur Laut",lat:26,lng:86,r:200} ],
    countries:["ZA","NA","IN","NP"]
  },
  { id:"zebra", emoji:"🦓", name:"Zebra", latin:"Equus quagga",
    habitat:"Sabana dan padang rumput Afrika", diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:350, length:"2.0–2.6 m",
    tags:["Afrika","Herbivora","Bergaris"], teaser:"Kuda bergaris khas.",
    facts:["Garis unik tiap individu.","Tahan kekeringan.","Bergerombol."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:37,r:800}, {label:"Afrika Selatan",lat:-23,lng:25,r:800} ],
    countries:["KE","TZ","ZA","BW"]
  },
  { id:"kudanil", emoji:"🦛", name:"Kuda Nil", latin:"Hippopotamus amphibius",
    habitat:"Sungai/danau Afrika sub-Sahara", diet:"Herbivora (rumput)",
    status:"Rentan", lifespan:40, weightKg:1500, length:"3–5 m",
    tags:["Afrika","Semiakuatik","Herbivora"], teaser:"Si berat betah di air.",
    facts:["Teritorial di air.","Mulut sangat lebar.","Aktif malam."],
    ranges:[ {label:"Afrika Timur",lat:-3,lng:35,r:800}, {label:"Afrika Selatan",lat:-17,lng:30,r:900} ],
    countries:["KE","TZ","MZ","ZM","ZA"]
  },
  { id:"panda", emoji:"🐼", name:"Panda Raksasa", latin:"Ailuropoda melanoleuca",
    habitat:"Hutan bambu pegunungan Tiongkok", diet:"Herbivora (bambu)",
    status:"Rentan", lifespan:20, weightKg:100, length:"1.2–1.9 m",
    tags:["Asia","Herbivora","Ikonik"], teaser:"Ahli bambu yang damai.",
    facts:["‘Jempol palsu’.","Kontras warna membantu.","Makan sepanjang hari."],
    ranges:[ {label:"Sichuan",lat:31.5,lng:103.5,r:250} ],
    countries:["CN"]
  },
  { id:"orangutan", emoji:"🦧", name:"Orangutan", latin:"Pongo spp.",
    habitat:"Hutan hujan Sumatra & Kalimantan", diet:"Omnivora (buah, daun, serangga)",
    status:"Terancam Punah", lifespan:35, weightKg:50, length:"1.2–1.5 m",
    tags:["Asia","Primata","Arboreal"], teaser:"Kera cerdas penghuni kanopi.",
    facts:["Berperilaku beralat.","Soliter relatif.","Asuh anak panjang."],
    ranges:[ {label:"Kalimantan",lat:0.5,lng:114,r:400}, {label:"Sumatra",lat:2.5,lng:98.8,r:300} ],
    countries:["ID","MY"]
  },
  { id:"komodo", emoji:"🦎", name:"Komodo", latin:"Varanus komodoensis",
    habitat:"Savanna & hutan kering Nusa Tenggara", diet:"Karnivora (bangkai, mamalia, burung)",
    status:"Rentan", lifespan:30, weightKg:70, length:"2–3 m",
    tags:["Indonesia","Reptil","Apex"], teaser:"Predator purba Indonesia.",
    facts:["Kadal terbesar; racun.","Penciuman tajam.","Lari cepat."],
    ranges:[ {label:"Komodo",lat:-8.57,lng:119.48,r:50}, {label:"Rinca",lat:-8.66,lng:119.73,r:40}, {label:"Flores Barat",lat:-8.71,lng:120.58,r:80} ],
    countries:["ID"]
  },
  { id:"tapir", emoji:"🐾", name:"Tapir Melayu", latin:"Tapirus indicus",
    habitat:"Hutan hujan Asia Tenggara", diet:"Herbivora (daun, buah)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"1.8–2.5 m",
    tags:["Asia","Herbivora","Nokturnal"], teaser:"Si pemalu hitam-putih.",
    facts:["Moncong seperti belalai.","Pola kontras.","Perenang."],
    ranges:[ {label:"Semenanjung Malaya",lat:4.2,lng:102.0,r:400}, {label:"Sumatra",lat:-0.5,lng:102.5,r:500}, {label:"Thailand",lat:10.5,lng:101.0,r:400} ],
    countries:["MY","TH","ID"]
  },
  { id:"kanguru", emoji:"🦘", name:"Kanguru", latin:"Macropus spp.",
    habitat:"Semak belukar & padang rumput Australia", diet:"Herbivora (rumput, daun)",
    status:"Risiko Rendah", lifespan:20, weightKg:85, length:"1.0–1.8 m (tinggi)",
    tags:["Australia","Marsupial","Pelompat"], teaser:"Atlet pelompat Australia.",
    facts:["Lompatan hemat energi.","Joey di kantong.","Ekor stabilizer."],
    ranges:[ {label:"Australia",lat:-25,lng:133,r:1500} ],
    countries:["AU"]
  },
  { id:"koala", emoji:"🐨", name:"Koala", latin:"Phascolarctos cinereus",
    habitat:"Hutan eukaliptus Australia Timur", diet:"Herbivora (daun eukaliptus)",
    status:"Rentan", lifespan:15, weightKg:12, length:"0.6–0.85 m",
    tags:["Australia","Marsupial","Arboreal"], teaser:"Si pendiam pecinta eukaliptus.",
    facts:["Banyak tidur.","Diet khusus.","Penciuman pilih daun."],
    ranges:[ {label:"Queensland–NSW",lat:-27,lng:153,r:400}, {label:"Victoria",lat:-37,lng:145,r:300} ],
    countries:["AU"]
  },
  { id:"beruang", emoji:"🐻", name:"Beruang Cokelat", latin:"Ursus arctos",
    habitat:"Hutan boreal, pegunungan, tundra", diet:"Omnivora (buah, ikan, mamalia kecil)",
    status:"Risiko Rendah", lifespan:25, weightKg:350, length:"1.2–2.8 m",
    tags:["Omnivora","Belahan Utara","Soliter"], teaser:"Raksasa berbulu pemalu.",
    facts:["Hibernasi.","Cakar kuat.","Penciuman tajam."],
    ranges:[ {label:"Alaska",lat:61,lng:-150,r:900}, {label:"Rusia",lat:60,lng:100,r:1400}, {label:"Skandinavia",lat:62,lng:15,r:600} ],
    countries:["US","CA","RU","NO","SE","FI"]
  },
  { id:"serigala", emoji:"🐺", name:"Serigala Abu-abu", latin:"Canis lupus",
    habitat:"Hutan, tundra, pegunungan, padang rumput", diet:"Karnivora (ungulata kecil–menengah)",
    status:"Risiko Rendah", lifespan:13, weightKg:50, length:"1.0–1.6 m",
    tags:["Karnivora","Sosial","Belahan Utara"], teaser:"Koordinator kawanan.",
    facts:["Berburu kooperatif.","Melolong wilayah.","Adaptif iklim."],
    ranges:[ {label:"Kanada",lat:56,lng:-106,r:1200}, {label:"Eurasia Utara",lat:60,lng:90,r:1400} ],
    countries:["US","CA","RU","SE","NO","FI"]
  },
  { id:"rubah", emoji:"🦊", name:"Rubah Merah", latin:"Vulpes vulpes",
    habitat:"Beragam habitat belahan utara", diet:"Omnivora (rodensia, burung, buah)",
    status:"Risiko Rendah", lifespan:8, weightKg:8, length:"0.45–0.9 m",
    tags:["Omnivora","Adaptif","Belahan Utara"], teaser:"Si licik adaptif.",
    facts:["Adaptif di kota.","Pendengaran tajam.","Ekor untuk keseimbangan."],
    ranges:[ {label:"Eropa",lat:52,lng:10,r:900}, {label:"Amerika Utara",lat:45,lng:-100,r:1200}, {label:"Jepang",lat:43,lng:142,r:500} ],
    countries:["US","CA","GB","FR","JP","DE","PL","RU"]
  },
  { id:"bison", emoji:"🦬", name:"Bison Amerika", latin:"Bison bison",
    habitat:"Padang rumput Amerika Utara", diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:900, length:"2–3.5 m",
    tags:["Amerika Utara","Herbivora","Ikonik"], teaser:"Ikon Great Plains.",
    facts:["Hampir punah, kini pulih di taman nasional.","Lari hingga ~55 km/jam.","Jantan bertanduk besar."],
    ranges:[ {label:"Yellowstone",lat:44.6,lng:-110.5,r:200}, {label:"Great Plains",lat:49,lng:-99,r:300} ],
    countries:["US","CA"]
  },
  { id:"unta", emoji:"🐪", name:"Unta Dromedaris", latin:"Camelus dromedarius",
    habitat:"Gurun Afrika Utara & Timur Tengah", diet:"Herbivora (semak, rumput gurun)",
    status:"Risiko Rendah", lifespan:40, weightKg:600, length:"1.9–2.3 m (tinggi bahu)",
    tags:["Gurun","Herbivora","Domestik"], teaser:"Transportasi gurun tangguh.",
    facts:["Punuk simpan lemak.","Tahan dehidrasi.","Kaki bantalan pasir."],
    ranges:[ {label:"Arab",lat:23,lng:45,r:800}, {label:"Sahara",lat:20,lng:13,r:1000} ],
    countries:["SA","AE","OM","DZ","MR","EG"]
  }
];

/* ====== Negara & Warna bendera ====== */
const COUNTRY_NAMES = {
  IN:"India", RU:"Rusia", ID:"Indonesia", BD:"Bangladesh", NP:"Nepal", MM:"Myanmar", TH:"Thailand", LA:"Laos", KH:"Kamboja", VN:"Vietnam", CN:"Tiongkok",
  KE:"Kenya", TZ:"Tanzania", UG:"Uganda", ZA:"Afrika Selatan", BW:"Botswana", NA:"Namibia", ZM:"Zambia", MZ:"Mozambik",
  LK:"Sri Lanka", MY:"Malaysia", AU:"Australia", JP:"Jepang", GB:"Britania Raya", FR:"Prancis", DE:"Jerman", PL:"Polandia",
  NO:"Norwegia", SE:"Swedia", FI:"Finlandia", US:"Amerika Serikat", CA:"Kanada",
  SA:"Arab Saudi", AE:"Uni Emirat Arab", OM:"Oman", DZ:"Aljazair", MR:"Mauritania", EG:"Mesir"
};
const FLAG_COLORS = {
  IN:["#FF9933","#FFFFFF","#138808"], RU:["#FFFFFF","#0039A6","#D52B1E"], ID:["#FF0000","#FFFFFF"],
  BD:["#006A4E","#F42A41"], NP:["#DC143C","#003893","#FFFFFF"], MM:["#FECB00","#34B233","#EA2839"],
  TH:["#2D2A4A","#FFFFFF","#DA121A"], LA:["#002868","#FFFFFF","#CE1126"], KH:["#032EA1","#FFFFFF","#E00025"],
  VN:["#DA251D","#FFFF00"], CN:["#DE2910","#FFDE00"],
  KE:["#060606","#FFFFFF","#BB0000","#006600"], TZ:["#1EB53A","#FCD116","#00A3DD","#000000"],
  UG:["#FFCD00","#000000","#D90000"], ZA:["#007749","#000000","#FFB915","#DE3831","#002395","#FFFFFF"],
  BW:["#75AADB","#000000","#FFFFFF"], NA:["#003580","#009543","#FFFFFF","#D21034"], ZM:["#1A6A33","#E05206","#EF7D00","#000000"],
  MZ:["#D21034","#007168","#FCE100","#000000"], LK:["#FFA500","#8D153A","#006600"], MY:["#010066","#CC0001","#FFCC00"],
  AU:["#00008B","#FFFFFF","#FF0000"], JP:["#FFFFFF","#BC002D"],
  GB:["#00247D","#CF142B","#FFFFFF"], FR:["#0055A4","#FFFFFF","#EF4135"], DE:["#000000","#DD0000","#FFCE00"], PL:["#FFFFFF","#DC143C"],
  NO:["#BA0C2F","#FFFFFF","#00205B"], SE:["#006AA7","#FECC00"], FI:["#FFFFFF","#003580"],
  US:["#B22234","#3C3B6E","#FFFFFF"], CA:["#FF0000","#FFFFFF"],
  SA:["#006C35","#FFFFFF"], AE:["#FF0000","#00732F","#000000","#FFFFFF"], OM:["#C8102E","#FFFFFF","#007A3D"],
  DZ:["#006233","#FFFFFF","#D21034"], MR:["#006233","#FFD700"], EG:["#CE1126","#FFFFFF","#000000"]
};
const NAME_ALIASES = {
  "india":"IN","russia":"RU","russian federation":"RU","indonesia":"ID","bangladesh":"BD","nepal":"NP","myanmar":"MM",
  "thailand":"TH","laos":"LA","lao pdr":"LA","lao people's democratic republic":"LA","cambodia":"KH","viet nam":"VN","vietnam":"VN","china":"CN",
  "kenya":"KE","tanzania":"TZ","united republic of tanzania":"TZ","uganda":"UG","south africa":"ZA","botswana":"BW","namibia":"NA",
  "zambia":"ZM","mozambique":"MZ","sri lanka":"LK","malaysia":"MY","australia":"AU","japan":"JP","united kingdom":"GB","great britain":"GB",
  "france":"FR","germany":"DE","poland":"PL","norway":"NO","sweden":"SE","finland":"FI","united states of america":"US","united states":"US","usa":"US","canada":"CA",
  "saudi arabia":"SA","united arab emirates":"AE","oman":"OM","algeria":"DZ","mauritania":"MR","egypt":"EG"
};

/* ====== Elemen ====== */
const els = {
  cards: q("#cards"),
  search: q("#search"),
  sort: q("#sort"),
  density: q("#density"),
  empty: q("#empty"),
  clearSearchBtn: q("#clearSearch"),
  resultCount: q("#resultCount"),
  countryChip: q("#countryChip"),
  countryChipText: q("#countryChipText"),
  searchChip: q("#searchChip"),
  searchChipText: q("#searchChipText"),
  themeSelect: q("#themeSelect"),
  themeBadge: q("#themeBadge"),
  viewMode: q("#viewMode"),

  modal: q("#modal"),
  modalTitle: q("#modalTitle"),
  modalLatin: q("#modalLatin"),
  modalHabitat: q("#modalHabitat"),
  modalDiet: q("#modalDiet"),
  modalStatus: q("#modalStatus"),
  modalLifespan: q("#modalLifespan"),
  modalWeight: q("#modalWeight"),
  modalLength: q("#modalLength"),
  modalFacts: q("#modalFacts"),
  modalIcon: q("#modalIcon"),

  toast: q("#toast"),

  mapContainer: q("#map"),
  showMarkers: q("#showMarkers"),
  showRanges: q("#showRanges"),
  fitAll: q("#fitAll"),
  fitVisible: q("#fitVisible"),
  countrySelect: q("#countrySelect"),
  clearCountry: q("#clearCountry"),
  flagSwatch: q("#flagSwatch")
};

/* ====== State + preferensi ====== */
const store = {
  get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch{ return d; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch{} }
};
let state = Object.assign({
  query: "",
  sort: "name-asc",
  dense: false,
  showMarkers: true,
  showRanges: true,
  countryIso: "",
  theme: store.get("theme","hitam"),
  view: store.get("view","cards")
}, store.get("state", {}));

/* ====== Helpers ====== */
function q(s){ return document.querySelector(s); }
function formatKg(kg){ return new Intl.NumberFormat('id-ID').format(kg) + " kg"; }
function matchesQuery(an, q){
  if(!q) return true;
  const hay = (an.name+" "+an.latin+" "+an.habitat+" "+an.diet+" "+an.status+" "+an.tags.join(" ")+" "+an.teaser).toLowerCase();
  return hay.includes(q.toLowerCase());
}
function bySort(a,b){
  switch(state.sort){
    case "name-asc": return a.name.localeCompare(b.name, 'id');
    case "name-desc": return b.name.localeCompare(a.name, 'id');
    case "status": return STATUS_RANK[a.status] - STATUS_RANK[b.status];
    case "weight": return b.weightKg - a.weightKg;
    case "lifespan": return b.lifespan - a.lifespan;
    default: return 0;
  }
}
const STATUS_RANK = { "Punah":0, "Kritis":1, "Terancam Punah":2, "Rentan":3, "Hampir Terancam":4, "Risiko Rendah":5 };
function isoToFlagEmoji(iso2){
  if(!iso2 || iso2.length!==2) return "🏳️";
  const A = 0x1F1E6;
  return String.fromCodePoint(...iso2.toUpperCase().split("").map(c => A + (c.charCodeAt(0) - 65)));
}
function setFlagSwatch(iso){
  const cols = FLAG_COLORS[iso] || ["#eee","#ddd","#ccc"];
  const stops = cols.map((c,i,arr)=> `${c} ${Math.round(i/arr.length*100)}% ${Math.round((i+1)/arr.length*100)}%`).join(", ");
  els.flagSwatch.style.background = `linear-gradient(90deg, ${stops})`;
  els.flagSwatch.title = iso ? `Bendera: ${COUNTRY_NAMES[iso] || iso}` : "Warna bendera";
}
function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  els.themeBadge.textContent = `Tema: ${t.charAt(0).toUpperCase()+t.slice(1)}`;
  store.set("theme", t); state.theme = t; store.set("state", state);
}
function applyView(v){
  els.viewMode.value = v;
  els.cards.classList.toggle("list", v==="list");
  store.set("view", v); state.view = v; store.set("state", state);
}

/* ====== Index negara -> hewan & dropdown ====== */
const COUNTRY_ANIMALS = {};
animals.forEach(a=>{
  (a.countries||[]).forEach(iso=>{
    (COUNTRY_ANIMALS[iso] ||= []).push(a.id);
  });
});
function buildCountrySelect(){
  const isos = Object.keys(COUNTRY_ANIMALS).sort((a,b)=> (COUNTRY_NAMES[a]||a).localeCompare(COUNTRY_NAMES[b]||b,'id'));
  const frag = document.createDocumentFragment();
  const opt0 = document.createElement("option");
  opt0.value = ""; opt0.textContent = "— Pilih negara —";
  frag.appendChild(opt0);
  isos.forEach(iso=>{
    const o = document.createElement("option");
    o.value = iso;
    o.textContent = `${isoToFlagEmoji(iso)} ${COUNTRY_NAMES[iso]||iso}`;
    frag.appendChild(o);
  });
  els.countrySelect.innerHTML = "";
  els.countrySelect.appendChild(frag);
}

/* =========================================================
   RENDER GRID + STATUS
   ========================================================= */
let lastFilteredIds = new Set();

function render(){
  const list = animals
    .filter(a => matchesQuery(a, state.query))
    .filter(a => state.countryIso ? (a.countries||[]).includes(state.countryIso) : true)
    .sort(bySort);

  // Result count & chips
  els.resultCount.textContent = list.length;
  if(state.countryIso){
    els.countryChipText.textContent = `${isoToFlagEmoji(state.countryIso)} ${(COUNTRY_NAMES[state.countryIso]||state.countryIso)}`;
    els.countryChip.classList.remove("hidden");
  }else{
    els.countryChip.classList.add("hidden");
  }
  if(state.query){
    els.searchChipText.textContent = `“${state.query}”`;
    els.searchChip.classList.remove("hidden");
  }else{
    els.searchChip.classList.add("hidden");
  }

  els.cards.innerHTML = "";
  if(list.length === 0){
    els.empty.classList.remove("hidden");
  } else {
    els.empty.classList.add("hidden");
    const frag = document.createDocumentFragment();
    list.forEach(an => frag.appendChild(cardTemplate(an)));
    els.cards.appendChild(frag);
  }

  updateMapVisibility(list);
  lastFilteredIds = new Set(list.map(a=>a.id));
}

function cardTemplate(an){
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role","button");
  card.setAttribute("aria-label", `Detail ${an.name}`);

  card.innerHTML = `
    <button class="action mapfocus" title="Fokus di peta" data-id="${an.id}">📍</button>
    <div class="card-inner">
      <div class="card-top">
        <div class="avatar" aria-hidden="true">${an.emoji}</div>
        <div class="title">
          <div class="name">${an.name}</div>
          <div class="latin">${an.latin}</div>
        </div>
      </div>

      <div class="meta">
        ${an.tags.map(t => `<span class="chip">${t}</span>`).join("")}
      </div>

      <p class="desc">${an.teaser}</p>

      <div class="stats">
        <div class="kv"><span class="k">Status</span><span class="v">${an.status}</span></div>
        <div class="kv"><span class="k">Berat</span><span class="v">${formatKg(an.weightKg)}</span></div>
        <div class="kv"><span class="k">Umur</span><span class="v">${an.lifespan} tahun</span></div>
      </div>
    </div>
  `;

  const open = () => openModal(an);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });

  card.querySelector(".action.mapfocus").addEventListener("click", (e)=>{
    e.stopPropagation();
    focusAnimalOnMap(an.id);
    window.scrollTo({ top: els.mapContainer.getBoundingClientRect().top + window.scrollY - 80, behavior:"smooth" });
  });

  return card;
}

/* =========================================================
   MODAL DETAIL
   ========================================================= */
function openModal(an){
  els.modalTitle.textContent = an.name;
  els.modalLatin.textContent = an.latin;
  els.modalHabitat.textContent = an.habitat;
  els.modalDiet.textContent = an.diet;
  els.modalStatus.textContent = an.status;
  els.modalLifespan.textContent = `${an.lifespan} tahun`;
  els.modalWeight.textContent = formatKg(an.weightKg);
  els.modalLength.textContent = an.length;
  els.modalIcon.textContent = an.emoji;
  els.modalFacts.innerHTML = (an.facts||[]).map(f=> `<li>${f}</li>`).join("");
  els.modal.classList.remove("hidden");
  setTimeout(()=> els.modalTitle.focus(), 50);
}
function closeModal(){ document.querySelectorAll(".modal").forEach(m=> m.classList.add("hidden")); }

/* =========================================================
   PETA — Leaflet (globe + negara) + fallback
   ========================================================= */
let map, markerLayer, rangeLayer, countriesLayer;
let mapIndex = {}; // id -> {markers:[], ranges:[]}
const countryLayerByIso = {};
let selectedCountryIso = ""; // highlight

async function initMap(){
  map = L.map(els.mapContainer, {
    worldCopyJump: true,
    minZoom: 1,
    maxZoom: 6,   // skala global
    zoomSnap: 0.5,
    scrollWheelZoom: true,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 0.8
  }).setView([15, 10], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution:'© OpenStreetMap, © CARTO', maxZoom: 19 }
  ).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  rangeLayer = L.layerGroup().addTo(map);

  buildMapLayers();

  // Muat batas negara
  let loaded = false;
  try{
    const url = "https://unpkg.com/geojson-world-map@1.0.2/countries.geo.json";
    const res = await fetch(url, { cache:"force-cache", mode:"cors" });
    if(res.ok){
      const gj = await res.json();
      countriesLayer = L.geoJSON(gj, { style: styleCountry, onEachFeature: onEachCountry }).addTo(map);
      loaded = true;
    }
  }catch(_){ /* noop */ }

  if(!loaded){
    // Fallback: kotak-batas sederhana
    countriesLayer = L.layerGroup().addTo(map);
    buildFallbackCountryRects();
    toast("Memakai batas negara sederhana (offline/fallback).");
  }

  fitAllBounds();
}

function buildMapLayers(){
  markerLayer.clearLayers();
  rangeLayer.clearLayers();
  mapIndex = {};

  animals.forEach(an=>{
    const markers = [];
    const ranges = [];
    (an.ranges||[]).forEach(r=>{
      const m = L.marker([r.lat, r.lng], { title: an.name })
        .on('click', ()=> openModal(an))
        .bindTooltip(`${an.emoji} ${an.name} — ${r.label}`, { sticky:true });
      markers.push(m); markerLayer.addLayer(m);

      const c = L.circle([r.lat, r.lng], {
        radius: (r.r||r.radius||200)*1000,
        color: "#7f8ba6", weight:1, opacity:0.7,
        fillColor:"#aeb6c9", fillOpacity:0.12
      }).bindTooltip(`Sebaran ± ${r.r||r.radius} km • ${r.label}`);
      ranges.push(c); rangeLayer.addLayer(c);
    });
    mapIndex[an.id] = { markers, ranges };
  });

  applyLayerVisibility();
}

function applyLayerVisibility(){
  if(state.showMarkers){ if(!map.hasLayer(markerLayer)) map.addLayer(markerLayer); }
  else{ if(map.hasLayer(markerLayer)) map.removeLayer(markerLayer); }

  if(state.showRanges){ if(!map.hasLayer(rangeLayer)) map.addLayer(rangeLayer); }
  else{ if(map.hasLayer(rangeLayer)) map.removeLayer(rangeLayer); }
}

function updateMapVisibility(filteredList){
  if(!map) return;
  const visibleIds = new Set(filteredList.map(a=>a.id));
  animals.forEach(an=>{
    const entry = mapIndex[an.id]; if(!entry) return;
    const show = visibleIds.has(an.id);
    entry.markers.forEach(m=> show ? markerLayer.addLayer(m) : markerLayer.removeLayer(m));
    entry.ranges.forEach(c=> show ? rangeLayer.addLayer(c) : rangeLayer.removeLayer(c));
  });
}

function getBoundsForIds(idsSet){
  const pts = [];
  idsSet.forEach(id=>{
    const entry = mapIndex[id];
    if(entry){
      entry.markers.forEach(m=> pts.push(m.getLatLng()));
      entry.ranges.forEach(c=> pts.push(c.getLatLng()));
    }
  });
  if(!pts.length) return null;
  return L.latLngBounds(pts);
}

function fitAllBounds(){
  const ids = new Set(animals.map(a=>a.id));
  const b = getBoundsForIds(ids);
  if(b) map.fitBounds(b.pad(0.2), { maxZoom: 3.8 });
}

function fitVisibleBounds(){
  if(!lastFilteredIds.size){ toast("Tidak ada hasil untuk difokuskan."); return; }
  const b = getBoundsForIds(lastFilteredIds);
  if(b) map.fitBounds(b.pad(0.25), { maxZoom: 5.2 });
}

function focusAnimalOnMap(id){
  const entry = mapIndex[id];
  if(!entry || !entry.markers.length){ toast("Tidak ada lokasi peta untuk hewan ini."); return; }
  const latlngs = entry.markers.map(m=> m.getLatLng());
  const b = L.latLngBounds(latlngs);
  map.fitBounds(b.pad(0.6), { maxZoom: 5.8 });
  entry.markers.forEach(m=>{ const el=m._icon; if(el) el.animate([{transform:"scale(1)"},{transform:"scale(1.2)"},{transform:"scale(1)"}],{duration:450}); });
}

/* ====== Negara (styling + interaksi) ====== */
function styleCountry(feature){
  const iso = getISO2(feature) || "";
  const inDataset = !!COUNTRY_ANIMALS[iso];
  const cols = FLAG_COLORS[iso] || null;
  const fillColor = cols ? cols[0] : (inDataset ? "#4c6ef5" : "#2a2f39");
  const weight = (selectedCountryIso && iso===selectedCountryIso) ? 1.6 : 0.6;
  const color = cols ? (cols[1] || cols[0]) : "#5a6270";
  const fillOpacity = (selectedCountryIso && iso===selectedCountryIso) ? 0.35 : (inDataset ? 0.22 : 0.10);
  return { color, weight, fillColor, fillOpacity };
}
function onEachCountry(feature, layer){
  const iso = getISO2(feature) || "";
  const name = COUNTRY_NAMES[iso] || (getName(feature) || iso || "Negara");
  const hasAnimals = !!COUNTRY_ANIMALS[iso];
  if(iso){ countryLayerByIso[iso] = layer; }

  layer.bindTooltip(`${iso ? isoToFlagEmoji(iso)+" " : ""}${name}${hasAnimals? " • Klik untuk hewan":""}`, { sticky:true });

  layer.on({
    mouseover: (e)=>{ e.target.setStyle({ weight: 1.6, fillOpacity: Math.max(0.3, (e.target.options.fillOpacity||0.2)) }); },
    mouseout: (e)=>{ countriesLayer && countriesLayer.resetStyle && countriesLayer.resetStyle(e.target); },
    click: ()=> {
      if(!iso){ toast("Negara tidak teridentifikasi di dataset."); return; }
      if(!hasAnimals){
        state.countryIso = iso; selectedCountryIso = iso; setFlagSwatch(iso);
        els.countrySelect.value = iso; render(); fitCountryBounds(iso);
        toast("Belum ada hewan terdaftar untuk negara ini."); return;
      }
      selectCountry(iso);
    }
  });
}
function fitCountryBounds(iso){
  const layer = countryLayerByIso[iso];
  if(layer && layer.getBounds){
    const b = layer.getBounds();
    if(b && b.isValid()) map.fitBounds(b.pad(0.3), { maxZoom: 5.5 });
  }
}
function selectCountry(iso){
  selectedCountryIso = iso;
  state.countryIso = iso;
  setFlagSwatch(iso);
  if(els.countrySelect.value !== iso) els.countrySelect.value = iso;
  render();
  if(countriesLayer && countriesLayer.setStyle){ countriesLayer.setStyle(styleCountry); }
  fitCountryBounds(iso);
}

/* ====== ISO2 dari properti ====== */
function getISO2(f){
  const p = f && f.properties || {};
  let iso = p.ISO_A2 || p.iso_a2 || p.ISO2 || p.code || p.id || "";
  if(typeof iso === "number") iso = String(iso);
  if(iso && iso.length === 2) return iso.toUpperCase();
  const nm = (getName(f) || "").toLowerCase();
  if(NAME_ALIASES[nm]) return NAME_ALIASES[nm];
  return "";
}
function getName(f){
  const p = f && f.properties || {};
  return p.ADMIN || p.name || p.NAME || p.NAME_LONG || p.Country || "";
}

/* ====== Fallback rectangles (bbox) ====== */
const FALLBACK_BBOX = {
  IN:[[8,68],[36,97]], RU:[[45,30],[75,170]], ID:[[-11,95],[6,141]], BD:[[20,88],[27,93]], NP:[[26,80],[31,88]],
  MM:[[9,92],[28,101]], TH:[[5,97],[21,106]], LA:[[14,100],[22,107]], KH:[[10,102],[15,107]], VN:[[8,103],[24,110]], CN:[[18,73],[54,135]],
  KE:[[-5,34],[5,42]], TZ:[[-12,29],[-1,41]], UG:[[-2,29],[5,35]], ZA:[[-35,16],[-22,33]], BW:[[-26,20],[-17,29]], NA:[[-29,12],[-16,25]],
  ZM:[[-18,22],[-8,34]], MZ:[[-26,31],[-10,41]], LK:[[5,79],[10,82]], MY:[[1,99],[7,120]], AU:[[-45,113],[-10,154]],
  JP:[[30,129],[46,146]], GB:[[50,-8],[59,2]], FR:[[42,-5],[51,8]], DE:[[47,5],[55,16]], PL:[[49,14],[55,24]],
  NO:[[58,4],[71,31]], SE:[[55,11],[69,24]], FI:[[60,20],[70,32]],
  US:[[25,-125],[49,-66]], CA:[[42,-141],[83,-52]],
  SA:[[16,34],[32,56]], AE:[[22,51],[26,56]], OM:[[16,52],[26,60]], DZ:[[19,-9],[37,12]], MR:[[15,-17],[27,-4]], EG:[[22,25],[32,36]]
};
function buildFallbackCountryRects(){
  Object.entries(FALLBACK_BBOX).forEach(([iso, bbox])=>{
    const rect = L.rectangle(bbox, styleByIso(iso,false)).addTo(countriesLayer);
    countryLayerByIso[iso] = rect;
    const name = COUNTRY_NAMES[iso] || iso;
    const hasAnimals = !!COUNTRY_ANIMALS[iso];
    rect.bindTooltip(`${isoToFlagEmoji(iso)} ${name}${hasAnimals? " • Klik untuk hewan":""}`, { sticky:true });
    rect.on("mouseover", ()=> rect.setStyle(styleByIso(iso,true)));
    rect.on("mouseout",  ()=> rect.setStyle(styleByIso(iso,false)));
    rect.on("click", ()=> {
      if(!hasAnimals){
        state.countryIso = iso; selectedCountryIso = iso; setFlagSwatch(iso); els.countrySelect.value = iso; render(); fitCountryBounds(iso);
        toast("Belum ada hewan terdaftar untuk negara ini."); return;
      }
      selectCountry(iso);
    });
  });
}
function styleByIso(iso, hover){
  const cols = FLAG_COLORS[iso] || null;
  const inDataset = !!COUNTRY_ANIMALS[iso];
  const fillColor = cols ? cols[0] : (inDataset ? "#4c6ef5" : "#2a2f39");
  const color = cols ? (cols[1] || cols[0]) : "#5a6270";
  const weight = (selectedCountryIso===iso || hover) ? 1.6 : 0.6;
  const fillOpacity = (selectedCountryIso===iso || hover) ? 0.35 : (inDataset ? 0.22 : 0.10);
  return { color, weight, fillColor, fillOpacity };
}

/* =========================================================
   EVENT BINDINGS
   ========================================================= */
els.search.addEventListener("input", (e)=>{ state.query = e.target.value.trim(); render(); });
els.clearSearchBtn.addEventListener("click", ()=>{ state.query=""; els.search.value=""; render(); });

els.sort.addEventListener("change", (e)=>{ state.sort = e.target.value; render(); });

els.density.addEventListener("click", ()=>{
  state.dense = !state.dense;
  document.documentElement.style.setProperty("--radius-xl", state.dense? "14px":"22px");
  document.documentElement.style.setProperty("--radius-md", state.dense? "8px":"14px");
  els.density.setAttribute("aria-pressed", String(state.dense));
  store.set("state", state);
});

els.showMarkers.addEventListener("change", ()=>{ state.showMarkers = els.showMarkers.checked; applyLayerVisibility(); store.set("state", state); });
els.showRanges.addEventListener("change", ()=>{ state.showRanges = els.showRanges.checked; applyLayerVisibility(); store.set("state", state); });
els.fitAll.addEventListener("click", fitAllBounds);
els.fitVisible.addEventListener("click", fitVisibleBounds);

els.countrySelect.addEventListener("change", ()=>{
  const iso = els.countrySelect.value || "";
  if(!iso){ clearCountryFilter(); return; }
  selectCountry(iso);
});
els.clearCountry.addEventListener("click", clearCountryFilter);
document.addEventListener("click", (e)=>{
  if(e.target && e.target.matches('[data-clear="country"]')){ clearCountryFilter(); }
  if(e.target && e.target.matches('[data-clear="search"]')){ state.query=""; els.search.value=""; render(); }
});

function clearCountryFilter(){
  state.countryIso = "";
  selectedCountryIso = "";
  els.countrySelect.value = "";
  setFlagSwatch("");
  render();
  if(countriesLayer && countriesLayer.setStyle){ countriesLayer.setStyle(styleCountry); }
  fitAllBounds();
}

els.themeSelect.addEventListener("change", ()=>{
  const t = els.themeSelect.value;
  applyTheme(t);
});
els.viewMode.addEventListener("change", ()=>{
  applyView(els.viewMode.value);
});

document.body.addEventListener("click", (e)=>{ if(e.target.matches("[data-close], .modal-backdrop")) closeModal(); });
window.addEventListener("keydown", (e)=>{
  const tag=(document.activeElement && document.activeElement.tagName)||"";
  const inInput=["INPUT","TEXTAREA","SELECT"].includes(tag);
  if(e.key==="/" && !inInput){ e.preventDefault(); els.search.focus(); return; }
  if(e.key==="Escape"){ closeModal(); return; }
});

/* =========================================================
   Toast helper
   ========================================================= */
let toastTimer;
function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.remove("hidden");
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> els.toast.classList.remove("show"), 1600);
}

/* =========================================================
   Inisialisasi
   ========================================================= */
document.addEventListener("DOMContentLoaded", ()=>{
  // Tema + tampilan awal
  els.themeSelect.value = state.theme || "hitam";
  applyTheme(els.themeSelect.value);
  applyView(state.view || "cards");

  buildCountrySelect();
  render();
  initMap();

  // Sinkron chip awal jika ada filter (misal reload)
  if(state.countryIso){ setFlagSwatch(state.countryIso); els.countrySelect.value = state.countryIso; }
});
