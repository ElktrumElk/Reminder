const quoteboard = document.getElementById("quote");
const nameOfAuhter = document.getElementById("name");
const source = document.getElementById("source");


const copyBtn = document.getElementById("cpyBtn")
const prevBtn = document.getElementById("prev");
const fetchBtn = document.getElementById("fetch");

const cop = document.getElementById("copy");
const copIc = document.getElementById("cpyIc");

fetchBtn.addEventListener("click", async () => {

    const res = await fetch("http://192.168.137.1:3000/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    nameOfAuhter.innerText = data.Quoter;
    quoteboard.innerText = data.Quote;
    source.innerHTML = `<a href="${data.source}">@${data.web_name}</a>`;
    profileImage.innerText = data.Quoter[0];
})

let isCop = false;
copyBtn.addEventListener("click", () => {

    const quoteText = document.getElementById("quote").innerText;

    if (!isCop) {
        navigator.clipboard.writeText(quoteText)
            .then(() => {

                cop.innerText = "Coppied";
                isCop = true;
                copIc.width = "30"
                copIc.src = "./coppied.webp"

                setTimeout(() => {

                    cop.innerText = "Copy"
                    copIc.src = "./5785292.png"
                    copIc.width = "20"

                    isCop = false;

                }, 1000);


            })
            .catch((e) => {
                console.error("An error occurr", e);
            });
    }
});
