const teams = [
    { name: "Angleterre", flag: "images/angleterre.png", start: 1 },
    { name: "France", flag: "images/france.png", start: 12 },
    { name: "Espagne", flag: "images/espagne.png", start: 23 },
    { name: "Allemagne", flag: "images/allemagne.png", start: 34 },
    { name: "Portugal", flag: "images/portugal.png", start: 45 }
];

let currentTeam = 0;

const teamName = document.getElementById("team-name");
const navFlag = document.getElementById("nav-flag");
const navTeam = document.getElementById("nav-team");
const leftGrid = document.getElementById("left-grid");
const rightGrid = document.getElementById("right-grid");
const countryMenu = document.getElementById("country-menu");
const teamSelector = document.getElementById("team-selector");
const prevTeam = document.getElementById("prev-team");
const nextTeam = document.getElementById("next-team");

function getStickerImage(id){
    if(id <= 11) return `images/Stickers_ANG/${id}.png`;
    if(id <= 22) return `images/Stickers_FRA/${id}.png`;
    if(id <= 33) return `images/Stickers_ESP/${id}.png`;
    if(id <= 44) return `images/Stickers_ALL/${id}.png`;
    return `images/Stickers_POR/${id}.png`;
}

function getPlacedStickers(){
    return JSON.parse(localStorage.getItem("placedStickers")) || [];
}

function savePlacedStickers(stickers){
    localStorage.setItem("placedStickers", JSON.stringify(stickers));
}

function getMyStickers(){
    return JSON.parse(localStorage.getItem("myStickers")) || [];
}

function saveMyStickers(stickers){
    localStorage.setItem("myStickers", JSON.stringify(stickers));
}

function createSlot(number){
    const slot = document.createElement("div");
    slot.className = "sticker-slot";
    slot.dataset.number = number;

    const placed = getPlacedStickers();
    const selectedSticker = Number(localStorage.getItem("selectedStickerToPlace"));

    if(placed.includes(number)){
        slot.classList.add("filled");
        slot.innerHTML = `
            <img src="${getStickerImage(number)}" alt="Sticker ${number}">
        `;
    }

    if(selectedSticker === number){
        slot.classList.add("ready-to-place");
        slot.title = `Colle le sticker ${number} ici`;
    }

    slot.addEventListener("click", () => {
        const selected = Number(localStorage.getItem("selectedStickerToPlace"));

        if(!selected) return;

        if(selected !== number){
            alert(`Ce n'est pas la bonne case. Le sticker ${selected} doit être collé à l'emplacement ${selected}.`);
            return;
        }

        const myStickers = getMyStickers();
        const hasSticker = myStickers.some(sticker => Number(sticker.id) === selected);

        if(!hasSticker){
            alert("Tu ne possèdes pas ce sticker.");
            return;
        }

        const placedStickers = getPlacedStickers();

        if(!placedStickers.includes(selected)){
            placedStickers.push(selected);
            savePlacedStickers(placedStickers);
        }

        const updatedCollection = myStickers.filter(
            sticker => Number(sticker.id) !== selected
        );

        saveMyStickers(updatedCollection);

        localStorage.removeItem("selectedStickerToPlace");

        slot.classList.remove("ready-to-place");
        slot.classList.add("filled");

        slot.innerHTML = `
            <img src="${getStickerImage(selected)}" alt="Sticker ${selected}">
        `;
    });

    return slot;
}

function createEmblemSlot(team){
    const emblemSlot = document.createElement("div");
    emblemSlot.className = "emblem-slot";

    emblemSlot.innerHTML = `
        <img src="${team.flag}" alt="Écusson ${team.name}">
    `;

    return emblemSlot;
}

function renderTeam(index){
    const team = teams[index];

    teamName.textContent = team.name;

    navFlag.src = team.flag;
    navFlag.alt = `Écusson ${team.name}`;

    navTeam.textContent = team.name;

    leftGrid.innerHTML = "";
    rightGrid.innerHTML = "";

    for(let i = 0; i < 5; i++){
        leftGrid.appendChild(createSlot(team.start + i));
    }

    leftGrid.appendChild(createEmblemSlot(team));

    for(let i = 5; i < 11; i++){
        rightGrid.appendChild(createSlot(team.start + i));
    }
}

function goToPreviousTeam(){
    currentTeam = currentTeam === 0 ? teams.length - 1 : currentTeam - 1;
    renderTeam(currentTeam);
    countryMenu.classList.remove("active");
}

function goToNextTeam(){
    currentTeam = currentTeam === teams.length - 1 ? 0 : currentTeam + 1;
    renderTeam(currentTeam);
    countryMenu.classList.remove("active");
}

prevTeam.addEventListener("click", goToPreviousTeam);
nextTeam.addEventListener("click", goToNextTeam);

teamSelector.addEventListener("click", event => {
    event.stopPropagation();
    countryMenu.classList.toggle("active");
});

teams.forEach((team, index) => {
    const btn = document.createElement("button");
    btn.textContent = team.name;

    btn.addEventListener("click", () => {
        currentTeam = index;
        renderTeam(currentTeam);
        countryMenu.classList.remove("active");
    });

    countryMenu.appendChild(btn);
});

document.addEventListener("click", event => {
    if(
        !teamSelector.contains(event.target) &&
        !countryMenu.contains(event.target)
    ){
        countryMenu.classList.remove("active");
    }
});

const selectedSticker = Number(localStorage.getItem("selectedStickerToPlace"));

if(selectedSticker){
    const teamIndex = teams.findIndex(team =>
        selectedSticker >= team.start &&
        selectedSticker <= team.start + 10
    );

    if(teamIndex !== -1){
        currentTeam = teamIndex;
    }
}

renderTeam(currentTeam);