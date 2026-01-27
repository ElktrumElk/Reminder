const allBtn = document.getElementById("all");
const onSetBtn = document.getElementById("onset");
const completeBtn = document.getElementById("complete");

onSetBtn.addEventListener("click", () => {
    const layt = document.getElementById("grid_layout");
    
    Array.from(layt.children).forEach(child => {
        console.log(child)
        if (child.getAttribute("data-state") === "active") {
            child.style.display = "";
        } else {
            child.style.display = "none";
        }
    });
});