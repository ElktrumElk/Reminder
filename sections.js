const allBtn = document.getElementById("all");
const onSetBtn = document.getElementById("onset");
const completeBtn = document.getElementById("complete");

onSetBtn.addEventListener("click", () => {
    const layt = document.getElementById("grid_layout");

    Array.from(layt.children).forEach(child => {
        let _isOnSet = JSON.parse(localStorage.getItem(`${child.getAttribute("dataset-id")}`))?.["isOnSet"];

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