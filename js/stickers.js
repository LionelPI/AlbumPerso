const grid = document.getElementById("stickers-grid");

function getMyStickers(){
    return JSON.parse(localStorage.getItem("myStickers")) || [];
}

function getPlacedStickers(){
    return JSON.parse(localStorage.getItem("placedStickers")) || [];
}

function renderMyStickers(){
    const myStickers = getMyStickers();
    const placedStickers = getPlacedStickers();

    grid.innerHTML = "";

    const availableStickers = myStickers.filter(sticker => {
        return !placedStickers.some(id => Number(id) === Number(sticker.id));
    });

    if(availableStickers.length === 0){
        grid.innerHTML = `
            <p class="empty-message">
                Aucun sticker disponible. Ouvre des packs pour en obtenir.
            </p>
        `;
        return;
    }

    availableStickers.forEach(sticker => {
        const card = document.createElement("div");
        card.className = "my-sticker";

        card.innerHTML = `
    <img src="${sticker.image}" alt="Sticker ${sticker.id}">

    <button class="add-btn" data-id="${sticker.id}">
        +
    </button>
`;

        grid.appendChild(card);
    });
}

document.addEventListener("click", event => {
    if(!event.target.classList.contains("add-btn")) return;

    const stickerId = Number(event.target.dataset.id);

    localStorage.setItem("selectedStickerToPlace", stickerId);

    window.location.href = "album.html";
});

renderMyStickers();