const stickers = [
    ...Array.from({ length: 11 }, (_, i) => ({
        id: i + 1,
        image: `images/Stickers_ANG/${i + 1}.png`
    })),

    ...Array.from({ length: 11 }, (_, i) => ({
        id: i + 12,
        image: `images/Stickers_FRA/${i + 12}.png`
    })),

    ...Array.from({ length: 11 }, (_, i) => ({
        id: i + 23,
        image: `images/Stickers_ESP/${i + 23}.png`
    })),

    ...Array.from({ length: 11 }, (_, i) => ({
        id: i + 34,
        image: `images/Stickers_ALL/${i + 34}.png`
    })),

    ...Array.from({ length: 11 }, (_, i) => ({
        id: i + 45,
        image: `images/Stickers_POR/${i + 45}.png`
    }))
];

const packOptions = document.querySelectorAll(".pack-option");
const bigPack = document.getElementById("big-pack");
const packTitle = document.getElementById("pack-title");
const openPackBtn = document.getElementById("open-pack");
const results = document.getElementById("results");
const resultText = document.getElementById("result-text");
const goToStickersBtn = document.getElementById("go-to-stickers");

let lastOpenedStickers = [];

let selectedPack = {
    name: "PACK DÉBUTANT",
    count: 5,
    image: "images/pack-debutant.png"
};

packOptions.forEach(option => {
    option.addEventListener("click", () => {
        packOptions.forEach(btn => btn.classList.remove("active"));
        option.classList.add("active");

        selectedPack = {
            name: option.querySelector("strong").textContent,
            count: Number(option.dataset.count),
            image: option.querySelector("img").src
        };

        bigPack.src = selectedPack.image;
        packTitle.textContent = selectedPack.name;
    });
});

openPackBtn.addEventListener("click", () => {
    const obtained = [];

    for(let i = 0; i < selectedPack.count; i++){
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        obtained.push(randomSticker);
    }

    lastOpenedStickers = obtained;

    displayResults(obtained);

    resultText.textContent =
        `${obtained.length} stickers obtenus`;
});

function displayResults(obtained){
    results.innerHTML = "";

    obtained.forEach(sticker => {
        const card = document.createElement("div");
        card.className = "sticker-card";

        card.innerHTML = `
            <img src="${sticker.image}" alt="Sticker ${sticker.id}">
        `;

        results.appendChild(card);
    });
}

goToStickersBtn.addEventListener("click", () => {
    if(lastOpenedStickers.length === 0){
        resultText.textContent = "Ouvre d'abord un pack.";
        return;
    }

    const collection = JSON.parse(localStorage.getItem("myStickers")) || [];
    const placedStickers = JSON.parse(localStorage.getItem("placedStickers")) || [];

    let added = 0;
    let discarded = 0;

    lastOpenedStickers.forEach(sticker => {
        const alreadyOwned = collection.some(
            item => Number(item.id) === Number(sticker.id)
        );

        const alreadyPlaced = placedStickers.some(
            id => Number(id) === Number(sticker.id)
        );

        if(!alreadyOwned && !alreadyPlaced){
            collection.push(sticker);
            added++;
        }else{
            discarded++;
        }
    });

    localStorage.setItem("myStickers", JSON.stringify(collection));

    resultText.textContent =
        `${added} nouveau(x) ajouté(s) • ${discarded} doublon(s) jeté(s)`;

    lastOpenedStickers = [];

    setTimeout(() => {
        window.location.href = "stickers.html";
    }, 1000);
});