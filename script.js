"use strict";

/* =========================
   Dataset hewan darat
   ========================= */
const animals = [
  { id:"harimau", emoji:"🐯", name:"Harimau", latin:"Panthera tigris",
    habitat:"Hutan hujan, sabana, lahan basah Asia", diet:"Karnivora (rusa, babi hutan, kerbau muda)",
    status:"Terancam Punah", lifespan:15, weightKg:220, length:"2,7–3,1 m",
    tags:["Asia","Karnivora","Kucing Besar"], teaser:"Pemburu soliter bergaris dengan auman menggetarkan hutan.",
    facts:["Pola garis unik seperti sidik jari.","Perenang ulung, tidak takut air.","Auman terdengar hingga 3 km."],
    ranges:[ {label:"India Tengah",lat:22.5,lng:79.5,r:600}, {label:"Siberia Timur",lat:46,lng:134,r:500}, {label:"Sumatra",lat:-1.65,lng:103.6,r:280} ],
    countries:["IN","RU","ID","BD","NP","MM","TH","LA","KH","VN","CN"]
  },
  { id:"singa", emoji:"🦁", name:"Singa", latin:"Panthera leo",
    habitat:"Sabana Afrika & cagar Gir India", diet:"Karnivora (antelope, zebra, kerbau)",
    status:"Rentan", lifespan:14, weightKg:190, length:"2,4–2,8 m",
    tags:["Afrika","Karnivora","Sosial"], teaser:"Ikon sabana yang berburu berkelompok.",
    facts:["Pride dipimpin betina dewasa.","Auman terdengar hingga 8 km.","Jantan menjaga wilayah."],
    ranges:[ {label:"Serengeti",lat:-2,lng:36,r:820}, {label:"Kruger",lat:-23,lng:31,r:700}, {label:"Gir, India",lat:21,lng:70,r:220} ],
    countries:["KE","TZ","UG","ZA","BW","NA","ZM","MZ","IN"]
  },
  { id:"cheetah", emoji:"🐆", name:"Cheetah", latin:"Acinonyx jubatus",
    habitat:"Sabana terbuka Afrika", diet:"Karnivora (gazelle, impala muda)",
    status:"Rentan", lifespan:12, weightKg:65, length:"1,1–1,5 m",
    tags:["Afrika","Karnivora","Sprinter"], teaser:"Sprinter darat tercepat dengan kuku semi-tidak ditarik.",
    facts:["0–100 km/jam dalam 3 detik.","Berburu di siang hari.","Ekor panjang sebagai kemudi saat sprint."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:35,r:650}, {label:"Afrika Selatan",lat:-18,lng:22,r:780} ],
    countries:["KE","TZ","NA","ZA","BW"]
  },
  { id:"gajah", emoji:"🐘", name:"Gajah Afrika & Asia", latin:"Loxodonta africana / Elephas maximus",
    habitat:"Sabana, hutan, padang rumput Afrika & Asia", diet:"Herbivora (rumput, daun, kulit kayu)",
    status:"Rentan", lifespan:60, weightKg:4000, length:"2,7–3,3 m (tinggi bahu)",
    tags:["Afrika","Asia","Herbivora Besar"], teaser:"Raksasa cerdas dengan memori panjang dan struktur sosial kuat.",
    facts:["Komunikasi infrasonik jarak puluhan km.","Belalai memiliki 40 ribu otot.","Betina memimpin kawanan matrilineal."],
    ranges:[ {label:"Afrika Sub-Sahara",lat:-2,lng:23,r:1450}, {label:"Asia Selatan–Tenggara",lat:10,lng:100,r:1200} ],
    countries:["KE","TZ","ZA","BW","IN","LK","TH","MY","MM","LA","KH"]
  },
  { id:"orangutan", emoji:"🦧", name:"Orangutan", latin:"Pongo abelii / Pongo pygmaeus",
    habitat:"Hutan hujan Sumatra & Kalimantan", diet:"Omnivora (buah, daun, serangga)",
    status:"Terancam Punah", lifespan:35, weightKg:50, length:"1,2–1,5 m",
    tags:["Asia","Primata","Arboreal"], teaser:"Primata arboreal cerdas yang hidup soliter di kanopi tropis.",
    facts:["Menggunakan alat sederhana.","Betina mengasuh anak hingga 8 tahun.","Membangun sarang baru setiap malam."],
    ranges:[ {label:"Kalimantan",lat:0.5,lng:114,r:380}, {label:"Sumatra Utara",lat:2.8,lng:98.6,r:260} ],
    countries:["ID","MY"]
  },
  { id:"komodo", emoji:"🦎", name:"Komodo", latin:"Varanus komodoensis",
    habitat:"Savanna & hutan kering Nusa Tenggara Timur", diet:"Karnivora (bangkai, rusa, babi hutan)",
    status:"Rentan", lifespan:30, weightKg:70, length:"2–3 m",
    tags:["Indonesia","Reptil","Predator"], teaser:"Kadal terbesar dunia dengan air liur beracun.",
    facts:["Mencium bau hingga 5 km.","Berburu dengan kombinasi racun dan bakteri.","Dapat bertelur tanpa pembuahan (partenogenesis)."],
    ranges:[ {label:"Pulau Komodo",lat:-8.57,lng:119.48,r:58}, {label:"Pulau Rinca",lat:-8.66,lng:119.73,r:44}, {label:"Flores Barat",lat:-8.71,lng:120.58,r:80} ],
    countries:["ID"]
  },
  { id:"tapir", emoji:"🐾", name:"Tapir Melayu", latin:"Tapirus indicus",
    habitat:"Hutan tropis Asia Tenggara", diet:"Herbivora (daun, buah, pucuk)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"1,8–2,5 m",
    tags:["Asia","Herbivora","Nokturnal"], teaser:"Herbivora pemalu dengan pola hitam-putih kontras.",
    facts:["Moncong fleksibel seperti belalai mini.","Pandai berenang.","Aktif malam, mengandalkan penciuman tajam."],
    ranges:[ {label:"Semenanjung Malaya",lat:4.2,lng:102,r:420}, {label:"Sumatra",lat:-0.5,lng:102.5,r:480}, {label:"Thailand Selatan",lat:9.5,lng:99.5,r:360} ],
    countries:["MY","TH","ID"]
  },
  { id:"kanguru", emoji:"🦘", name:"Kanguru Merah", latin:"Osphranter rufus",
    habitat:"Sabana & padang semak Australia", diet:"Herbivora (rumput, daun)",
    status:"Risiko Rendah", lifespan:20, weightKg:85, length:"1,5 m (tinggi)",
    tags:["Australia","Marsupial","Pelompat"], teaser:"Marsupial terbesar dengan lompatan jauh dan ekor penyeimbang.",
    facts:["Melompat hingga 9 m dalam sekali lesatan.","Joey tinggal di kantong ±6 bulan.","Kaki belakang tidak bisa melangkah mundur."],
    ranges:[ {label:"Australia Tengah",lat:-25,lng:133,r:1500} ],
    countries:["AU"]
  },
  { id:"koala", emoji:"🐨", name:"Koala", latin:"Phascolarctos cinereus",
    habitat:"Hutan eukaliptus Australia Timur", diet:"Herbivora (daun eukaliptus)",
    status:"Rentan", lifespan:15, weightKg:12, length:"0,6–0,85 m",
    tags:["Australia","Marsupial","Arboreal"], teaser:"Marsupial arboreal pemakan eukaliptus dengan pola tidur panjang.",
    facts:["Sidik jari mirip manusia.","Memilih daun rendah toksin.","Menghabiskan 18–20 jam per hari untuk istirahat."],
    ranges:[ {label:"Queensland–NSW",lat:-27,lng:153,r:420}, {label:"Victoria",lat:-37,lng:145,r:300} ],
    countries:["AU"]
  },
  { id:"bison", emoji:"🦬", name:"Bison Amerika", latin:"Bison bison",
    habitat:"Padang rumput Amerika Utara", diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:900, length:"2–3,5 m",
    tags:["Amerika Utara","Herbivora","Ikonik"], teaser:"Ikon Great Plains yang berhasil diselamatkan dari kepunahan.",
    facts:["Populasi pulih lewat taman nasional.","Berat jantan >900 kg.","Lari hingga 55 km/jam meski berbobot besar."],
    ranges:[ {label:"Yellowstone",lat:44.6,lng:-110.5,r:220}, {label:"Great Plains",lat:49,lng:-99,r:320} ],
    countries:["US","CA"]
  },
  { id:"panda", emoji:"🐼", name:"Panda Raksasa", latin:"Ailuropoda melanoleuca",
    habitat:"Hutan bambu pegunungan Tiongkok", diet:"Herbivora (bambu)",
    status:"Rentan", lifespan:20, weightKg:100, length:"1,2–1,8 m",
    tags:["Asia","Herbivora","Ikonik"], teaser:"Ikon konservasi dengan pola hitam-putih khas dan diet bambu.",
    facts:["Memiliki 'jempol palsu' untuk menggenggam bambu.","Makan >12 jam per hari.","Populasi meningkat berkat perlindungan habitat."],
    ranges:[ {label:"Provinsi Sichuan",lat:31.5,lng:103.5,r:250} ],
    countries:["CN"]
  },
  { id:"jaguar", emoji:"🐆", name:"Jaguar", latin:"Panthera onca",
    habitat:"Hutan hujan Amazon, rawa Pantanal, hutan riparian Amerika Latin", diet:"Karnivora (rusa, peccary, caiman)",
    status:"Hampir Terancam", lifespan:15, weightKg:100, length:"1,8 m",
    tags:["Amerika Selatan","Karnivora","Kucing Besar"], teaser:"Predator puncak Amazon dengan gigitan menembus cangkang kura-kura.",
    facts:["Perenang dan penyelam andal.","Roset memiliki titik di tengah (beda dengan macan tutul).","Berburu di tepi sungai Pantanal."],
    ranges:[ {label:"Amazon Brasil",lat:-3,lng:-60,r:900}, {label:"Pantanal",lat:-16,lng:-57,r:450}, {label:"Orinoco",lat:6,lng:-66,r:380} ],
    countries:["BR","CO","VE","PE","BO"]
  },
  { id:"kapibara", emoji:"🦫", name:"Kapibara", latin:"Hydrochoerus hydrochaeris",
    habitat:"Padang banjir, hutan riparian Amerika Selatan", diet:"Herbivora (rumput, tanaman air)",
    status:"Risiko Rendah", lifespan:10, weightKg:60, length:"1–1,3 m",
    tags:["Amerika Selatan","Herbivora","Semi Akuatik"], teaser:"Rodensia terbesar dunia yang betah berendam di perairan.",
    facts:["Tubuh besar membantu regulasi suhu.","Komunikasi lewat dengkuran/siulan.","Sering hidup berdekatan dengan jaguar."],
    ranges:[ {label:"Brasil Tengah",lat:-11,lng:-55,r:600}, {label:"Argentina Utara",lat:-26,lng:-58,r:400}, {label:"Kolombia Timur",lat:5,lng:-72,r:360} ],
    countries:["BR","AR","BO","PY","CO"]
  },
  { id:"okapi", emoji:"🦓", name:"Okapi", latin:"Okapia johnstoni",
    habitat:"Hutan hujan Republik Demokratik Kongo", diet:"Herbivora (daun, pucuk, jamur)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"2,0 m",
    tags:["Afrika","Herbivora","Endemik"], teaser:"Kerabat jerapah endemik Ituri dengan garis mirip zebra.",
    facts:["Bau unik bantu komunikasi.","Lidah bisa menjilat telinga sendiri.","Indikator kesehatan hutan tropis Kongo."],
    ranges:[ {label:"Hutan Ituri",lat:0.8,lng:28.5,r:240} ],
    countries:["CD"]
  },
  { id:"lynx", emoji:"🐱", name:"Lynx Eurasia", latin:"Lynx lynx",
    habitat:"Hutan boreal dan pegunungan Eurasia", diet:"Karnivora (rusa kecil, kelinci salju, rodensia)",
    status:"Risiko Rendah", lifespan:17, weightKg:26, length:"0,8–1,3 m",
    tags:["Eurasia","Karnivora","Soliter"], teaser:"Kucing liar bertelinga jumbai dengan penglihatan senja tajam.",
    facts:["Menyergap dari pohon / semak rapat.","Populasi dipulihkan di Eropa Barat.","Mengontrol populasi ungulata kecil."],
    ranges:[ {label:"Skandinavia",lat:63,lng:15,r:520}, {label:"Karpatia",lat:48,lng:24,r:340}, {label:"Siberia Barat",lat:59,lng:85,r:620} ],
    countries:["RU","SE","FI","PL","DE","CZ"]
  },
  { id:"snowleopard", emoji:"🐆", name:"Macan Tutul Salju", latin:"Panthera uncia",
    habitat:"Pegunungan Himalaya & Asia Tengah hingga 5.500 m", diet:"Karnivora (bharal, ibex, marmot)",
    status:"Rentan", lifespan:15, weightKg:45, length:"0,9–1,2 m + ekor 1 m",
    tags:["Asia Tengah","Karnivora","Pegunungan"], teaser:"Predator pemalu penghuni tebing bersalju curam.",
    facts:["Ekor panjang sebagai penyeimbang dan selimut.","Lompatan 15 m antar tebing.","Populasi tersebar luas tapi rendah."],
    ranges:[ {label:"Trans-Himalaya",lat:31,lng:79,r:420}, {label:"Altai",lat:48,lng:90,r:380}, {label:"Tianshan",lat:42,lng:78,r:360} ],
    countries:["CN","IN","NP","BT","PK"]
  },
  { id:"moose", emoji:"🫎", name:"Moose", latin:"Alces alces",
    habitat:"Taiga, rawa, hutan boreal Amerika Utara & Eurasia", diet:"Herbivora (ranting willow, tanaman air)",
    status:"Risiko Rendah", lifespan:20, weightKg:550, length:"2,4 m (tinggi bahu jantan)",
    tags:["Belahan Utara","Herbivora","Ungulata"], teaser:"Ungulata raksasa bertanduk palang, jago berenang dan menyelam.",
    facts:["Menyelam hingga 5 m mencari tanaman air.","Tanduk jantan rontok tiap tahun.","Aktif menjelang senja dan fajar."],
    ranges:[ {label:"Skandinavia",lat:61,lng:17,r:520}, {label:"Quebec",lat:52,lng:-71,r:640}, {label:"Alaska",lat:63,lng:-150,r:700} ],
    countries:["CA","US","NO","SE","FI","RU"]
  },
  { id:"polarfox", emoji:"🦊", name:"Rubah Arktik", latin:"Vulpes lagopus",
    habitat:"Tundra Arktik", diet:"Omnivora (lemming, burung laut, bangkai)",
    status:"Risiko Rendah", lifespan:9, weightKg:4, length:"0,5–0,7 m",
    tags:["Arktik","Omnivora","Adaptif"], teaser:"Mamalia kecil dengan bulu berubah warna mengikuti musim.",
    facts:["Bulu putih di musim dingin, cokelat di musim panas.","Pendengaran tajam mendeteksi mangsa di bawah salju.","Mengikuti beruang kutub untuk bangkai."],
    ranges:[ {label:"Svalbard",lat:79,lng:15,r:220}, {label:"Taimyr",lat:74,lng:100,r:360}, {label:"Nunavut",lat:70,lng:-95,r:330} ],
    countries:["NO","RU","CA","US"]
  }
];

/* =========================
   Konfigurasi negara
   ========================= */
const COUNTRY_NAMES = {
  IN:"India", RU:"Rusia", ID:"Indonesia", BD:"Bangladesh", NP:"Nepal", MM:"Myanmar", TH:"Thailand", LA:"Laos", KH:"Kamboja", VN:"Vietnam", CN:"Tiongkok",
  KE:"Kenya", TZ:"Tanzania", UG:"Uganda", ZA:"Afrika Selatan", BW:"Botswana", NA:"Namibia", ZM:"Zambia", MZ:"Mozambik",
  LK:"Sri Lanka", MY:"Malaysia", AU:"Australia", JP:"Jepang", GB:"Britania Raya", FR:"Prancis", DE:"Jerman", PL:"Polandia",
  NO:"Norwegia", SE:"Swedia", FI:"Finlandia", US:"Amerika Serikat", CA:"Kanada",
  SA:"Arab Saudi", AE:"Uni Emirat Arab", OM:"Oman", DZ:"Aljazair", MR:"Mauritania", EG:"Mesir",
  BR:"Brasil", CO:"Kolombia", VE:"Venezuela", PE:"Peru", BO:"Bolivia", PY:"Paraguay", AR:"Argentina",
  CD:"Republik Demokratik Kongo", CZ:"Republik Ceko", BT:"Bhutan", PK:"Pakistan"
};

/* =========================
   Elemen & state
   ========================= */
const els = {
  search: document.querySelector("#search"),
  sort: document.querySelector("#sort"),
  countrySelect: document.querySelector("#countrySelect"),
  clearCountry: document.querySelector("#clearCountry"),
  showMarkers: document.querySelector("#showMarkers"),
  showRanges: document.querySelector("#showRanges"),
  fitAll: document.querySelector("#fitAll"),
  fitVisible: document.querySelector("#fitVisible"),
  cards: document.querySelector("#cards"),
  empty: document.querySelector("#empty"),
  clearSearch: document.querySelector("#clearSearch"),
  resultCount: document.querySelector("#resultCount"),
  countryChip: document.querySelector("#countryChip"),
  countryChipText: document.querySelector("#countryChipText"),
  searchChip: document.querySelector("#searchChip"),
  searchChipText: document.querySelector("#searchChipText"),
  modal: document.querySelector("#modal"),
  modalTitle: document.querySelector("#modalTitle"),
  modalLatin: document.querySelector("#modalLatin"),
  modalHabitat: document.querySelector("#modalHabitat"),
  modalDiet: document.querySelector("#modalDiet"),
  modalStatus: document.querySelector("#modalStatus"),
  modalLifespan: document.querySelector("#modalLifespan"),
  modalWeight: document.querySelector("#modalWeight"),
  modalLength: document.querySelector("#modalLength"),
  modalFacts: document.querySelector("#modalFacts"),
  modalIcon: document.querySelector("#modalIcon"),
  toast: document.querySelector("#toast"),
  mapOverlay: document.querySelector("#mapOverlay"),
  mapOverlayAvatar: document.querySelector("#mapOverlayAvatar"),
  mapOverlayTitle: document.querySelector("#mapOverlayTitle"),
  mapOverlaySubtitle: document.querySelector("#mapOverlaySubtitle"),
  mapOverlayBody: document.querySelector("#mapOverlayBody"),
  mapOverlayClose: document.querySelector("#mapOverlayClose"),
  mapSection: document.querySelector("#mapSection")
};

const state = {
  query: "",
  sort: "name-asc",
  country: "",
  showMarkers: true,
  showRanges: true
};

const COUNTRY_ANIMALS = {};
animals.forEach(an => (an.countries||[]).forEach(iso => (COUNTRY_ANIMALS[iso] ||= []).push(an.id)));

let map, markerLayer, rangeLayer;
let filteredIds = new Set();
let activeOverlayId = null;

/* =========================
   Init
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  buildCountrySelect();
  initMap();
  initEvents();
  render();
});

function buildCountrySelect(){
  const isos = Object.keys(COUNTRY_ANIMALS).sort((a,b)=> (COUNTRY_NAMES[a]||a).localeCompare(COUNTRY_NAMES[b]||b,'id'));
  const frag = document.createDocumentFragment();
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "Semua negara";
  frag.appendChild(optAll);
  isos.forEach(iso=>{
    const opt = document.createElement("option");
    opt.value = iso;
    opt.textContent = `${isoToFlag(iso)} ${COUNTRY_NAMES[iso]||iso}`;
    frag.appendChild(opt);
  });
  els.countrySelect.innerHTML = "";
  els.countrySelect.appendChild(frag);
}

function initMap(){
  map = L.map("map", {
    worldCopyJump:true,
    minZoom:2,
    maxZoom:7,
    zoomSnap:0.5
  }).setView([15, 20], 2.3);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:"© OpenStreetMap Contributors",
    keepBuffer:4
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  rangeLayer = L.layerGroup().addTo(map);

  renderMap(animals);
  fitAllBounds();
}

function initEvents(){
  els.search.addEventListener("input", e=>{
    state.query = e.target.value.trim();
    render();
  });
  els.sort.addEventListener("change", e=>{
    state.sort = e.target.value;
    render();
  });
  els.countrySelect.addEventListener("change", e=>{
    state.country = e.target.value;
    render();
  });
  els.clearCountry.addEventListener("click", ()=>{
    state.country = "";
    els.countrySelect.value = "";
    render();
  });
  els.showMarkers.addEventListener("change", ()=>{
    state.showMarkers = els.showMarkers.checked;
    applyLayerVisibility();
  });
  els.showRanges.addEventListener("change", ()=>{
    state.showRanges = els.showRanges.checked;
    applyLayerVisibility();
  });
  els.fitAll.addEventListener("click", fitAllBounds);
  els.fitVisible.addEventListener("click", fitVisibleBounds);
  els.mapOverlayClose.addEventListener("click", hideOverlay);

  document.addEventListener("click", e=>{
    if(e.target.matches('[data-clear="country"]')){
      state.country=""; els.countrySelect.value=""; render();
    }
    if(e.target.matches('[data-clear="search"]')){
      state.query=""; els.search.value=""; render();
    }
    if(e.target.matches(".modal-close,[data-close],.modal-backdrop")){
      closeModal();
    }
  });
  window.addEventListener("keydown", e=>{
    if(e.key==="Escape"){
      closeModal();
      hideOverlay();
    }
    if(e.key==="/" && document.activeElement !== els.search){
      e.preventDefault();
      els.search.focus();
    }
  });
}

/* =========================
   Render kartu & chips
   ========================= */
function render(){
  const results = animals
    .filter(matchesQuery)
    .filter(matchesCountry)
    .sort(bySort);

  filteredIds = new Set(results.map(a=>a.id));
  els.resultCount.textContent = results.length;

  els.countryChip.classList.toggle("hidden", !state.country);
  if(state.country){
    els.countryChipText.textContent = `${isoToFlag(state.country)} ${(COUNTRY_NAMES[state.country]||state.country)}`;
  }
  els.searchChip.classList.toggle("hidden", !state.query);
  if(state.query){
    els.searchChipText.textContent = `“${state.query}”`;
  }

  els.cards.innerHTML = "";
  if(!results.length){
    els.empty.classList.remove("hidden");
    hideOverlay();
  }else{
    els.empty.classList.add("hidden");
    const frag = document.createDocumentFragment();
    results.forEach(an => frag.appendChild(buildCard(an)));
    els.cards.appendChild(frag);
  }

  renderMap(results);
  ensureOverlayStillValid();
}

function buildCard(an){
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="card-top">
      <div class="avatar" aria-hidden="true">${an.emoji}</div>
      <div class="title">
        <div class="name">${an.name}</div>
        <div class="latin">${an.latin}</div>
      </div>
    </div>
    <div class="meta">${an.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    <p class="desc">${an.teaser}</p>
    <div class="stats">
      <div class="kv"><span class="k">Status</span><span class="v">${an.status}</span></div>
      <div class="kv"><span class="k">Berat</span><span class="v">${formatKg(an.weightKg)}</span></div>
      <div class="kv"><span class="k">Umur</span><span class="v">${an.lifespan} tahun</span></div>
    </div>
    <button class="focus-btn" title="Tampilkan habitat di peta">📍</button>
  `;
  card.addEventListener("click", e=>{
    if(e.target.matches(".focus-btn")){
      const firstRange = (an.ranges||[])[0] || null;
      if(firstRange) focusAnimal(an);
      showOverlay(an, firstRange);
      e.stopPropagation();
      return;
    }
    openModal(an);
  });
  card.addEventListener("keydown", e=>{
    if(e.key==="Enter" || e.key===" "){
      e.preventDefault();
      openModal(an);
    }
  });
  return card;
}

/* =========================
   Filter helper
   ========================= */
function matchesQuery(an){
  if(!state.query) return true;
  const hay = (an.name + " " + an.latin + " " + an.habitat + " " + an.diet + " " + an.status + " " + an.tags.join(" ") + " " + an.teaser).toLowerCase();
  return hay.includes(state.query.toLowerCase());
}
function matchesCountry(an){
  if(!state.country) return true;
  return (an.countries||[]).includes(state.country);
}
function bySort(a,b){
  switch(state.sort){
    case "name-asc": return a.name.localeCompare(b.name,'id');
    case "name-desc": return b.name.localeCompare(a.name,'id');
    case "status": return statusRank(a.status) - statusRank(b.status);
    case "weight": return b.weightKg - a.weightKg;
    case "lifespan": return b.lifespan - a.lifespan;
    default: return 0;
  }
}
function statusRank(status){
  const order = ["Punah","Kritis","Terancam Punah","Rentan","Hampir Terancam","Risiko Rendah"];
  const idx = order.indexOf(status);
  return idx === -1 ? order.length : idx;
}
function formatKg(kg){
  return new Intl.NumberFormat("id-ID").format(kg) + " kg";
}

/* =========================
   Map & overlay info
   ========================= */
function renderMap(list){
  markerLayer.clearLayers();
  rangeLayer.clearLayers();

  list.forEach(an=>{
    (an.ranges||[]).forEach(range=>{
      if(state.showMarkers){
        const marker = L.marker([range.lat, range.lng], { title: `${an.name} — ${range.label}`, riseOnHover:true });
        marker.on("click", ()=> showOverlay(an, range));
        markerLayer.addLayer(marker);
      }
      if(state.showRanges){
        const circle = L.circle([range.lat, range.lng], {
          radius:(range.r||200)*1000,
          color:"#58b1ff",
          weight:1,
          opacity:0.7,
          fillColor:"#58b1ff",
          fillOpacity:0.12
        });
        circle.on("click", ()=> showOverlay(an, range));
        rangeLayer.addLayer(circle);
      }
    });
  });

  applyLayerVisibility();
}

function applyLayerVisibility(){
  if(state.showMarkers){ if(!map.hasLayer(markerLayer)) markerLayer.addTo(map); }
  else if(map.hasLayer(markerLayer)) map.removeLayer(markerLayer);

  if(state.showRanges){ if(!map.hasLayer(rangeLayer)) rangeLayer.addTo(map); }
  else if(map.hasLayer(rangeLayer)) map.removeLayer(rangeLayer);
}

function fitAllBounds(){
  const bounds = boundsFromAnimals(animals);
  if(bounds) map.fitBounds(bounds, { padding:[30,30] });
}
function fitVisibleBounds(){
  const visible = animals.filter(a=>filteredIds.has(a.id));
  if(!visible.length){
    toast("Tidak ada habitat untuk difokuskan.");
    return;
  }
  const bounds = boundsFromAnimals(visible);
  if(bounds) map.fitBounds(bounds, { padding:[40,40], maxZoom:6 });
}
function focusAnimal(an){
  if(!an || !an.ranges || !an.ranges.length){
    toast("Hewan ini tidak memiliki data lokasi.");
    return;
  }
  const bounds = boundsFromAnimals([an]);
  if(bounds) map.fitBounds(bounds, { padding:[40,40], maxZoom:6 });
}
function boundsFromAnimals(list){
  const coords = [];
  list.forEach(an => (an.ranges||[]).forEach(range => coords.push([range.lat, range.lng])));
  return coords.length ? L.latLngBounds(coords) : null;
}

function showOverlay(an, range){
  activeOverlayId = an.id;
  els.mapOverlayAvatar.textContent = an.emoji;
  els.mapOverlayTitle.textContent = an.name;
  els.mapOverlaySubtitle.textContent = range
    ? `${range.label} • Radius ± ${(range.r||200)} km`
    : "Sebaran umum";

  const tags = (an.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("");
  const facts = (an.facts||[]).map(f=>`<li>${f}</li>`).join("");

  els.mapOverlayBody.innerHTML = `
    <div class="overlay-tags">${tags}</div>
    <p class="overlay-teaser">${an.teaser}</p>
    <div class="overlay-details">
      <div><span class="k">Habitat</span><span class="v">${an.habitat}</span></div>
      <div><span class="k">Makanan</span><span class="v">${an.diet}</span></div>
      <div><span class="k">Status</span><span class="v">${an.status}</span></div>
      <div><span class="k">Umur</span><span class="v">${an.lifespan} tahun</span></div>
      <div><span class="k">Berat</span><span class="v">${formatKg(an.weightKg)}</span></div>
      <div><span class="k">Tinggi/Panjang</span><span class="v">${an.length}</span></div>
    </div>
    ${facts ? `<div class="overlay-facts"><h3>Fakta Singkat</h3><ul>${facts}</ul></div>` : ""}
  `;
  const moreBtn = document.createElement("button");
  moreBtn.type = "button";
  moreBtn.className = "btn full";
  moreBtn.textContent = "Buka detail lengkap";
  moreBtn.addEventListener("click", ()=> openModal(an), { once:true });
  els.mapOverlayBody.appendChild(moreBtn);

  els.mapOverlay.classList.remove("hidden");
}

function hideOverlay(){
  if(els.mapOverlay.classList.contains("hidden")) return;
  els.mapOverlay.classList.add("hidden");
  activeOverlayId = null;
}

function ensureOverlayStillValid(){
  if(!activeOverlayId) return;
  if(!filteredIds.has(activeOverlayId)){
    hideOverlay();
  }
}

/* =========================
   Modal detail
   ========================= */
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
  els.modalFacts.innerHTML = (an.facts||[]).map(f=>`<li>${f}</li>`).join("");
  els.modal.classList.remove("hidden");
}
function closeModal(){
  els.modal.classList.add("hidden");
}

/* =========================
   Toast sederhana
   ========================= */
let toastTimer;
function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.remove("hidden");
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> els.toast.classList.remove("show"), 1800);
}

/* =========================
   Util kecil
   ========================= */
function isoToFlag(iso){
  if(!iso) return "🏳️";
  const A = 0x1f1e6;
  return String.fromCodePoint(...iso.toUpperCase().split("").map(c=>A + c.charCodeAt(0) - 65));
}
