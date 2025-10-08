"use strict";
/* =========================================================
   HANFANDA — Atlas Habitat Hewan Darat
   - Peta globe skala besar (Leaflet) dengan fallback batas negara
   - Panel negara menampilkan daftar hewan dan habitatnya
   - Dataset diperluas, khusus hewan darat dengan distribusi realistis
   ========================================================= */

/* Dataset hewan darat */
const animals = [
  { id:"harimau", emoji:"🐯", name:"Harimau", latin:"Panthera tigris",
    habitat:"Hutan hujan, sabana, lahan basah Asia", diet:"Karnivora (rusa, babi hutan, kerbau muda)",
    status:"Terancam Punah", lifespan:15, weightKg:220, length:"2.7–3.1 m",
    tags:["Asia","Karnivora","Kucing Besar"], teaser:"Pemburu sunyi bergaris.",
    facts:["Garis unik seperti sidik jari.","Perenang andal.","Auman terdengar lebih dari 2 km."],
    ranges:[ {label:"India Tengah",lat:22.5,lng:79.5,r:600}, {label:"Siberia Timur",lat:46,lng:134,r:500}, {label:"Sumatra",lat:-1.65,lng:103.6,r:280} ],
    countries:["IN","RU","ID","BD","NP","MM","TH","LA","KH","VN","CN"]
  },
  { id:"singa", emoji:"🦁", name:"Singa", latin:"Panthera leo",
    habitat:"Sabana Afrika dan Gir, India", diet:"Karnivora (antelope, zebra, kerbau)",
    status:"Rentan", lifespan:14, weightKg:190, length:"2.4–2.8 m",
    tags:["Afrika","Karnivora","Sosial"], teaser:"Ikon sabana yang hidup berkelompok.",
    facts:["Pride dipimpin betina.","Auman terdengar 8 km.","Jantan menjaga wilayah."],
    ranges:[ {label:"Serengeti",lat:-2,lng:36,r:800}, {label:"Kruger",lat:-23,lng:31,r:700}, {label:"Gir, India",lat:21,lng:70,r:200} ],
    countries:["KE","TZ","UG","ZA","BW","NA","ZM","MZ","IN"]
  },
  { id:"cheetah", emoji:"🐆", name:"Cheetah", latin:"Acinonyx jubatus",
    habitat:"Sabana terbuka Afrika", diet:"Karnivora (gazelle kecil, impala muda)",
    status:"Rentan", lifespan:12, weightKg:65, length:"1.1–1.5 m",
    tags:["Afrika","Karnivora","Sprinter"], teaser:"Mamalia darat tercepat di dunia.",
    facts:["Dapat sprint hingga 100 km/jam.","Cakar semi-tidak bisa ditarik.","Memburu di siang hari."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:35,r:600}, {label:"Afrika Selatan",lat:-18,lng:22,r:800} ],
    countries:["KE","TZ","NA","ZA","BW"]
  },
  { id:"gajah", emoji:"🐘", name:"Gajah Afrika & Asia", latin:"Loxodonta africana / Elephas maximus",
    habitat:"Hutan, sabana, padang rumput Afrika & Asia", diet:"Herbivora (rumput, daun, kulit kayu)",
    status:"Rentan", lifespan:60, weightKg:4000, length:"2.5–4 m (tinggi bahu)",
    tags:["Afrika","Asia","Herbivora Besar"], teaser:"Raksasa cerdas dengan ikatan sosial kuat.",
    facts:["Memori jangka panjang.","Komunikasi infrasonik.","Belalai memiliki lebih dari 40 ribu otot."],
    ranges:[ {label:"Afrika Sub-Sahara",lat:-2,lng:23,r:1400}, {label:"Asia Selatan–Tenggara",lat:10,lng:100,r:1200} ],
    countries:["KE","TZ","ZA","BW","IN","LK","TH","MY","MM","LA","KH"]
  },
  { id:"jerapah", emoji:"🦒", name:"Jerapah", latin:"Giraffa camelopardalis",
    habitat:"Sabana dan sabuk savana Afrika", diet:"Herbivora (daun akasia, pucuk)",
    status:"Rentan", lifespan:25, weightKg:800, length:"4.5–5.5 m (tinggi)",
    tags:["Afrika","Herbivora","Tertinggi"], teaser:"Mamalia tertinggi, penggemar daun akasia.",
    facts:["Tekanan darah tinggi untuk memompa darah ke otak.","Lidah sepanjang ~45 cm.","Tidur hanya beberapa menit per hari."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:36,r:700}, {label:"Afrika Selatan",lat:-22,lng:24,r:800} ],
    countries:["KE","TZ","ZA","NA","BW"]
  },
  { id:"badak", emoji:"🦏", name:"Badak Putih & India", latin:"Ceratotherium simum / Rhinoceros unicornis",
    habitat:"Sabana Afrika; dataran banjir India/Nepal", diet:"Herbivora (rumput, pucuk)",
    status:"Terancam Punah", lifespan:40, weightKg:2300, length:"3.5–4.2 m",
    tags:["Afrika","Asia","Herbivora Besar"], teaser:"Herbivora berbaju zirah dengan tanduk keratin.",
    facts:["Kulit tebal 5 cm.","Penglihatan lemah, penciuman tajam.","Mencapai kecepatan 50 km/jam."],
    ranges:[ {label:"Afrika Selatan",lat:-24,lng:26,r:600}, {label:"Assam & Nepal",lat:26,lng:86,r:220} ],
    countries:["ZA","NA","IN","NP"]
  },
  { id:"zebra", emoji:"🦓", name:"Zebra Dataran", latin:"Equus quagga",
    habitat:"Sabana dan padang rumput Afrika", diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:350, length:"2.0–2.6 m",
    tags:["Afrika","Herbivora","Bergaris"], teaser:"Garis unik tiap individu membantu kamuflase kawanan.",
    facts:["Pola garis menipu predator.","Tahan kekeringan musiman.","Migrasi ribuan km tiap tahun."],
    ranges:[ {label:"Afrika Timur",lat:-2,lng:37,r:800}, {label:"Afrika Selatan",lat:-23,lng:25,r:800} ],
    countries:["KE","TZ","ZA","BW"]
  },
  { id:"kudanil", emoji:"🦛", name:"Kuda Nil", latin:"Hippopotamus amphibius",
    habitat:"Sungai dan danau Afrika sub-Sahara", diet:"Herbivora (rumput)",
    status:"Rentan", lifespan:40, weightKg:1500, length:"3–5 m",
    tags:["Afrika","Semiakuatik","Herbivora"], teaser:"Menghabiskan siang di air untuk tetap sejuk.",
    facts:["Mulut membuka hingga 150°.","Teritorial di air, sosial di darat.","Berjalan di dasar sungai, bukan berenang."],
    ranges:[ {label:"Lembah Rift",lat:-3,lng:35,r:800}, {label:"Lembah Zambezi",lat:-17,lng:30,r:900} ],
    countries:["KE","TZ","MZ","ZM","ZA"]
  },
  { id:"orangutan", emoji:"🦧", name:"Orangutan", latin:"Pongo abelii / Pongo pygmaeus",
    habitat:"Hutan hujan Sumatra & Kalimantan", diet:"Omnivora (buah, daun, serangga)",
    status:"Terancam Punah", lifespan:35, weightKg:50, length:"1.2–1.5 m",
    tags:["Asia","Primata","Arboreal"], teaser:"Primata arboreal cerdas yang menggunakan alat sederhana.",
    facts:["Betina mengasuh anak hingga 8 tahun.","Menganyam sarang baru tiap malam.","Mampu mempelajari keterampilan baru."],
    ranges:[ {label:"Kalimantan",lat:0.5,lng:114,r:400}, {label:"Sumatra Utara",lat:3.1,lng:97.5,r:250} ],
    countries:["ID","MY"]
  },
  { id:"komodo", emoji:"🦎", name:"Komodo", latin:"Varanus komodoensis",
    habitat:"Savana dan hutan kering Nusa Tenggara Timur", diet:"Karnivora (bangkai, mamalia, burung)",
    status:"Rentan", lifespan:30, weightKg:70, length:"2–3 m",
    tags:["Indonesia","Reptil","Predator Puncak"], teaser:"Kadal terbesar dunia, dengan air liur beracun.",
    facts:["Mendeteksi bau hingga 5 km.","Berburu dengan kombinasi racun dan bakteri.","Betina dapat bertelur secara partenogenesis."],
    ranges:[ {label:"Pulau Komodo",lat:-8.57,lng:119.48,r:50}, {label:"Pulau Rinca",lat:-8.66,lng:119.73,r:40}, {label:"Flores Barat",lat:-8.71,lng:120.58,r:80} ],
    countries:["ID"]
  },
  { id:"tapir", emoji:"🐾", name:"Tapir Melayu", latin:"Tapirus indicus",
    habitat:"Hutan tropis Asia Tenggara", diet:"Herbivora (daun, buah)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"1.8–2.5 m",
    tags:["Asia","Herbivora","Nokturnal"], teaser:"Mamalia pemalu dengan pola hitam-putih kontras.",
    facts:["Moncong serupa belalai pendek.","Pandai berenang.","Beraktivitas malam."],
    ranges:[ {label:"Semenanjung Malaya",lat:4.2,lng:102.0,r:400}, {label:"Sumatra",lat:-0.5,lng:102.5,r:500}, {label:"Thailand Selatan",lat:8.5,lng:99.5,r:400} ],
    countries:["MY","TH","ID"]
  },
  { id:"kanguru", emoji:"🦘", name:"Kanguru Merah", latin:"Osphranter rufus",
    habitat:"Semak belukar, padang rumput kering Australia", diet:"Herbivora (rumput, daun)",
    status:"Risiko Rendah", lifespan:20, weightKg:85, length:"1.0–1.8 m (tinggi)",
    tags:["Australia","Marsupial","Pelompat"], teaser:"Marsupial terbesar, atlet pelompat jarak jauh.",
    facts:["Lompatan hingga 9 m.","Kaki belakang hanya untuk lompat, tidak bisa jalan mundur.","Ekor kuat sebagai penyeimbang."],
    ranges:[ {label:"Australia Tengah",lat:-25,lng:133,r:1500} ],
    countries:["AU"]
  },
  { id:"koala", emoji:"🐨", name:"Koala", latin:"Phascolarctos cinereus",
    habitat:"Hutan eukaliptus Australia Timur", diet:"Herbivora (daun eukaliptus)",
    status:"Rentan", lifespan:15, weightKg:12, length:"0.6–0.85 m",
    tags:["Australia","Marsupial","Arboreal"], teaser:"Marsupial arboreal yang tidur hingga 20 jam/hari.",
    facts:["Memiliki sidik jari mirip manusia.","Memilih daun rendah toksin.","Anak tinggal di kantong 6 bulan."],
    ranges:[ {label:"Queensland–NSW",lat:-27,lng:153,r:400}, {label:"Victoria",lat:-37,lng:145,r:300} ],
    countries:["AU"]
  },
  { id:"beruang", emoji:"🐻", name:"Beruang Cokelat", latin:"Ursus arctos",
    habitat:"Hutan boreal, pegunungan, tundra", diet:"Omnivora (buah, ikan, mamalia kecil)",
    status:"Risiko Rendah", lifespan:25, weightKg:350, length:"1.2–2.8 m",
    tags:["Belahan Utara","Omnivora","Soliter"], teaser:"Omnivora besar yang mampu berlari hingga 50 km/jam.",
    facts:["Hibernasi 5–7 bulan.","Cakar kuat untuk menggali.","Penciuman 7× lebih tajam dari anjing."],
    ranges:[ {label:"Alaska",lat:61,lng:-150,r:900}, {label:"Siberia",lat:60,lng:100,r:1400}, {label:"Skandinavia",lat:62,lng:15,r:600} ],
    countries:["US","CA","RU","NO","SE","FI"]
  },
  { id:"serigala", emoji:"🐺", name:"Serigala Abu-abu", latin:"Canis lupus",
    habitat:"Hutan, tundra, pegunungan, padang rumput", diet:"Karnivora (ungulata kecil–menengah)",
    status:"Risiko Rendah", lifespan:13, weightKg:50, length:"1.0–1.6 m",
    tags:["Belahan Utara","Karnivora","Sosial"], teaser:"Predator sosial yang berburu berkelompok.",
    facts:["Susunan hierarki alfa-beta.","Melolong untuk komunikasi jarak jauh.","Adaptif pada berbagai habitat."],
    ranges:[ {label:"Kanada",lat:56,lng:-106,r:1200}, {label:"Eurasia Utara",lat:60,lng:90,r:1400} ],
    countries:["US","CA","RU","SE","NO","FI"]
  },
  { id:"rubah", emoji:"🦊", name:"Rubah Merah", latin:"Vulpes vulpes",
    habitat:"Beragam habitat belahan utara, hingga kota", diet:"Omnivora (rodensia, burung, buah)",
    status:"Risiko Rendah", lifespan:8, weightKg:8, length:"0.45–0.9 m",
    tags:["Belahan Utara","Omnivora","Adaptif"], teaser:"Kanid kecil adaptif dengan ekor lebat.",
    facts:["Pendengaran ultrasonik.","Mampu meloncat tinggi untuk berburu tikus di salju.","Ekor sebagai selimut saat tidur."],
    ranges:[ {label:"Eropa",lat:52,lng:10,r:900}, {label:"Amerika Utara",lat:45,lng:-100,r:1200}, {label:"Jepang",lat:43,lng:142,r:500} ],
    countries:["US","CA","GB","FR","JP","DE","PL","RU"]
  },
  { id:"bison", emoji:"🦬", name:"Bison Amerika", latin:"Bison bison",
    habitat:"Padang rumput Amerika Utara", diet:"Herbivora (rumput)",
    status:"Risiko Rendah", lifespan:20, weightKg:900, length:"2–3.5 m",
    tags:["Amerika Utara","Herbivora","Ikonik"], teaser:"Ikon Great Plains yang nyaris punah di abad ke-19.",
    facts:["Populasi pulih lewat program konservasi.","Lari hingga 55 km/jam.","Jantan beratnya lebih dari 900 kg."],
    ranges:[ {label:"Yellowstone",lat:44.6,lng:-110.5,r:220}, {label:"Great Plains",lat:49,lng:-99,r:320} ],
    countries:["US","CA"]
  },
  { id:"unta", emoji:"🐪", name:"Unta Dromedaris", latin:"Camelus dromedarius",
    habitat:"Gurun Afrika Utara & Timur Tengah", diet:"Herbivora (semak, rumput gurun)",
    status:"Risiko Rendah", lifespan:40, weightKg:600, length:"1.9–2.3 m (tinggi bahu)",
    tags:["Gurun","Herbivora","Domestik"], teaser:"Transportasi gurun tahan panas ekstrem.",
    facts:["Punuk menimbun lemak, bukan air.","Menahan dehidrasi hingga 30% bobot tubuh.","Bulu mata tiga lapis melindungi dari pasir."],
    ranges:[ {label:"Arab",lat:23,lng:45,r:800}, {label:"Sahara",lat:20,lng:13,r:1000} ],
    countries:["SA","AE","OM","DZ","MR","EG"]
  },
  { id:"jaguar", emoji:"🐆", name:"Jaguar", latin:"Panthera onca",
    habitat:"Hutan hujan Amazon, rawa Pantanal, hutan riparian Amerika Latin", diet:"Karnivora (kapibara, rusa, caiman)",
    status:"Hampir Terancam", lifespan:15, weightKg:100, length:"1.8 m",
    tags:["Amerika Selatan","Karnivora","Kucing Besar"], teaser:"Kucing besar Amerika satu-satunya dengan gigitan menembus tempurung kura-kura.",
    facts:["Penguasa Pantanal, berenang dan menyelam.","Polanya roset dengan titik di tengah.","Menantang caiman dalam perburuan."],
    ranges:[ {label:"Amazon Brasil",lat:-3,lng:-60,r:900}, {label:"Pantanal",lat:-16,lng:-57,r:450}, {label:"Orinoco",lat:6,lng:-66,r:380} ],
    countries:["BR","CO","VE","PE","BO"]
  },
  { id:"kapibara", emoji:"🦫", name:"Kapibara", latin:"Hydrochoerus hydrochaeris",
    habitat:"Padang rumput banjir, hutan riparian Amerika Selatan", diet:"Herbivora (rumput, tanaman air)",
    status:"Risiko Rendah", lifespan:10, weightKg:60, length:"1–1.3 m",
    tags:["Amerika Selatan","Herbivora","Semi Akuatik"], teaser:"Rodensia terbesar dunia, hidup berkelompok di tepi perairan.",
    facts:["Memerlukan air untuk termoregulasi.","Berkomunikasi dengan dengkuran dan siulan.","Sering berbagi habitat dengan jaguar."],
    ranges:[ {label:"Brasil Tengah",lat:-11,lng:-55,r:600}, {label:"Argentina Utara",lat:-26,lng:-58,r:400}, {label:"Orinoco Kolombia",lat:5,lng:-72,r:350} ],
    countries:["BR","AR","BO","PY","CO"]
  },
  { id:"tapiramerika", emoji:"🦌", name:"Tapir Brasil", latin:"Tapirus terrestris",
    habitat:"Hutan hujan Amazon, hutan Galeri, rawa Pantanal", diet:"Herbivora (buah, daun, tunas)",
    status:"Rentan", lifespan:25, weightKg:250, length:"1.8–2.5 m",
    tags:["Amerika Selatan","Herbivora","Hutan"], teaser:"Pemakan buah penting untuk penyebar biji di Amazon.",
    facts:["Aktif malam, memakai sungai untuk kabur.","Pendengaran tajam, penglihatan lemah.","Terdapat selaput renang di kaki."],
    ranges:[ {label:"Amazon Barat",lat:-6,lng:-70,r:600}, {label:"Pantanal Selatan",lat:-19,lng:-57,r:350} ],
    countries:["BR","PE","BO","AR"]
  },
  { id:"anteater", emoji:"🦡", name:"Anteater Raksasa", latin:"Myrmecophaga tridactyla",
    habitat:"Sabana tropis, hutan terbuka Amerika Tengah & Selatan", diet:"Insektivora (semut, rayap)",
    status:"Rentan", lifespan:15, weightKg:33, length:"1.8–2.4 m",
    tags:["Amerika Selatan","Insektivora","Unik"], teaser:"Mamalia dengan moncong panjang dan lidah lengket 60 cm.",
    facts:["Mengunjungi ≥200 sarang semut per hari.","Tidak memiliki gigi.","Menggunakan cakar kuat melawan predator."],
    ranges:[ {label:"Cerrado Brasil",lat:-15,lng:-47,r:600}, {label:"Gran Chaco",lat:-20,lng:-62,r:550} ],
    countries:["BR","AR","BO","PY"]
  },
  { id:"okapi", emoji:"🦓", name:"Okapi", latin:"Okapia johnstoni",
    habitat:"Hutan hujan dataran rendah Kongo", diet:"Herbivora (daun, pucuk, jamur)",
    status:"Terancam Punah", lifespan:25, weightKg:250, length:"2.0 m",
    tags:["Afrika","Herbivora","Endemik"], teaser:"Kerabat jerapah endemik yang tersembunyi di hutan Ituri.",
    facts:["Disamarkan dengan garis mirip zebra.","Bau khas membantu pejantan mencari betina.","Lidah menjilat telinga sendiri."],
    ranges:[ {label:"Hutan Ituri",lat:0.8,lng:28.5,r:250} ],
    countries:["CD"]
  },
  { id:"lynx", emoji:"🐱", name:"Lynx Eurasia", latin:"Lynx lynx",
    habitat:"Hutan boreal dan pegunungan Eurasia", diet:"Karnivora (rusa, kelinci salju, hewan pengerat)",
    status:"Risiko Rendah", lifespan:17, weightKg:26, length:"0.8–1.3 m",
    tags:["Eurasia","Karnivora","Soliter"], teaser:"Kucing liar bertelinga jumbai dengan penglihatan senja unggul.",
    facts:["Berburu dari jarak dekat, loncatan kuat.","Telinga jumbai membantu fokus suara.","Populasi pulih lewat reintroduksi Eropa Barat."],
    ranges:[ {label:"Skandinavia",lat:63,lng:15,r:500}, {label:"Carpathia",lat:48,lng:24,r:350}, {label:"Siberia Barat",lat:59,lng:85,r:600} ],
    countries:["RU","SE","FI","PL","DE","CZ"]
  },
  { id:"snowleopard", emoji:"🐆", name:"Macan Tutul Salju", latin:"Panthera uncia",
    habitat:"Pegunungan Himalaya dan Asia Tengah hingga 5.500 m", diet:"Karnivora (bharal, ibex, marmot)",
    status:"Rentan", lifespan:15, weightKg:45, length:"0.9–1.2 m tubuh, ekor 1 m",
    tags:["Pegunungan","Karnivora","Asia Tengah"], teaser:"Kucing besar pemalu penghuni tebing curam dan bersalju.",
    facts:["Ekor panjang untuk keseimbangan dan selimut.","Lompatan hingga 15 m.","Populasi tersebar luas namun jarang."],
    ranges:[ {label:"Trans-Himalaya",lat:31,lng:79,r:450}, {label:"Altai",lat:48,lng:90,r:400}, {label:"Tianshan",lat:42,lng:78,r:380} ],
    countries:["CN","IN","NP","BT","PK"]
  },
  { id:"moose", emoji:"🫎", name:"Moose", latin:"Alces alces",
    habitat:"Hutan boreal, rawa, taiga Eropa dan Amerika Utara", diet:"Herbivora (ranting willow, tanaman air)",
    status:"Risiko Rendah", lifespan:20, weightKg:550, length:"2.4 m (tinggi bahu jantan)",
    tags:["Belahan Utara","Herbivora","Ungulata"], teaser:"Ungulata raksasa dengan palang tanduk khas jantan.",
    facts:["Perenang kuat, menyelam 5 m untuk tanaman air.","Tanduk gugur tiap tahun.","Lebih aktif saat fajar dan senja."],
    ranges:[ {label:"Skandinavia",lat:61,lng:17,r:500}, {label:"Quebec",lat:52,lng:-71,r:650}, {label:"Alaska",lat:63,lng:-150,r:700} ],
    countries:["CA","US","NO","SE","FI","RU"]
  },
  { id:"polarfox", emoji:"🦊", name:"Rubah Arktik", latin:"Vulpes lagopus",
    habitat:"Tundra Arktik dan garis pantai ber-es", diet:"Omnivora (lemming, burung laut, bangkai)",
    status:"Risiko Rendah", lifespan:9, weightKg:4, length:"0.5–0.7 m",
    tags:["Arktik","Omnivora","Adaptif"], teaser:"Mamalia religu es dengan bulu berubah warna musim dingin.",
    facts:["Bulu berubah dari coklat ke putih musim dingin.","Pendengaran tajam untuk mendeteksi lemming di bawah salju.","Mengikuti beruang kutub untuk bangkai."],
    ranges:[ {label:"Svalbard",lat:79,lng:15,r:250}, {label:"Taimyr",lat:74,lng:100,r:400}, {label:"Nunavut",lat:70,lng:-95,r:350} ],
    countries:["NO","RU","CA","US"]
  }
];

/* Negara & warna bendera */
const COUNTRY_NAMES = {
  IN:"India", RU:"Rusia", ID:"Indonesia", BD:"Bangladesh", NP:"Nepal", MM:"Myanmar", TH:"Thailand", LA:"Laos", KH:"Kamboja", VN:"Vietnam", CN:"Tiongkok",
  KE:"Kenya", TZ:"Tanzania", UG:"Uganda", ZA:"Afrika Selatan", BW:"Botswana", NA:"Namibia", ZM:"Zambia", MZ:"Mozambik",
  LK:"Sri Lanka", MY:"Malaysia", AU:"Australia", JP:"Jepang", GB:"Britania Raya", FR:"Prancis", DE:"Jerman", PL:"Polandia",
  NO:"Norwegia", SE:"Swedia", FI:"Finlandia", US:"Amerika Serikat", CA:"Kanada",
  SA:"Arab Saudi", AE:"Uni Emirat Arab", OM:"Oman", DZ:"Aljazair", MR:"Mauritania", EG:"Mesir",
  BR:"Brasil", CO:"Kolombia", VE:"Venezuela", PE:"Peru", BO:"Bolivia", PY:"Paraguay", AR:"Argentina",
  CD:"Republik Demokratik Kongo", CZ:"Republik Ceko", BT:"Bhutan", PK:"Pakistan"
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
  DZ:["#006233","#FFFFFF","#D21034"], MR:["#006233","#FFD700"], EG:["#CE1126","#FFFFFF","#000000"],
  BR:["#009C3B","#FFDF00","#002776"], CO:["#FCD116","#003893","#CE1126"], VE:["#FAD201","#003893","#CE1126"], PE:["#FF0000","#FFFFFF"],
  BO:["#007934","#F9E300","#DC1C13"], PY:["#002B7F","#FFFFFF","#D52B1E"], AR:["#74ACDF","#FFFFFF","#F6B40E"],
  CD:["#007FFF","#F7D618","#CE1021"], CZ:["#11457E","#FFFFFF","#D7141A"], BT:["#FFCC00","#FF6600","#FFFFFF"], PK:["#01411C","#FFFFFF"]
};
const NAME_ALIASES = {
  "india":"IN","russia":"RU","russian federation":"RU","indonesia":"ID","bangladesh":"BD","nepal":"NP","myanmar":"MM",
  "thailand":"TH","laos":"LA","lao pdr":"LA","cambodia":"KH","viet nam":"VN","vietnam":"VN","china":"CN",
  "kenya":"KE","tanzania":"TZ","united republic of tanzania":"TZ","uganda":"UG","south africa":"ZA","botswana":"BW","namibia":"NA",
  "zambia":"ZM","mozambique":"MZ","sri lanka":"LK","malaysia":"MY","australia":"AU","japan":"JP","united kingdom":"GB","great britain":"GB",
  "france":"FR","germany":"DE","poland":"PL","norway":"NO","sweden":"SE","finland":"FI","united states":"US","united states of america":"US","usa":"US","canada":"CA",
  "saudi arabia":"SA","united arab emirates":"AE","oman":"OM","algeria":"DZ","mauritania":"MR","egypt":"EG",
  "brazil":"BR","colombia":"CO","venezuela":"VE","peru":"PE","bolivia":"BO","paraguay":"PY","argentina":"AR",
  "democratic republic of the congo":"CD","drc":"CD","czech republic":"CZ","czechia":"CZ","bhutan":"BT","pakistan":"PK"
};

/* Elemen */
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
  viewMode: q("#viewMode"),

  panel: q("#countryPanel"),
  panelFlag: q("#panelFlag"),
  panelTitle: q("#panelTitle"),
  panelCount: q("#panelCount"),
  panelList: q("#panelList"),

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

/* State */
const store = {
  get(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch{ return d; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch{} }
};
let state = Object.assign({
  query: "", sort: "name-asc", dense: false,
  showMarkers: true, showRanges: true, countryIso: "",
  view: store.get("view","cards")
}, store.get("state", {}));

/* Helpers */
function q(sel){ return document.querySelector(sel); }
function formatKg(kg){ return new Intl.NumberFormat('id-ID').format(kg) + " kg"; }
function matchesQuery(an, query){
  if(!query) return true;
  const hay = (an.name+" "+an.latin+" "+an.habitat+" "+an.diet+" "+an.status+" "+an.tags.join(" ")+" "+an.teaser).toLowerCase();
  return hay.includes(query.toLowerCase());
}
const STATUS_RANK = { "Punah":0, "Kritis":1, "Terancam Punah":2, "Rentan":3, "Hampir Terancam":4, "Risiko Rendah":5 };
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
function isoToFlagEmoji(iso2){
  if(!iso2 || iso2.length!==2) return "🏳️";
  const base = 0x1F1E6;
  return String.fromCodePoint(...iso2.toUpperCase().split("").map(c => base + (c.charCodeAt(0) - 65)));
}
function setFlagSwatch(iso){
  const cols = FLAG_COLORS[iso] || ["#333","#2a2a2a","#1f1f1f"];
  const stops = cols.map((c,i,arr)=> `${c} ${Math.round(i/arr.length*100)}% ${Math.round((i+1)/arr.length*100)}%`).join(", ");
  els.flagSwatch.style.background = `linear-gradient(90deg, ${stops})`;
  els.flagSwatch.title = iso ? `Bendera: ${COUNTRY_NAMES[iso] || iso}` : "Warna bendera";
}
function applyView(v){
  els.viewMode.value = v;
  els.cards.classList.toggle("list", v==="list");
  store.set("view", v); state.view = v; store.set("state", state);
}

/* Negara -> hewan */
const COUNTRY_ANIMALS = {};
animals.forEach(an => (an.countries||[]).forEach(iso => (COUNTRY_ANIMALS[iso] ||= []).push(an.id)));
function buildCountrySelect(){
  const isos = Object.keys(COUNTRY_ANIMALS).sort((a,b)=> (COUNTRY_NAMES[a]||a).localeCompare(COUNTRY_NAMES[b]||b,'id'));
  const frag = document.createDocumentFragment();
  const opt0 = document.createElement("option");
  opt0.value=""; opt0.textContent="— Pilih negara —";
  frag.appendChild(opt0);
  isos.forEach(iso=>{
    const opt = document.createElement("option");
    opt.value = iso;
    opt.textContent = `${isoToFlagEmoji(iso)} ${COUNTRY_NAMES[iso]||iso}`;
    frag.appendChild(opt);
  });
  els.countrySelect.innerHTML="";
  els.countrySelect.appendChild(frag);
}

/* Render */
let lastFilteredIds = new Set();

function render(){
  const list = animals
    .filter(a => matchesQuery(a, state.query))
    .filter(a => state.countryIso ? (a.countries||[]).includes(state.countryIso) : true)
    .sort(bySort);

  els.resultCount.textContent = list.length;
  if(state.countryIso){
    els.countryChipText.textContent = `${isoToFlagEmoji(state.countryIso)} ${(COUNTRY_NAMES[state.countryIso]||state.countryIso)}`;
    els.countryChip.classList.remove("hidden");
  } else els.countryChip.classList.add("hidden");

  if(state.query){
    els.searchChipText.textContent = `“${state.query}”`;
    els.searchChip.classList.remove("hidden");
  } else els.searchChip.classList.add("hidden");

  els.cards.innerHTML = "";
  if(!list.length){
    els.empty.classList.remove("hidden");
  } else {
    els.empty.classList.add("hidden");
    const frag = document.createDocumentFragment();
    list.forEach(an => frag.appendChild(cardTemplate(an)));
    els.cards.appendChild(frag);
  }

  updateMapVisibility(list);
  lastFilteredIds = new Set(list.map(a => a.id));
  updateCountryPanel();
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
      <div class="meta">${an.tags.map(t => `<span class="chip">${t}</span>`).join("")}</div>
      <p class="desc">${an.teaser}</p>
      <div class="stats">
        <div class="kv"><span class="k mono">Status</span><span class="v">${an.status}</span></div>
        <div class="kv"><span class="k mono">Berat</span><span class="v">${formatKg(an.weightKg)}</span></div>
        <div class="kv"><span class="k mono">Umur</span><span class="v">${an.lifespan} tahun</span></div>
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

/* Modal */
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
  els.modalFacts.innerHTML = (an.facts||[]).map(f => `<li>${f}</li>`).join("");
  els.modal.classList.remove("hidden");
}
function closeModal(){ document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden")); }

/* Panel negara */
function updateCountryPanel(){
  if(!state.countryIso){
    els.panel.classList.add("hidden");
    els.panelList.innerHTML = "";
    els.panelTitle.textContent="";
    els.panelFlag.textContent="🏳️";
    els.panelCount.textContent="";
    return;
  }
  const iso = state.countryIso;
  const ids = COUNTRY_ANIMALS[iso] || [];
  const entries = animals.filter(a => ids.includes(a.id)).sort((a,b)=> a.name.localeCompare(b.name,'id'));
  els.panelFlag.textContent = isoToFlagEmoji(iso);
  els.panelTitle.textContent = COUNTRY_NAMES[iso] || iso;
  els.panelCount.textContent = `${entries.length} spesies`;
  els.panelList.innerHTML = entries.map(a => `
    <li>
      <div class="avatar">${a.emoji}</div>
      <div>
        <div class="name">${a.name}<span class="latin"> (${a.latin})</span></div>
        <div class="hab">${a.habitat}</div>
      </div>
    </li>
  `).join("");
  els.panel.classList.remove("hidden");
}

/* Peta */
let map, markerLayer, rangeLayer, countriesLayer;
let mapIndex = {};
const countryLayerByIso = {};
let selectedCountryIso = "";

async function initMap(){
  if(!window.L || !els.mapContainer){ toast("Gagal memuat peta."); return; }

  map = L.map(els.mapContainer, {
    worldCopyJump:true,
    minZoom:1,
    maxZoom:7,
    zoomSnap:0.5,
    scrollWheelZoom:true,
    maxBounds:[[-85,-180],[85,180]],
    maxBoundsViscosity:0.8
  }).setView([15,10], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution:'© OpenStreetMap, © CARTO',
      maxZoom:19,
      updateWhenIdle:true,
      keepBuffer:4,
      crossOrigin:true,
      errorTileUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBi3q1N2kAAAAASUVORK5CYII="
    }
  ).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  rangeLayer = L.layerGroup().addTo(map);
  buildMapLayers();

  let loaded = false;
  try{
    const url = "https://unpkg.com/geojson-world-map@1.0.2/countries.geo.json";
    const res = await fetch(url, { cache:"force-cache", mode:"cors" });
    if(res.ok){
      const gj = await res.json();
      countriesLayer = L.geoJSON(gj, { style: styleCountry, onEachFeature: onEachCountry }).addTo(map);
      loaded = true;
    }
  }catch(_){}

  if(!loaded){
    countriesLayer = L.layerGroup().addTo(map);
    buildFallbackCountryRects();
    toast("Memakai batas negara sederhana (fallback offline).");
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
      const marker = L.marker([r.lat, r.lng], { title: an.name })
        .on('click', ()=> openModal(an))
        .bindTooltip(`${an.emoji} ${an.name} — ${r.label}`, { sticky:true });
      markers.push(marker);
      markerLayer.addLayer(marker);

      const circle = L.circle([r.lat, r.lng], {
        radius: (r.r||r.radius||200)*1000,
        color:"#7f8ba6", weight:1, opacity:0.7,
        fillColor:"#aeb6c9", fillOpacity:0.12
      }).bindTooltip(`Sebaran ± ${r.r||r.radius} km • ${r.label}`);
      ranges.push(circle);
      rangeLayer.addLayer(circle);
    });
    mapIndex[an.id] = { markers, ranges };
  });
  applyLayerVisibility();
}
function applyLayerVisibility(){
  if(state.showMarkers){ if(!map.hasLayer(markerLayer)) map.addLayer(markerLayer); }
  else if(map.hasLayer(markerLayer)) map.removeLayer(markerLayer);

  if(state.showRanges){ if(!map.hasLayer(rangeLayer)) map.addLayer(rangeLayer); }
  else if(map.hasLayer(rangeLayer)) map.removeLayer(rangeLayer);
}
function updateMapVisibility(list){
  if(!map) return;
  const visible = new Set(list.map(a => a.id));
  animals.forEach(an=>{
    const entry = mapIndex[an.id];
    if(!entry) return;
    const show = visible.has(an.id);
    entry.markers.forEach(m => show ? markerLayer.addLayer(m) : markerLayer.removeLayer(m));
    entry.ranges.forEach(c => show ? rangeLayer.addLayer(c) : rangeLayer.removeLayer(c));
  });
}
function getBoundsForIds(ids){
  const points = [];
  ids.forEach(id=>{
    const entry = mapIndex[id];
    if(entry){
      entry.markers.forEach(m=> points.push(m.getLatLng()));
      entry.ranges.forEach(c=> points.push(c.getLatLng()));
    }
  });
  return points.length ? L.latLngBounds(points) : null;
}
function fitAllBounds(){
  const bounds = getBoundsForIds(new Set(animals.map(a=>a.id)));
  if(bounds) map.fitBounds(bounds.pad(0.22), { maxZoom:3.6 });
}
function fitVisibleBounds(){
  if(!lastFilteredIds.size){ toast("Tidak ada hasil untuk difokuskan."); return; }
  const bounds = getBoundsForIds(lastFilteredIds);
  if(bounds) map.fitBounds(bounds.pad(0.25), { maxZoom:5.6 });
}
function focusAnimalOnMap(id){
  const entry = mapIndex[id];
  if(!entry || !entry.markers.length){ toast("Tidak ada lokasi peta untuk hewan ini."); return; }
  const bounds = L.latLngBounds(entry.markers.map(m=> m.getLatLng()));
  map.fitBounds(bounds.pad(0.6), { maxZoom:5.8 });
  entry.markers.forEach(m => {
    const el = m._icon;
    if(el) el.animate([{transform:"scale(1)"},{transform:"scale(1.25)"},{transform:"scale(1)"}], {duration:480});
  });
}

/* Negara */
function styleCountry(feature){
  const iso = getISO2(feature) || "";
  const inDataset = !!COUNTRY_ANIMALS[iso];
  const cols = FLAG_COLORS[iso] || null;
  const fillColor = cols ? cols[0] : (inDataset ? "#4c6ef5" : "#1f2430");
  const weight = (selectedCountryIso && iso===selectedCountryIso) ? 1.8 : 0.6;
  const color = cols ? (cols[1] || cols[0]) : "#5a6270";
  const fillOpacity = (selectedCountryIso && iso===selectedCountryIso) ? 0.38 : (inDataset ? 0.22 : 0.08);
  return { color, weight, fillColor, fillOpacity };
}
function onEachCountry(feature, layer){
  const iso = getISO2(feature) || "";
  const name = COUNTRY_NAMES[iso] || (getName(feature) || iso);
  const hasAnimals = !!COUNTRY_ANIMALS[iso];
  if(iso){ countryLayerByIso[iso] = layer; }

  layer.bindTooltip(`${iso ? isoToFlagEmoji(iso)+" " : ""}${name}${hasAnimals? " • Klik untuk hewan":""}`, { sticky:true });

  layer.on({
    mouseover: e => e.target.setStyle({ weight:1.8, fillOpacity: Math.max(0.3, (e.target.options.fillOpacity||0.15)) }),
    mouseout: e => { if(countriesLayer && typeof countriesLayer.resetStyle==="function") countriesLayer.resetStyle(e.target); },
    click: ()=> {
      if(!iso){ toast("Negara tidak teridentifikasi di dataset."); return; }
      if(!hasAnimals){
        selectedCountryIso = iso; state.countryIso = iso; setFlagSwatch(iso);
        els.countrySelect.value = iso; render(); fitCountryBounds(iso);
        toast("Belum ada data hewan darat khusus negara ini."); return;
      }
      selectCountry(iso);
    }
  });
}
function fitCountryBounds(iso){
  const layer = countryLayerByIso[iso];
  if(layer && typeof layer.getBounds==="function"){
    const bounds = layer.getBounds();
    if(bounds && bounds.isValid()) map.fitBounds(bounds.pad(0.3), { maxZoom:5.8 });
  }
}
function selectCountry(iso){
  selectedCountryIso = iso;
  state.countryIso = iso;
  setFlagSwatch(iso);
  if(els.countrySelect.value !== iso) els.countrySelect.value = iso;
  render();
  if(countriesLayer && typeof countriesLayer.setStyle==="function"){ countriesLayer.setStyle(styleCountry); }
  fitCountryBounds(iso);
}

/* ISO util */
function getISO2(feature){
  const props = feature && feature.properties || {};
  let iso = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.code || props.id || "";
  if(typeof iso === "number") iso = String(iso);
  if(iso && iso.length===2) return iso.toUpperCase();
  const name = (getName(feature) || "").toLowerCase();
  if(NAME_ALIASES[name]) return NAME_ALIASES[name];
  return "";
}
function getName(feature){
  const props = feature && feature.properties || {};
  return props.ADMIN || props.name || props.NAME || props.NAME_LONG || props.Country || "";
}

/* Fallback bbox */
const FALLBACK_BBOX = {
  IN:[[8,68],[36,97]], RU:[[45,30],[75,170]], ID:[[-11,95],[6,141]], BD:[[20,88],[27,93]], NP:[[26,80],[31,88]],
  MM:[[9,92],[28,101]], TH:[[5,97],[21,106]], LA:[[14,100],[22,107]], KH:[[10,102],[15,107]], VN:[[8,103],[24,110]], CN:[[18,73],[54,135]],
  KE:[[-5,34],[5,42]], TZ:[[-12,29],[-1,41]], UG:[[-2,29],[5,35]], ZA:[[-35,16],[-22,33]], BW:[[-26,20],[-17,29]], NA:[[-29,12],[-16,25]],
  ZM:[[-18,22],[-8,34]], MZ:[[-26,31],[-10,41]], LK:[[5,79],[10,82]], MY:[[1,99],[7,120]], AU:[[-45,113],[-10,154]],
  JP:[[30,129],[46,146]], GB:[[50,-8],[59,2]], FR:[[42,-5],[51,8]], DE:[[47,5],[55,16]], PL:[[49,14],[55,24]],
  NO:[[58,4],[71,31]], SE:[[55,11],[69,24]], FI:[[60,20],[70,32]],
  US:[[25,-125],[49,-66]], CA:[[42,-141],[83,-52]],
  SA:[[16,34],[32,56]], AE:[[22,51],[26,56]], OM:[[16,52],[26,60]], DZ:[[19,-9],[37,12]], MR:[[15,-17],[27,-4]], EG:[[22,25],[32,36]],
  BR:[[-34,-74],[6,-34]], CO:[[ -4,-79],[13,-66]], VE:[[0,-73],[12,-59]], PE[[-18,-82],[-1,-68]], BO[[-23,-70],[-9,-57]],
  PY[[-27,-63],[-19,-54]], AR[[-55,-73],[-21,-53]], CD[[-13,12],[5,32]], CZ[[48.5,12],[51.2,19]],
  BT[[26.5,88],[28.5,92]], PK[[23,60],[37,78]]
};
function buildFallbackCountryRects(){
  Object.entries(FALLBACK_BBOX).forEach(([iso,bbox])=>{
    const rect = L.rectangle(bbox, styleByIso(iso,false)).addTo(countriesLayer);
    countryLayerByIso[iso] = rect;
    const name = COUNTRY_NAMES[iso] || iso;
    const hasAnimals = !!COUNTRY_ANIMALS[iso];
    rect.bindTooltip(`${isoToFlagEmoji(iso)} ${name}${hasAnimals? " • Klik untuk hewan":""}`, { sticky:true });
    rect.on("mouseover", ()=> rect.setStyle(styleByIso(iso,true)));
    rect.on("mouseout", ()=> rect.setStyle(styleByIso(iso,false)));
    rect.on("click", ()=>{
      if(!hasAnimals){
        selectedCountryIso = iso; state.countryIso = iso; setFlagSwatch(iso);
        els.countrySelect.value = iso; render(); fitCountryBounds(iso);
        toast("Belum ada data hewan darat khusus negara ini."); return;
      }
      selectCountry(iso);
    });
  });
}
function styleByIso(iso, hover){
  const cols = FLAG_COLORS[iso] || null;
  const inDataset = !!COUNTRY_ANIMALS[iso];
  const fillColor = cols ? cols[0] : (inDataset ? "#4c6ef5" : "#222631");
  const color = cols ? (cols[1] || cols[0]) : "#5a6270";
  const weight = (selectedCountryIso===iso || hover) ? 1.8 : 0.6;
  const fillOpacity = (selectedCountryIso===iso || hover) ? 0.38 : (inDataset ? 0.22 : 0.08);
  return { color, weight, fillColor, fillOpacity };
}

/* Events */
els.search.addEventListener("input", e => { state.query = e.target.value.trim(); render(); });
els.clearSearchBtn.addEventListener("click", ()=>{ state.query=""; els.search.value=""; render(); });
els.sort.addEventListener("change", e => { state.sort = e.target.value; render(); });

els.density.addEventListener("click", ()=>{
  state.dense = !state.dense;
  document.documentElement.style.setProperty("--radius-xl", state.dense ? "16px":"22px");
  document.documentElement.style.setProperty("--radius-md", state.dense ? "10px":"14px");
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
document.addEventListener("click", e=>{
  if(e.target.matches('[data-clear="country"]')) clearCountryFilter();
  if(e.target.matches('[data-clear="search"]')){ state.query=""; els.search.value=""; render(); }
});

function clearCountryFilter(){
  state.countryIso=""; selectedCountryIso=""; els.countrySelect.value="";
  setFlagSwatch(""); render();
  if(countriesLayer && typeof countriesLayer.setStyle==="function") countriesLayer.setStyle(styleCountry);
  fitAllBounds(); updateCountryPanel();
}

els.viewMode.addEventListener("change", ()=> applyView(els.viewMode.value));

document.body.addEventListener("click", e=>{ if(e.target.matches("[data-close], .modal-backdrop")) closeModal(); });
window.addEventListener("keydown", e=>{
  const tag = (document.activeElement && document.activeElement.tagName)||"";
  if(e.key==="Escape"){ closeModal(); return; }
  if(e.key==="/" && !["INPUT","TEXTAREA","SELECT"].includes(tag)){ e.preventDefault(); els.search.focus(); }
});

/* Toast */
let toastTimer;
function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.remove("hidden");
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> els.toast.classList.remove("show"), 1700);
}

/* Init */
document.addEventListener("DOMContentLoaded", ()=>{
  applyView(state.view || "cards");
  buildCountrySelect();
  render();
  initMap();
  if(state.countryIso){ setFlagSwatch(state.countryIso); els.countrySelect.value = state.countryIso; }
});
