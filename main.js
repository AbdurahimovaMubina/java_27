let cards = document.querySelector(".cards");
let search = document.querySelector(".search");

const __API = "https://restcountries.com/v3.1/all";

const getData = async () => {
  const res = await fetch(__API);
  const data = await res.json();
  console.log(data);
  render(data);
  search.addEventListener("input", (e) => {
    let inputValue = e.target.value.toLowerCase();

    let filteredjson = data.filter((item) =>
      item.name.common.toLowerCase().includes(inputValue)
    );
    render(filteredjson);
  });
};

getData();

function render(arr) {
  cards.innerHTML = "";
  arr.map((item) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.src = item.flags.png;

    let h2 = document.createElement("h2");
    h2.textContent = item.name.common;
    h2.style.textAlign = "center";
    h2.style.color = "white";
    h2.style.paddingTop = "25px";
    h2.style.fontSize = "20px";

    card.append(img, h2);
    card.onclick = () => openCountryPage(item);
    cards.append(card);
  });
}

function openCountryPage(country) {
  const countryInfo = `
  <html>
  <head>
    <title>${country.name.common}</title>
    <style>
      body {
        font-family: "Nunito Sans", sans-serif;
        background-color: #202c36;
        color: white;
        padding: 20px;
      }
      h1 {
        text-align: center;
      }
      p {
        font-size: 18px;
      }
      .box {
        display: flex;
        align-items: center;
        margin-left: 30%;
        margin-top: 10%;
        padding-left: 15px;
      }
        .img1 {
        width: 250px;
    }
        .text-box{
        margin: 50px;
        }
    </style>
  </head>
  <body>
    <h1>${country.name.common}</h1>
    <div class="box">   
      <div class= "text-box">
        <img
          class="img1"
          src="${country.flags.png}"
          alt="Flag of ${country.name.common}"
        />
      </div>
      <div>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      </div>
    </div>
  </body>
</html>
`;
  const newWindow = window.open();
  newWindow.document.write(countryInfo);
}
