/**
 * 
 * @param {String} tit -- Title of your goal
 * @param {String} description -- Short description of your goal
 * @param {HTMLElement} layout -- The parent element that the card needs to append to.
 */

export default function renderCard(tit, description, layout) {
    /**-------------------------------------- */
    const card = document.createElement("div");
    card.setAttribute("class", "cards");

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

    const descriptionCnt = document.createElement("div");
    descriptionCnt.setAttribute("class", "des");
    card.appendChild(descriptionCnt);

    const descriptionTitle = document.createElement("p");
    descriptionTitle.setAttribute("class", "desc2");
    descriptionTitle.innerText = description;
    descriptionCnt.appendChild(descriptionTitle);


    const btnCnt = document.createElement("div");
    btnCnt.setAttribute("class", "btn_cnt");
    card.appendChild(btnCnt);

    const subGoalBtn = document.createElement("button");
    subGoalBtn.setAttribute("class", "sbtn");
    subGoalBtn.setAttribute("id", `sub_${layout.childElementCount}`);
    subGoalBtn.innerText = "Sub Goal"

    btnCnt.appendChild(subGoalBtn);

    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "btn");
    completeBtn.innerText = "Complete";
    btnCnt.appendChild(completeBtn);
}