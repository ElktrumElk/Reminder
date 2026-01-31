const quoteboard = document.getElementById("quote");
const nameOfAuhter = document.getElementById("name");
const source = document.getElementById("source");

const profileImage = document.getElementById("profile");

const copyBtn = document.getElementById("cpyBtn")
const prevBtn = document.getElementById("prev");
const fetchBtn = document.getElementById("fetch");

const cop = document.getElementById("copy");
const copIc = document.getElementById("cpyIc");


fetchBtn.addEventListener("click", async () => {
    
    const loader = document.getElementById('load');
    loader.style.display = "flex";
    const loaderAnimation = loader.getAnimations()[0];


    fetchBtn.disabled = true;


    fetchBtn.style.backgroundColor = "gray";
    fetchBtn.style.borderColor = "gray";

    loaderAnimation.play();

    const res = await fetch("https://my-quote-api-ivory.vercel.app/api/quotes/random");

    fetchBtn.disabled = false;
    fetchBtn.style.backgroundColor = "";
    fetchBtn.style.borderColor = "";

    loader.style.display = "none";
    loaderAnimation.cancel();


    const data = await res.json();

    nameOfAuhter.innerText = data.author;
    quoteboard.innerText = data.quote;
    source.innerHTML = data.tags[0];
    profileImage.innerText = data.author[0];
})

let isCop = false;
copyBtn.addEventListener("click", () => {

    const quoteText = document.getElementById("quote").innerText;

    if (!isCop) {
        navigator.clipboard.writeText(quoteText)
            .then(() => {

                cop.innerText = "Coppied";
                isCop = true;
                copIc.width = "30";
                copIc.src = "../../icons/coppied.webp";

                setTimeout(() => {

                    cop.innerText = "Copy";
                    copIc.src = "../../icons/copy.png";
                    copIc.width = "20";

                    isCop = false;

                }, 1000);


            })
            .catch((e) => {
                console.error("An error occurr", e);
            });
    }
});
