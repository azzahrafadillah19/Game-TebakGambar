const gambar = document.getElementById("gambar");
const jawabanInput = document.getElementById("jawaban");
const pesan = document.getElementById("pesan");
const skorEl = document.getElementById("skor");
const kesempatanEl = document.getElementById("kesempatan");

let skor = 0;
let kesempatan = 5;
let hewanSekarang = "";
let jenisSekarang = ""; // "dog" atau "cat"

// daftar ras
const dogBreeds = {
    husky: "Husky",
    pug: "Pug",
    akita: "Akita",
};

const catBreeds = {
    beng: "Bengal",
    siam: "Siamese",
    pers: "Persian",
};

function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}

// ambil gambar random
async function nextSoal() {
    pesan.textContent = "";
    jawabanInput.value = "";

    let isDog = Math.random() > 0.5; // 50% chance
    jenisSekarang = isDog ? "dog" : "cat";

    if (isDog) {
        const breed = getRandomKey(dogBreeds);
        hewanSekarang = dogBreeds[breed];
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await res.json();
        gambar.src = data.message;
    } else {
        const breed = getRandomKey(catBreeds);
        hewanSekarang = catBreeds[breed];
        const res = await fetch(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`
        );
        const data = await res.json();
        gambar.src = data[0].url;
    }
}
// tampilkan jawaban di console (untuk mentor/guru)
console.log("Jawaban yang benar:", hewanSekarang);

// cek jawaban
function cekJawaban() {
    const jawaban = jawabanInput.value.trim().toLowerCase();
    if (!jawaban) return;

    if (jawaban === hewanSekarang.toLowerCase()) {
        skor++;
        pesan.textContent = `✅ Benar! Itu ${hewanSekarang}`;
        pesan.className = "text-success font-weight-bold";
    } else {
        kesempatan--;
        pesan.textContent = `❌ Salah! Itu ${hewanSekarang}`;
        pesan.className = "text-danger font-weight-bold";
    }

    skorEl.textContent = skor;
    kesempatanEl.textContent = kesempatan;

    if (kesempatan <= 0) {
        alert("Game Over! Skor akhir: " + skor);
        skor = 0;
        kesempatan = 5;
        skorEl.textContent = skor;
        kesempatanEl.textContent = kesempatan;
    }
}

// mulai game
nextSoal();
