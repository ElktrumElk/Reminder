
import renderCard from "./render_card.js";
const layout = document.getElementById("grid_layout");

window.addEventListener("load", () => {

    let dataLength = localStorage.length;

    for (let i = 0; i < dataLength; i += 1) {

        let finalcard = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let saveRTime = finalcard.time;

        //creating the cards
        renderCard(finalcard.title, finalcard.description, layout, `${finalcard.cardId}`, saveRTime);
        
        //Comment: Get the onSet radio created buttons
        let onset = document.getElementById(`set_${finalcard.cardId}`);
    
        //Comment: Check if las onset from the localstorage is true and fi then activate the onset
        if (finalcard.isOnSet) {

            onset.classList.remove("on_set")
            onset.classList.add("on_set_active");
            onset.setAttribute("data-state", "active");


        } else {

            onset.classList.add("on_set");
            onset.classList.remove("on_set_active");
            onset.setAttribute("data-state", "unactive");

        }

    }

    /* Object.keys(finalCard).forEach(key => {
         let saveRTime = finalCard[`${key}`].time;
 
     })
         */

})