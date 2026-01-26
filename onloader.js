
import renderCard from "./render_card.js";
const layout = document.getElementById("grid_layout");


window.addEventListener("load", () => {

    let dataLength = localStorage.length;

    for (let i = 0; i < dataLength; i += 1) {

        let finalcard = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let saveRTime = finalcard.time

        //creating the cards
        renderCard(finalcard.title, finalcard.description, layout, `${finalcard.cardId}`, saveRTime);
        let onset = document.getElementById(`set_${finalcard.cardId}`);

        if (finalcard.isOnSet) {

            onset.classList.remove("on_set")
            onset.classList.add("on_set_active");

        } else {

            onset.classList.add("on_set");
            onset.classList.remove("on_set_active");

        }

    }

    /* Object.keys(finalCard).forEach(key => {
         let saveRTime = finalCard[`${key}`].time;
 
     })
         */

})