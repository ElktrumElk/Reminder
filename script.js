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


            let inf = JSON.parse(localStorage.getItem("info"))?.[`${e.target.id}`];



            if (e.target == cardClick) {


                inf = JSON.parse(localStorage.getItem("info"))?.[`sub_${e.target.getAttribute("dataset-id")}`];

            }

            if (inf) {

                let arr = inf.subGoals;

                let i = 0;



                arr.forEach(info => {

                    const listRow = document.createElement("div");
                    listRow.setAttribute("class", "list_sec");

                    const radioBtn = document.createElement("div");
                    radioBtn.setAttribute("class", "radioComplete");

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

    if (onSet) {

        if (onSet.classList.contains("on_set")) {

            onSet.classList.remove("on_set");
            onSet.classList.add("on_set_active");
            console.log("ok")

        }
    }
    else if (onSetUnactive) {

        if (onSetUnactive.classList.contains("on_set_active")) {
            onSetUnactive.classList.remove("on_set_active");
            onSetUnactive.classList.add("on_set");
            console.log("yup")
        }
    }
});


layout.addEventListener("dblclick", (e) => {

    X
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


function animateDelete() {

    objectToDelete.style.transform = "translateX(-100%)";
    objectToDelete.style.opacity = ".1";

    setTimeout(() => {

        objectToDelete.remove();

    }, 600)
}


deletBtn.addEventListener("click", () => {

    console.log(isObjectDataTODelete);
    let data = JSON.parse(localStorage.getItem("info"))

    delete data[`sub_${isObjectDataTODelete}`];

    localStorage.setItem("info", JSON.stringify(data));

    animateDelete();
    closeOptions();

});

closeBtn.addEventListener("click", () => {
    closeOptions();
});