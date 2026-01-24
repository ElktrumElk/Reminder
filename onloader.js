window.addEventListener("load", () => {
    let cardsInfo = localStorage.getItem("info");
    let finalCard = cardsInfo ? JSON.parse(cardsInfo) : {};

    console.log(Object.keys(finalCard).length);

})