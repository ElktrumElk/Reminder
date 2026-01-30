/**
 * The section file serve as a filter file to filter the cards base on their state.
 * The All button displays all the cards, but onSet and complete.
 * WHilse the Onset display the Cards that are onSet.
 * Complte display Cards that are complete
 */

const allBtn = document.getElementById("all");
const onSetBtn = document.getElementById("onset");
const completeBtn = document.getElementById("complete");


onSetBtn.addEventListener("click", () => {

    /**The grid_layout that holds the cards. */
    const layt = document.getElementById("grid_layout");

    Array.from(layt.children).forEach(child => {
        let _isOnSet = JSON.parse(localStorage.getItem(`${child.getAttribute("dataset-id")}`))?.["isOnSet"];

        //Comment: Filter
        if (_isOnSet) {
            child.style.display = "";
        } else {
            child.style.display = "none";
        }
    });
});

allBtn.addEventListener("click", () => {
    const layt = document.getElementById("grid_layout");

    Array.from(layt.children).forEach(child => {
        child.style.display = "";
    });
})