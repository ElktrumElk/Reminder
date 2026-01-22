

const subGBtn = document.getElementById("sB");
const subGFrame = document.getElementById("subframe");
const back = document.getElementById("goBack");

let isSGFrame = false;


/**
 * 
 * @param {HTMLElement} node 
 */


subGBtn.addEventListener("click", () => {

    if (!isSGFrame) {
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
        isSGFrame = true;
    }
});

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

    }
});

