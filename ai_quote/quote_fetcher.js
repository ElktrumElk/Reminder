const quoteboard = document.getElementById("quote");
const nameOfAuhter = document.getElementById("name");
const source = document.getElementById("source");

const prevBtn = document.getElementById("prev");
const fetchBtn = document.getElementById("fetch");

fetchBtn.addEventListener("click", async () => {

    const res = await fetch("http://169.254.32.23:3000/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
   nameOfAuhter.innerText = data.Quoter;
   quoteboard.innerText = data.Quote;
   source.innerText = data.source;

})