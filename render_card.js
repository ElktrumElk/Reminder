/**
 * 
 * @param {String} tit - Title of your goal
 * @param {String} description - Short description of your goal
 * @param {HTMLElement} layout - The parent element that the card needs to append to.
 * @param {string} uniqueId - Id that is to be associated with the card
 * @param {Date} time - Id that is to be associated with the card
 */

export default function renderCard(tit, description, layout, uniqueId, rtime) {

    /**-------------------------------------- */

    const card = document.createElement("div");
    card.setAttribute("class", "cards");
    card.setAttribute("dataset-id", `${uniqueId}`);


    if (layout.children.length === 0) {
        layout.appendChild(card);
    }
    else {

        layout.insertBefore(card, layout.firstChild);
    }

    const titleSec = document.createElement("div");
    titleSec.setAttribute("class", "remind_topic_cnt");
    card.appendChild(titleSec);


    //the onset radio button
    const onSetBtn = document.createElement("div");
    onSetBtn.setAttribute("class", "on_set");
    titleSec.appendChild(onSetBtn);

    //The card goal title 
    const cardTitle = document.createElement("h3");
    cardTitle.setAttribute("class", "r_title");
    cardTitle.innerText = tit;
    titleSec.appendChild(cardTitle);

    //time indicator
    const timeSet = document.createElement("span");
    timeSet.setAttribute("class", "time_set");
    timeSet.innerText = rtime;
    titleSec.appendChild(timeSet);

    //option for cards
    const cardOption = document.createElement("span");
    cardOption.setAttribute("class", 'card_options');
    cardOption.innerHTML = "&#8942;";
    titleSec.appendChild(cardOption);

    //Description
    const descriptionCnt = document.createElement("div");
    descriptionCnt.setAttribute("class", "des");
    card.appendChild(descriptionCnt);

    const descriptionTitle = document.createElement("p");
    descriptionTitle.setAttribute("class", "desc2");
    descriptionTitle.setAttribute("dataset-id", `${uniqueId}`);
    descriptionTitle.innerText = description;
    descriptionCnt.appendChild(descriptionTitle);


    const btnCnt = document.createElement("div");
    btnCnt.setAttribute("class", "btn_cnt");
    card.appendChild(btnCnt);

    const subGoalBtn = document.createElement("button");
    subGoalBtn.setAttribute("class", "sbtn");
    subGoalBtn.setAttribute("id", `sub_${uniqueId}`);
    subGoalBtn.innerText = "Sub Goal"

    btnCnt.appendChild(subGoalBtn);

    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "btn");
    completeBtn.innerText = "Complete";
    btnCnt.appendChild(completeBtn);
}


export function subGoalCard({ layout = "", title = "", description = "", rtime = "1:00", isAppend = null}) {

    const card = document.createElement("div");
    card.setAttribute("class", "cards2");
    card.setAttribute("id", "card2");

    layout.appendChild(card);

    const titleSec = document.createElement("div");
    titleSec.setAttribute("class", "remind_topic_cnt");
    card.appendChild(titleSec);

    //The card goal title 
    const cardTitle = document.createElement("h3");
    cardTitle.setAttribute("class", "r_title");
    cardTitle.innerText = "Title: " + title;
    titleSec.appendChild(cardTitle);

    //time indicator
    const timeSet = document.createElement("span");
    timeSet.setAttribute("class", "time_set");
    timeSet.innerText = rtime;
    titleSec.appendChild(timeSet);

    //Description
    const descriptionCnt = document.createElement("div");
    descriptionCnt.setAttribute("class", "des2");
    card.appendChild(descriptionCnt);

    const descriptionTitle = document.createElement("p");
    descriptionTitle.setAttribute("class", "desc3");
    descriptionTitle.innerText = "Task: " + description;
    descriptionCnt.appendChild(descriptionTitle);
 
    const sub = 

    if (isAppend != null) {
        card.appendChild(isAppend)
    }

}