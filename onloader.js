import renderCard from "./render_card.js";
const layout = document.getElementById("grid_layout");


window.addEventListener("load", () => {

    let dataLength = localStorage.length;

    for (let i = 0; i < dataLength; i += 1) {

        let finalcard = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let saveRTime = finalcard.time

        //creating the cards
        renderCard(finalcard.title, finalcard.description, layout, `${finalcard.cardId}`, saveRTime);
        

    }

    /* Object.keys(finalCard).forEach(key => {
         let saveRTime = finalCard[`${key}`].time;
 
     })
         */

})