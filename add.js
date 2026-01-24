import renderCard from "./render_card.js";

const addGoalTitle = document.getElementById("agtitle");
const addGoalDes = document.getElementById("agdes");
const addSubGoal = document.getElementById("add_sub_g_btn");
const subGoalsCnt = document.getElementById("sub_goals_cnt_p");
const subGoalList = document.getElementById("sub_goals_cnt_pp");
const reminderTime = document.getElementById("r_time");
const cancel = document.getElementById("cancel");
const done = document.getElementById("done");
const addFrame = document.getElementById("addFrame");


const mainApp = document.getElementById("mainapp");

const addBtn = document.getElementById("add");
const layout = document.getElementById("grid_layout");
const cardLaout = document.getElementById("card");

/*Flags*/
let isAddFrame = false;

/*Comment: display the add frame */
addBtn.addEventListener("click", () => {

    if (!isAddFrame) {
        //Comment: display the frame
        addFrame.style.display = "flex";
        addFrame.style.position = "fixed";

        //Comment: Add a requestAnimationFrame to set delay for transition to works
        requestAnimationFrame(() => {

            addFrame.style.transform = "translateX(0%)";
            mainApp.style.transform = "translateX(-120%)";

        });

        //Comment: set time out for the main body transition to work the set it display to none
        setTimeout(() => {
            mainApp.style.display = "none";
            addFrame.style.position = "";

        }, 400);

        isAddFrame = true;
    }
});


/**
 * closeF function closes the add frame
 */
function closeF() {

    mainApp.style.display = "flex";

    mainApp.style.transform = "translateX(0%)";
    addFrame.style.transform = "translateX(100%)";

    addFrame.style.position = "fixed";

    setTimeout(() => {

        //Comment: display the frame
        addFrame.style.display = "";

    }, 400);

    addGoalDes.value = "";
    addGoalTitle.value = "";
    isAddFrame = false
}

cancel.addEventListener("click", () => {
    if (isAddFrame) {
        closeF();
    }
});

let isSubgoals = false;


addSubGoal.addEventListener("click", () => {

    subGoalsCnt.style.display = "flex"
    const newGoal = document.createElement("li");
    newGoal.setAttribute("class", "sub_list");
    isSubgoals = true;

    const inp = document.createElement("input");
    inp.setAttribute("class", "sub_title");
    inp.placeholder = "Sub Goal";

    newGoal.appendChild(inp);
    subGoalList.appendChild(newGoal);



    let goals = document.querySelectorAll(".sub_list");

    let startX = 0;
    let currentX = 0;
    let istouched = false;
    let del = false;



    goals.forEach(goal => {

        goal.addEventListener("touchstart", (e) => {

            let currentX = e.touches[0].clientX;
            let tgt = e.target;
            let tgWidth = tgt.getBoundingClientRect().width;
            let START_THRESHOLD = 10;
            let del = false;

            if (currentX < tgWidth - START_THRESHOLD) {

                istouched = false;
                return;

            }
            istouched = true;


        });

        goal.addEventListener("touchmove", (e) => {

            if (!istouched) return;


            currentX = e.touches[0].clientX;
            let deltaX = currentX - startX;
            let tgWidth = goal.getBoundingClientRect().width;


            if (deltaX < tgWidth) {
                del = true;
                goal.style.transform = `translateX(${deltaX - tgWidth}px)`;

            }

        });

        goal.addEventListener("touchend", () => {
            if (istouched && del) {


                let END_THRESHOLD = 250;

                istouched = false;

                goal.style.transition = `transfrom 0.3s ease`;
                console.log(currentX)

                if (currentX < END_THRESHOLD) {

                    requestAnimationFrame(() => {

                        goal.style.transform = `translateX(-130%)`;
                    });

                    setTimeout(() => {
                        goal.remove();
                        console.log(subGoalsCnt.children.length)
                        if (subGoalList.children.length === 0) {
                            subGoalsCnt.style.display = "none";
                            isSubgoals = false;
                        }
                    }, 300)

                } else {

                    requestAnimationFrame(() => {

                        goal.style.transform = `translateX(${0}%)`;
                    });
                }

            }
        })



        /* goal.addEventListener("mouseup", () => {
 
             istouched = true;
         });
 
         goal.addEventListener("mousemove", (e) => {
             if (istouched) {
 
                 let moveX = e.clientX;
                 console.log(moveX);
             }
 
         });
         goal.addEventListener("touchend", () => {
             if (istouched) {
                 istouched = false;
             }
         })*/

    })
})


let subGoalsValue = [];
/**Add the new reminder to the list */
done.addEventListener("click", async () => {

    let tit = addGoalTitle.value;
    let description = addGoalDes.value;

    if (isSubgoals) {
        const subGoalsContainer = document.getElementById("sub_goals_cnt_pp");

        const inpt = document.querySelectorAll(".sub_title");

        inpt.forEach(input => {

            console.log(input.value); //debugging 
            subGoalsValue.push(input.value);

        })
    }

    if (tit === "" || description === "") alert("complete the information"); return;

    //Comment: This render the template cards
    renderCard(tit, description, layout);

    saveInfo(tit, description, subGoalsValue);
    subGoalsValue = [];

    closeF(); //calling f
});


/**Collects the information and saved it in the info object in your browser localstorage*/
function saveInfo(tit, description, subGoalsValue) {

    let savedInfo = localStorage.getItem("info");
    let mainDict = savedInfo ? JSON.parse(savedInfo) : {};

    let info = {

        title: tit,
        description: description,
        subGoals: [],
        isOnSet: false,
        isComplete: false,
        isSubGoalsCompleteCount: 0,
        isSubGoalsCompleted: []

    }

    info["subGoals"] = subGoalsValue;

    mainDict[`sub_${layout.childElementCount}`] = info;

    localStorage.setItem(`info`, JSON.stringify(mainDict));
    subGoalsValue = [];

}