/* =========================================================
   HANFANDA — Biodata Hewan Darat + Peta Skala Kecil
   Catatan:
   - Fitur "Tambah Hewan" dihapus. Dataset dikurasi AI (statis).
   - Peta dibatasi minZoom=1, maxZoom=6 dan tinggi 260px agar ringkas.
   ========================================================= */

// Dataset hewan (kurasi AI, angka/area sebaran adalah perkiraan edukasi)
const animals = [
  // Asia / Afrika kucing besar
  { id:"harimau", emoji:"🐯", name:"Harimau", latin:"Panthera tigris",
    habitat:"Hutan hujan, sabana, lahan basah Asia",
    diet:"Karnivora (rusa, babi hutan, kerbau muda)",
    status:"Terancam Punah", lifespan:15, weightKg:220, length:"2.7–3.1 m",
    tags:["Asia","Karnivora","Kucing Besar"],
    facts:["Garis unik seperti sidik jari.","Perenang andal.","Auman terdengar km jauhnya."],
    teaser:"Pemburu sunyi bergaris.",
    ranges:[ {label:"India",lat:22.5,lng:79.5,r:600}, {label:"Siberia Timur",lat:46,lng:134,r:500}, {label:"Sumatra",lat:-1.65,lng:103.6,r:280} ]
  },
  { id:"singa", emoji:"🦁", name:"Singa", latin:"Panthera leo",
    habitat:"Sabana dan padang rumput Afrika; kantong kecil di India",
    diet:"Karnivora (antelope, zebra, kerbau)",
    status:"Rentan", lifespan:14, weightKg:190, length:"2.4–2.8 m",
    tags:["Afrika","Karnivora","Sosial"],
    facts:["Hidup berkelompok (pride).","Jantan berjambang.","Aktif malam (nokturnal)."],
    teaser:"Ikon sabana yang hidup berkelompok.",
    ranges:[ {label:"Afrika Timur",lat:-2,lng:36,r:800}, {label:"Afrika Selatan",lat:-20,lng:25,r:900}, {label:"Gir, India",lat:21,lng:70,r:200} ]
  },
  { id:"cheetah", emoji:"🐆", name:"Cheetah", latin:"Acinonyx jubatus",
    habitat:"Sabana terbuka Afrika",
    diet:"Karnivora (gazelle kecil, impala muda)",
    status:"Rentan", lifespan:12, weightKg:65, length:"1.1–1.5 m",
    tags:["Afrika","Karnivora","Tercepat"],
    facts:["Mamalia darat tercepat (~100 km/jam).","Tubuh ringan dan aerodinamis.","Kuku semi-tidak dapat ditarik."],
    teaser:"Sprinter ulung sabana.",
    ranges:[ {label:"Afrika Timur",lat:-2,lng:35,r:600}, {label:"Afrika Selatan",lat:-18,lng:22,r:800} ]
  },
  // Herbivora besar Afrika/Asia
  { id:"gajah", emoji:"🐘", name:"Gajah", latin:"Elephas maximus / Loxodonta africana",
    habitat:"Hutan, sabana, padang rumput Afrika & Asia",
    diet:"Herbivora (rumput, daun, kulit kayu)",
    status:"Rentan", lifespan:60, weightKg:4000, length:"2.5–4 m (tinggi bahu)",
    tags:["Afrika","Asia","Herbivora"],
    facts:["Memori kuat.","Komunikasi infrasonik.","Belalai ribuan otot."],
    teaser:"Raksasa cerdas dan sosial.",
    ranges:[ {label:"Afrika Sub-Sahara",lat:-2,lng:23,r:1400}, {label:"Asia Selatan–Tenggara",lat:10,lng:100,r:1200} ]
  },
  { id:"jerapah", emoji:"🦒", name:"Jerapah", latin:"Giraffa camelopardalis",
    habitat:"Sabana Afrika",
    diet:"Herbivora (daun akasia, pucuk)",
    status:"Rentan", lifespan:25, weightKg:800, length:"4.5–5.5 m (tinggi)",
    tags:["Afrika","Herbivora","Tertinggi"],
    facts:["Mamalia tertinggi di darat.","Lidah panjang ~45 cm.","Tekanan darah tinggi untuk suplai otak."],
    teaser:"Si jangkung pemakan daun pucuk.",
    ranges:[ {label:"Afrika Timur",lat:-2,lng:36,r:700}, {label:"Afrika Selatan",lat:-22,lng:24,r:800} ]
  },
  { id:"badak", emoji:"🦏", name:"Badak (putih/india)", latin:"Ceratotherium simum / Rhinoceros unicornis",
    habitat:"Sabana Afrika; dataran banjir India/Nepal",
    diet:"Herbivora (rumput, pucuk)",
    status:"Terancam Punah", lifespan:40, weightKg:2300, length:"3.5–4.2 m",
    tags:["Afrika","Asia","Herbivora"],
    facts:["Kulit tebal seperti baju zirah.","Penglihatan buruk, penciuman tajam.","Tanduk dari keratin."],
    teaser:"Raksasa berkulit tebal.",
    ranges:[ {label:"Afrika Selatan",lat:-24,lng:26,r:600}, {label:"India Timur Laut",lat:26,lng:86,r:200} ]
  },
  { id:"zebra", emoji:"🦓", name:"Zebra", latin:"Equus quagga",
    habitat:"Sabana dan padang rumput Afrika",
    diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:350, length:"2.0–2.6 m",
    tags:["Afrika","Herbivora","Bergaris"],
    facts:["Pola garis unik tiap individu.","Adaptif pada kekeringan musiman.","Hidup berkelompok."],
    teaser:"Kuda bergaris khas Afrika.",
    ranges:[ {label:"Afrika Timur",lat:-2,lng:37,r:800}, {label:"Afrika Selatan",lat:-23,lng:25,r:800} ]
  },
  { id:"kudanil", emoji:"🦛", name:"Kuda Nil", latin:"Hippopotamus amphibius",
    habitat:"Sungai/danau Afrika sub-Sahara",
    diet:"Herbivora (rumput)",
    status:"Rentan", lifespan:40, weightKg:1500, length:"3–5 m",
    tags:["Afrika","Semiakuatik","Herbivora"],
    facts:["Menghabiskan siang di air.","Sangat teritorial di air.","Mulut dapat membuka sangat lebar."],
    teaser:"Si berat yang betah di air.",
    ranges:[ {label:"Afrika Timur",lat:-3,lng:35,r:800}, {label:"Afrika Selatan",lat:-17,lng:30,r:900} ]
  },
  // Asia khusus
  { id:"panda", emoji:"🐼", name:"Panda Raksasa", latin:"Ailuropoda melanoleuca",
    habitat:"Hutan bambu pegunungan Tiongkok",
    diet:"Herbivora (bambu), sesekali serangga",
    status:"Rentan", lifespan:20, weightKg:100, length:"1.2–1.9 m",
    tags:["Asia","Herbivora","Ikonik"],
    facts:["‘Jempol palsu’ untuk genggam bambu.","Kontras warna untuk kamuflase/sinyal.","Banyak waktu untuk makan."],
    teaser:"Ahli bambu yang damai.",
    ranges:[ {label:"Sichuan",lat:31.5,lng:103.5,r:250} ]
  },
  { id:"orangutan", emoji:"🦧", name:"Orangutan", latin:"Pongo spp.",
    habitat:"Hutan hujan Sumatra & Kalimantan",
    diet:"Omnivora (buah, daun, serangga)",
    status:"Terancam Punah", lifespan:35, weightKg:50, length:"1.2–1.5 m",
    tags:["Asia","Primata","Arboreal"],
    facts:["Sangat cerdas dan beralat.","Hidup lebih soliter dari kera lain.","Masa asuh anak panjang."],
    teaser:"Kera besar cerdas penghuni kanopi.",
    ranges:[ {label:"Kalimantan",lat:0.5,lng:114,r:400}, {label:"Sumatra",lat:2.5,lng:98.8,r:300} ]
  },
  { id:"komodo", emoji:"🦎", name:"Komodo", latin:"Varanus komodoensis",
    habitat:"Savanna & hutan kering Nusa Tenggara, Indonesia",
    diet:"Karnivora (bangkai, mamalia, burung)",
    status:"Rentan", lifespan:30, weightKg:70, length:"2–3 m",
    tags:["Indonesia","Reptil","Apex"],
    facts:["Kadal terbesar; gigitan beracun.","Penciuman tajam.","Lari cepat jarak pendek."],
    teaser:"Predator purba Indonesia.",
    ranges:[ {label:"Pulau Komodo",lat:-8.57,lng:119.48,r:50}, {label:"Rinca",lat:-8.66,lng:119.73,r:40}, {label:"Flores Barat",lat:-8.71,lng:120.58,r:80} ]
  },
  { id:"tapir", emoji:"🐾", name:"Tapir Melayu", latin:"Tapirus indicus",
    habitat:"Hutan hujan Asia Tenggara",
    diet:"Herbivora (daun, buah)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"1.8–2.5 m",
    tags:["Asia","Herbivora","Nokturnal"],
    facts:["Moncong seperti belalai pendek.","Pola hitam-putih unik.","Perenang andal."],
    teaser:"Si pemalu berbalut hitam-putih.",
    ranges:[ {label:"Semenanjung Malaya",lat:4.2,lng:102.0,r:400}, {label:"Sumatra",lat:-0.5,lng:102.5,r:500}, {label:"Thailand",lat:10.5,lng:101.0,r:400} ]
  },
  // Australia
  { id:"kanguru", emoji:"🦘", name:"Kanguru", latin:"Macropus spp.",
    habitat:"Semak belukar, padang rumput Australia",
    diet:"Herbivora (rumput, daun)",
    status:"Risiko Rendah", lifespan:20, weightKg:85, length:"1.0–1.8 m (tinggi)",
    tags:["Australia","Marsupial","Pelompat"],
    facts:["Lompatan hemat energi.","Joey di kantong.","Ekor bantu seimbang."],
    teaser:"Atlet pelompat Australia.",
    ranges:[ {label:"Australia",lat:-25,lng:133,r:1500} ]
  },
  { id:"koala", emoji:"🐨", name:"Koala", latin:"Phascolarctos cinereus",
    habitat:"Hutan eukaliptus Australia Timur",
    diet:"Herbivora (daun eukaliptus)",
    status:"Rentan", lifespan:15, weightKg:12, length:"0.6–0.85 m",
    tags:["Australia","Marsupial","Arboreal"],
    facts:["Banyak tidur untuk hemat energi.","Diet khusus eukaliptus.","Indra penciuman kuat untuk pilih daun."],
    teaser:"Si pendiam pecinta eukaliptus.",
    ranges:[ {label:"Queensland–NSW",lat:-27,lng:153,r:400}, {label:"Victoria",lat:-37,lng:145,r:300} ]
  },
  // Belahan utara
  { id:"beruang", emoji:"🐻", name:"Beruang Cokelat", latin:"Ursus arctos",
    habitat:"Hutan boreal, pegunungan, tundra",
    diet:"Omnivora (buah, ikan, mamalia kecil)",
    status:"Risiko Rendah", lifespan:25, weightKg:350, length:"1.2–2.8 m",
    tags:["Omnivora","Belahan Utara","Soliter"],
    facts:["Hibernasi musiman.","Cakar kuat.","Penciuman tajam."],
    teaser:"Raksasa berbulu pemalu.",
    ranges:[ {label:"Alaska",lat:61,lng:-150,r:900}, {label:"Rusia",lat:60,lng:100,r:1400}, {label:"Skandinavia",lat:62,lng:15,r:600} ]
  },
  { id:"serigala", emoji:"🐺", name:"Serigala Abu-abu", latin:"Canis lupus",
    habitat:"Hutan, tundra, pegunungan, padang rumput belahan utara",
    diet:"Karnivora (ungulata kecil–menengah)",
    status:"Risiko Rendah", lifespan:13, weightKg:50, length:"1.0–1.6 m",
    tags:["Karnivora","Sosial","Belahan Utara"],
    facts:["Berburu kooperatif.","Melolong tandai wilayah.","Adaptif aneka iklim."],
    teaser:"Koordinator kawanan ulung.",
    ranges:[ {label:"Kanada",lat:56,lng:-106,r:1200}, {label:"Eurasia Utara",lat:60,lng:90,r:1400} ]
  },
  { id:"rubah", emoji:"🦊", name:"Rubah Merah", latin:"Vulpes vulpes",
    habitat:"Beragam habitat belahan utara",
    diet:"Omnivora (rodensia, burung, buah)",
    status:"Risiko Rendah", lifespan:8, weightKg:8, length:"0.45–0.9 m",
    tags:["Omnivora","Adaptif","Belahan Utara"],
    facts:["Sangat adaptif di kota dan alam.","Pendengarannya tajam.","Ekor lebat untuk keseimbangan."],
    teaser:"Si licik nan adaptif.",
    ranges:[ {label:"Eropa",lat:52,lng:10,r:900}, {label:"Amerika Utara",lat:45,lng:-100,r:1200}, {label:"Jepang",lat:43,lng:142,r:500} ]
  },
  { id:"bison", emoji:"🦬", name:"Bison Amerika", latin:"Bison bison",
    habitat:"Padang rumput Amerika Utara",
    diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:900, length:"2–3.5 m",
    tags:["Amerika Utara","Herbivora","Ikonik"],
    facts:["Pernah hampir punah, kini pulih di taman nasional.","Jantan bertanduk besar.","Lari hingga ~55 km/jam."],
    teaser:"Ikon Great Plains yang tangguh.",
    ranges:[ {label:"Yellowstone",lat:44.6,lng:-110.5,r:200}, {label:"Great Plains",lat:49,lng:-99,r:300} ]
  },
  // Gurun/Timur Tengah
  { id:"unta", emoji:"🐪", name:"Unta Dromedaris", latin:"Camelus dromedarius",
    habitat:"Gurun Afrika Utara & Timur Tengah",
    diet:"Herbivora (semak, rumput gurun)",
    status:"Risiko Rendah", lifespan:40, weightKg:600, length:"1.9–2.3 m (tinggi bahu)",
    tags:["Gurun","Herbivora","Domestik"],
    facts:["Simpan lemak di punuk, bukan air.","Tahan dehidrasi.","Kaki bantalan untuk pasir."],
    teaser:"Transportasi gurun yang tangguh.",
    ranges:[ {label:"Arab",lat:23,lng:45,r:800}, {label:"Sahara",lat:20,lng:13,r:1000} ]
  }
];

// Peringkat status untuk pengurutan
const statusRank = { "Punah":0, "Kritis":1, "Terancam Punah":2, "Rentan":3, "Hampir Terancam":4, "Risiko Rendah":5 };

// Elemen
const els = {
  cards: q("#cards"),
  search: q("#search"),
  sort: q("#sort"),
  density: q("#density"),
  empty: q("#empty"),
  clearSearch: q("#clearSearch"),

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
};

// State sederhana
let state = {
  query: "",
  sort: "name-asc",
  dense: false,
  showMarkers: true,
  showRanges: true
};

/* =========================================================
   Render kartu
   ========================================================= */
function render(){
  const list = animals
    .filter(a => matchesQuery(a, state.query))
    .sort(bySort);

  els.cards.innerHTML = "";
  if(list.length === 0){
    els.empty.classList.remove("hidden");
  } else {
    els.empty.classList.add("hidden");
    const frag = document.createDocumentFragment();
    list.forEach(an => frag.appendChild(cardTemplate(an)));
    els.cards.appendChild(frag);
  }

  // sinkron peta
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

  // buka modal detail
  const open = () => openModal(an);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });

  // fokus peta
  card.querySelector(".action.mapfocus").addEventListener("click", (e)=>{
    e.stopPropagation();
    focusAnimalOnMap(an.id);
    window.scrollTo({ top: els.mapContainer.getBoundingClientRect().top + window.scrollY - 80, behavior:"smooth" });
  });

  return card;
}

/* =========================================================
   Modal detail
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
   Pencarian & Urut
   ========================================================= */
function matchesQuery(an, q){
  if(!q) return true;
  const hay = (an.name+" "+an.latin+" "+an.habitat+" "+an.diet+" "+an.status+" "+an.tags.join(" ")+" "+an.teaser).toLowerCase();
  return hay.includes(q.toLowerCase());
}
function bySort(a,b){
  switch(state.sort){
    case "name-asc": return a.name.localeCompare(b.name, 'id');
    case "name-desc": return b.name.localeCompare(a.name, 'id');
    case "status": return (statusRank[a.status] ?? 9) - (statusRank[b.status] ?? 9);
    case "weight": return b.weightKg - a.weightKg;
    case "lifespan": return b.lifespan - a.lifespan;
    default: return 0;
  }
}
function formatKg(kg){ return new Intl.NumberFormat('id-ID').format(kg) + " kg"; }

/* =========================================================
   Peta — Leaflet (skala kecil)
   ========================================================= */
let map, markerLayer, rangeLayer, mapIndex = {};
let lastFilteredIds = new Set();

function initMap(){
  map = L.map(els.mapContainer, {
    worldCopyJump: true,
    minZoom: 1,
    maxZoom: 6,   // batasi agar tetap skala kecil
    zoomSnap: 0.5,
    scrollWheelZoom: true
  }).setView([10, 20], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution:'© OpenStreetMap, © CARTO', maxZoom: 19 }
  ).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  rangeLayer = L.layerGroup().addTo(map);

  buildMapLayers();
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
  if(b) map.fitBounds(b.pad(0.2), { maxZoom: 4.5 });
}

function fitVisibleBounds(){
  if(!lastFilteredIds.size){ toast("Tidak ada hasil untuk difokuskan."); return; }
  const b = getBoundsForIds(lastFilteredIds);
  if(b) map.fitBounds(b.pad(0.25), { maxZoom: 5.5 });
}

function focusAnimalOnMap(id){
  const entry = mapIndex[id];
  if(!entry || !entry.markers.length){ toast("Tidak ada lokasi peta untuk hewan ini."); return; }
  const latlngs = entry.markers.map(m=> m.getLatLng());
  const b = L.latLngBounds(latlngs);
  map.fitBounds(b.pad(0.6), { maxZoom: 5.8 });
  // kecilkan-besarkan ikon sebagai indikator
  entry.markers.forEach(m=>{ const el=m._icon; if(el) el.animate([{transform:"scale(1)"},{transform:"scale(1.2)"},{transform:"scale(1)"}],{duration:450}); });
}

/* =========================================================
   Event bindings
   ========================================================= */
els.search.addEventListener("input", (e)=>{ state.query = e.target.value.trim(); render(); });
els.clearSearch.addEventListener("click", ()=>{ state.query=""; els.search.value=""; render(); });
els.sort.addEventListener("change", (e)=>{ state.sort = e.target.value; render(); });

els.density.addEventListener("click", ()=>{
  state.dense = !state.dense;
  document.documentElement.style.setProperty("--radius-xl", state.dense? "14px":"22px");
  document.documentElement.style.setProperty("--radius-md", state.dense? "8px":"14px");
  els.density.setAttribute("aria-pressed", String(state.dense));
});

els.showMarkers.addEventListener("change", ()=>{ state.showMarkers = els.showMarkers.checked; applyLayerVisibility(); });
els.showRanges.addEventListener("change", ()=>{ state.showRanges = els.showRanges.checked; applyLayerVisibility(); });
els.fitAll.addEventListener("click", fitAllBounds);
els.fitVisible.addEventListener("click", fitVisibleBounds);

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
   Helper
   ========================================================= */
function q(s){ return document.querySelector(s); }

/* =========================================================
   Inisialisasi
   ========================================================= */
document.addEventListener("DOMContentLoaded", ()=>{
  render();
  initMap();
});
