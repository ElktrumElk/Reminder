import renderCard from "./render_card.js";
import { subGoalCard } from "./render_card.js";

const subGFrame = document.getElementById("subframe");
const back = document.getElementById("goBack");
const lscont = document.getElementById("listcont");
const layout = document.getElementById("grid_layout");
const mainApp = document.getElementById("mainapp");
const panel = document.getElementById("opt_panel");
const deletBtn = document.getElementById("delete_card");
const closeBtn = document.getElementById("cls_btn");


//flags
let isOption = false;

let isSGFrame = false;

/**
 * 
 * @param {String} disp -- CSS display property value is needed here
 * @param {Number} scale -- CSS tranformation scale is needed and value should be number
 * @param {Boolean} bool 
 */

function animateOption(disp, scale, bool, e) {
    panel.style.display = disp;


    requestAnimationFrame(() => {

        panel.style.transform = `scale(${scale})`;

    });

    let positionY = e.pageY;
    let positionX = e.pageX - 160;


    isOption = bool;
    if (window.screen.availWidth > 480) {

        panel.style.top = positionY + "px";
        panel.style.left = positionX + "px";
        panel.style.scale = .8

    } else {
        panel.style.top = positionY + "px";
        panel.style.left = "";
        panel.style.scale = "";
    }
}

/**open the option panel */
function displayOptions(e) {

    if (!isOption) {

        animateOption("flex", 1, true, e);

    } else {

        //Comment: close the option panel 
        closeOptions();

        //re-open the option panel
        setTimeout(() => {

            animateOption("flex", 1, true, e);

        }, 300)
    }
}


/** Close the card option panel */
function closeOptions() {

    if (isOption) {

        panel.style.transform = "scale(0)";

        setTimeout(() => {
            panel.style.display = "none";
        }, 200)

        isOption = false;
    }
}

//flags
let objectToDelete; //holds the current card
let isObjectDataTODelete;

//close on scroll
document.addEventListener("scroll", () => closeOptions());

function alrt() {
    alert("hello");
}
/**
 * 
 * @param {HTMLElement} node 
 */

layout.addEventListener("click", (e) => {

    if (!isSGFrame) {
        let subGBtn = e.target.closest(".sbtn");
        let cardClick = e.target.closest(".desc2");


        if (subGBtn || cardClick) {

            subGFrame.style.display = "flex";
            subGFrame.style.position = "fixed";


            requestAnimationFrame(() => {

                subGFrame.style.transform = "translateX(0%)";
                mainApp.style.transform = "translateX(120%)";

            });

            setTimeout(() => {

                mainApp.style.display = "none";
                subGFrame.style.position = "";

            }, 600);


            let inf = JSON.parse(localStorage.getItem(`${e.target.id.slice(4)}`));

            //This prevent conflicts between the sub goal button and the onset button
            if (e.target == cardClick) {
                inf = JSON.parse(localStorage.getItem(`${e.target.getAttribute("dataset-id")}`)); //redeclare
            }

            if (inf) {

                //init: retrieving the information
                let arr = inf.subGoals;
                let i = 0;



                arr.forEach(info => {

                    const listRow = document.createElement("div");
                    listRow.setAttribute("class", "list_sec");

                    const radioBtn = document.createElement("div");

                    //Comment: set a dataset for accessability
                    radioBtn.setAttribute("data-id", `${inf.cardId}`);

                    let data = JSON.parse(localStorage.getItem(`${radioBtn.getAttribute("data-id")}`));

                    radioBtn.setAttribute("class", "radioComplete");

                    radioBtn.addEventListener("click", () => {

                        let data = JSON.parse(localStorage.getItem(`${radioBtn.getAttribute("data-id")}`));

                        if (data.isOnSet) {
                        if (radioBtn.classList.contains("radioComplete")) {
                            radioBtn.classList.remove("radioComplete");
                            radioBtn.classList.add("radioCompleted");

                            data["isSubGoalsCompleteCount"] = parseInt(data.isSubGoalsCompleteCount) + 1
                            data["isSubGoalsCompleted"].push(radioBtn.nextElementSibling.innerText);

                            localStorage.setItem(data.cardId, JSON.stringify(data));

                            if (listRow.nextElementSibling !== null) {
                                listRow.nextElementSibling.style.borderColor = "rgb(246, 78, 17)";
                            }

                        } else {
                            radioBtn.classList.remove("radioCompleted");
                            radioBtn.classList.add("radioComplete");

                            if (listRow.nextElementSibling !== null) {
                                listRow.nextElementSibling.style.borderColor = "gray";
                            }

                            data["isSubGoalsCompleteCount"] = parseInt(data.isSubGoalsCompleteCount) - 1;
                            data["isSubGoalsCompleted"] = data["isSubGoalsCompleted"].filter(x => x !== radioBtn.nextElementSibling.innerText);

                            localStorage.setItem(data.cardId, JSON.stringify(data));
                        }
                    }else {
                        alert("Main goal is not set.");
                        return;
                    }

                    })

                    const htag3 = document.createElement("h3");
                    htag3.innerText = info;

                    const line = document.createElement("div");
                    line.setAttribute("class", "line");

                    listRow.appendChild(radioBtn);
                    listRow.appendChild(htag3);

                    if (arr.length === 1) {

                        lscont.appendChild(listRow);
                        i = 0;

                    } else if (arr.length > 1) {
                        if (i > 0) {
                            lscont.appendChild(line);
                        }
                        lscont.appendChild(listRow);
                    }

                    //comment: check if subgaol is part of the completed array
                    if (data.isOnSet) {
                    if (data["isSubGoalsCompleted"].includes(radioBtn.nextElementSibling.innerText)) {
                    
                        radioBtn.classList.remove("radioComplete");
                        radioBtn.classList.add("radioCompleted");

                    } else {

                        radioBtn.classList.remove("radioCompleted");
                        radioBtn.classList.add("radioComplete");
                    }
                }
                    i = 1;

                });
            }
            subGoalCard({

                title: inf.title,
                layout: subGFrame,
                description: inf.description,
                rtime: inf.time,
                isAppend: lscont

            }) // demo creatio

            isSGFrame = true;
        }

    }

    let opt = e.target.closest(".card_options");


    if (opt) {
        objectToDelete = e.target.closest(".cards");
        isObjectDataTODelete = objectToDelete.getAttribute("dataset-id");
        displayOptions(e);
    }

    let onSet = e.target.closest(".on_set");
    let onSetUnactive = e.target.closest(".on_set_active");

    /** Check if onSet button was the target */
    if (onSet) {

        /**Comment: Check if the onset button contains the classList on_set */
        if (onSet.classList.contains("on_set")) {

            onSet.classList.remove("on_set"); //remove on_set
            onSet.classList.add("on_set_active"); //add on_set_active

            let savedInf = JSON.parse(localStorage.getItem(`${onSet.getAttribute("dataset-id")}`));

            if (!savedInf["isOnSet"]) {

                savedInf["isOnSet"] = true;


                try {

                    localStorage.setItem(`${onSet.getAttribute("dataset-id")}`, JSON.stringify(savedInf));
                }
                catch (e) {

                    console.error("An error occure", e);
                }

            }
        }
    }

    else if (onSetUnactive) {

        if (onSetUnactive.classList.contains("on_set_active")) {
            onSetUnactive.classList.remove("on_set_active");
            onSetUnactive.classList.add("on_set");

            let savedInf = JSON.parse(localStorage.getItem(`${onSetUnactive.getAttribute("dataset-id")}`));
            console.log(savedInf)
            if (savedInf["isOnSet"]) {

                savedInf["isOnSet"] = false;


                try {

                    localStorage.setItem(savedInf["cardId"], JSON.stringify(savedInf));
                }
                catch (e) {
                    console.error("An error occure", e)
                }

            }
        }
    }
});

//Go back to main frame
back.addEventListener("click", () => {

    if (isSGFrame) {

        mainApp.style.display = "flex";
        subGFrame.style.position = "fixed";


        requestAnimationFrame(() => {

            mainApp.style.transform = "translateX(0%)";
            subGFrame.style.transform = "translateX(100%)";

        });

        setTimeout(() => {

            subGFrame.style.display = "none";

        }, 600);

        isSGFrame = false;
        const listrow = document.querySelectorAll(".list_sec");
        const lines = document.querySelectorAll("line");
        const cards = document.getElementById("card2");

        lscont.innerHTML = "";

        cards.remove();

        listrow.forEach(lst => {
            lst.remove();

            lines.forEach(l => {
                l.remove();
            });
        });

    }
});


/**
 * Animation for deleted cards
 */
function animateDelete() {

    objectToDelete.style.transform = "translateX(-100%)";
    objectToDelete.style.opacity = ".1";

    setTimeout(() => {

        objectToDelete.remove();

    }, 600)
}


deletBtn.addEventListener("click", () => {

    //debugging
    console.log(isObjectDataTODelete);

    /**Delete the card data from the local storage */
    localStorage.removeItem(`${isObjectDataTODelete}`)

    animateDelete(); //delete animation
    closeOptions(); //close the delete panel after the delete button is pressed

});

closeBtn.addEventListener("click", () => {
    closeOptions();
});