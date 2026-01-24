const subGFrame = document.getElementById("subframe");
const back = document.getElementById("goBack");
const lscont = document.getElementById("listcont");
const layout = document.getElementById("grid_layout");
const mainApp = document.getElementById("mainapp");


let isSGFrame = false;

/**
 * 
 * @param {HTMLElement} node 
 */


layout.addEventListener("click", (e) => {

    if (!isSGFrame) {
        let subGBtn = e.target.closest(".sbtn");
        

        if (subGBtn) {

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
            isSGFrame = true;
        }

    } 
    let otp = e.target.closest(".")
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
        const listrow = document.querySelectorAll(".list_sec");
        const lines = document.querySelectorAll("line");

        lscont.innerHTML = "";

        listrow.forEach(lst => {
            lst.remove();

            lines.forEach(l => {
                l.remove();
            });
        });

    }
});
