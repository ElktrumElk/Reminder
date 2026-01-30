import renderCard from "./render_card.js";

const addGoalTitle = document.getElementById("agtitle");
const addGoalDes = document.getElementById("agdes");
const addSubGoal = document.getElementById("add_sub_g_btn");
const subGoalsCnt = document.getElementById("sub_goals_cnt_p");
const subGoalList = document.getElementById("sub_goals_cnt_pp");
const reminderTime = document.getElementById("r_time");
const cancel = document.getElementById("cancel");
const done = document.getElementById("done");

/**
 * The addFrame is an HTMLDivElement which purpose is to serve as a panel for users to add new goals
 */
const addFrame = document.getElementById("addFrame");

/**
 * The main web application of it self that contains the headers, the reminder cards and
 */
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

        //Comment: set time out for the main body for transition to work the set it display to none
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

    /**Comment: Show the container when a subgaol is added if no subgoal the container display is set to none */
    subGoalsCnt.style.display = "flex";

    /*==================CREATION============================== */
    /**Create the list of the goal that needs to be added */
    const newGoal = document.createElement("li");
    newGoal.setAttribute("class", "sub_list");
    isSubgoals = true;

    /**Creates the input for user to enter their subgoal */
    const inp = document.createElement("input");
    inp.setAttribute("class", "sub_title");
    inp.placeholder = "Sub Goal";

    //Comment: Append it to the newGoal container.
    newGoal.appendChild(inp);
    subGoalList.appendChild(newGoal);


    /*=================DELETE ADDED GOAL SECTION IN THE addFrame=================== */

    /**The goals added to the newGoal frames in the addFrame */
    let goals = document.querySelectorAll(".sub_list");

    let startX = 0;
    let currentX = 0;

    /*Flags */
    let istouched = false;
    let del = false;



    goals.forEach(goal => {

        goal.addEventListener("touchstart", (e) => {

            let currentX = e.touches[0].clientX;
            let tgt = e.target;
            let tgWidth = tgt.getBoundingClientRect().width;

            let START_THRESHOLD = 10;

            let del = false;

            //Comment: target touch position. if The position is not meet then delete animation and function won't be triggered
            if (currentX < tgWidth - START_THRESHOLD) {

                istouched = false;
                return;

            }

            istouched = true;

        });

        goal.addEventListener("touchmove", (e) => {

            if (!istouched) return;

            currentX = e.touches[0].clientX; //current touch position
            
            /**How far the touch position has moved from it original point to another point */
            let deltaX = currentX - startX;

            /**The width of the target list that user wants to delete */
            let tgWidth = goal.getBoundingClientRect().width;

            /**
             * If the deltaX is less than the target width then the delete function will be triggered
             * And this allows user to set the del boolean to true if touch position is moving along the negative X-axis(right -> left);
             * 
             */
            if (deltaX < tgWidth) {

                del = true;

                //Comment: moves the target goal along the touch posistion in the negative X-axis
                goal.style.transform = `translateX(${deltaX - tgWidth}px)`; 

            }

        });

        goal.addEventListener("touchend", () => {

            /**Check if user did touch and the delete was deltaX reaches the delete poition */
            if (istouched && del) {

                //Comment: The end threshold is basically the point where the current position must be less than to prevent left to right delete
                let END_THRESHOLD = 250; 

                istouched = false;

                goal.style.transition = `transfrom 0.3s ease`;

                if (currentX < END_THRESHOLD) {

                    requestAnimationFrame(() => {

                        goal.style.transform = `translateX(-130%)`;
                    });

                    setTimeout(() => {

                        goal.remove();

                        //Comment: Checks if the subGoalList contains and newgoal list if not then is display will be set to none
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

    //Comment: generate a unique id for each object
    let uniqueId = `${crypto.randomUUID()}`;

    let tit = addGoalTitle.value;
    let description = addGoalDes.value;
    let r_time = reminderTime.value;


    if (isSubgoals) {
        const subGoalsContainer = document.getElementById("sub_goals_cnt_pp");

        const inpt = document.querySelectorAll(".sub_title");

        inpt.forEach(input => {

            console.log(input.value); //debugging 
            subGoalsValue.push(input.value);

        })
    }

    if (tit === "" || description === "" || r_time === "") { alert("complete the information"); return };

    //Comment: This render the template cards
    renderCard(tit, description, layout, uniqueId, r_time);

    //Comment: Save information
    saveInfo(tit, description, subGoalsValue, uniqueId, r_time);

    //Comment: Clear the array
    subGoalsValue = [];

    closeF(); //calling f
});


/**Collects the information and saved it in the info object in your browser localstorage*/
function saveInfo(tit, description, subGoalsValue, id, tim) {

    let info = {

        cardId: id,
        title: tit,
        description: description,
        subGoals: [],
        isOnSet: false,
        isComplete: false,
        isSubGoalsCompleteCount: 0,
        isSubGoalsCompleted: [],
        time: tim

    }

    info["subGoals"] = subGoalsValue;

    /**
     * Depricated
     * mainDict[`sub_${id}`] = info;
     * 
     */

    localStorage.setItem(`${id}`, JSON.stringify(info));
    subGoalsValue = [];

}