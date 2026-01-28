const quoteboard = document.getElementById("quote");
const nameOfAuhter = document.getElementById("name");
const source = document.getElementById("source");

const profileImage = document.getElementById("profile");

const prevBtn = document.getElementById("prev");
const fetchBtn = document.getElementById("fetch");

fetchBtn.addEventListener("click", async () => {

    const res = await fetch("http://172.20.10.2:3000/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    nameOfAuhter.innerText = data.Quoter;
    quoteboard.innerText = data.Quote;
    source.innerHTML = `<a href="${data.source}">@${data.web_name}</a>`;
    profileImage.src = data.profile_image;
})