import renderCard from "./render_card.js";
const layout = document.getElementById("grid_layout");


window.addEventListener("load", () => {
    let cardsInfo = localStorage.getItem("info");
    let finalCard = cardsInfo ? JSON.parse(cardsInfo) : {};

    if (Object.keys(finalCard).length === 0) return;

    Object.keys(finalCard).forEach(key => {
        let saveRTime = finalCard[`${key}`].time;

        renderCard(finalCard[`${key}`].title, finalCard[`${key}`].description, layout, key.slice(4), saveRTime);

    })

})