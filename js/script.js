console.log('New Carousel loaded');

/*
1 - definisco il contenuto di un array di oggetti
2 - stampo le immagini dell'album
3 - stampo le immagini del navigatore
4 - funzioni per il controllo delle frecce del carosello
5 - alla pressione del tasto start
    - nascono il tasto start
    - mostro il tasto stop
6 - alla pressione del tasto reverse
    - cambia la direzione del carosello
*/

const imageContainer = document.querySelector(".photo-displayed");
const miniatureContainer = document.querySelector(".miniature-preview");

const arrowBack = document.querySelector(".arrow-back");
const arrowFwd = document.querySelector(".arrow-fwd");

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnReverse = document.getElementById("reverse");

const imagesCollection = [
  {
    countryName: "Svezia",
    description: "Der nun steigt bringt und meinem halbverklungnen erschüttert irren die, unbestimmten entwöhntes hören und äolsharfe ach die erste meinem klage.",
    imageLink: "http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg"
  },
  {
    countryName: "Per&ugrave;",
    description: "Las lo para ilesa golondrina de con. De de mi para deja desnudo. Y que la pasan y dando. Mi.",
    imageLink: "https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg"
  },
  {
    countryName: "Cile",
    description: "Húmedo con que me en golondrina que, llanura de no faraón pero se aire, mío sangre apariencia atrás al, manecitas.",
    imageLink: "https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c"
  },
  {
    countryName: "Argentina",
    description: "Es diana con todo cosas viciosa y recodos mármol. Sin tierra llenando no brooklyn heridas, llenando nino los estremecidos bajaba..",
    imageLink: "https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg"
  },
  {
    countryName: "Colombia",
    description: "Baja un aire dios que bajaba estremecidos veces, huido de tierra bala para escaleras, árboles vilo ninos de larga loca..",
    imageLink: "https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop"
  }
];

let imageCounter = 0;
let arrayLength = imagesCollection.length;
let automatedCarousel;

generateImage();

let generatedImages = document.getElementsByClassName("printed-image");
let generatedMiniature = document.getElementsByClassName("miniature-img");
generatedImages[imageCounter].classList.add("active");
generatedMiniature[imageCounter].classList.add("active");

activateMiniature()

arrowBack.addEventListener("click", function(){
  fwdBack(false);
});
arrowFwd.addEventListener("click", function(){
  fwdBack(true);
});

btnStart.addEventListener("click", function(){
  automatedCarousel = setInterval(function(){
    fwdBack(true);
  }, 2000);
  btnStart.classList.add("hidden");
  btnStop.classList.remove("hidden");
});

btnStop.addEventListener("click", function(){
  clearInterval(automatedCarousel);
  btnStart.classList.remove("hidden");
  btnStop.classList.add("hidden");
});

btnReverse.addEventListener("click", function(){
  automatedCarousel = setInterval(function(){
    fwdBack(false);
  }, 2000);
  btnStart.classList.add("hidden");
  btnStop.classList.remove("hidden");
})


function generateImage () {
  imageContainer.innerHTML = "";
  miniatureContainer.innerHTML = "";
  
  imagesCollection.forEach((image) => {
    let imageCreated = `
    <div class="printed-image">
    <img class="" src="${image.imageLink}" alt="${image.countryName}">
    <div class="text-box">
    <h2 class="location">${image.countryName}</h2>
    <p class="description">${image.description}</p>
    </div>
    </div>
    `;
    imageContainer.innerHTML += imageCreated;
    let miniatureCreated = `
    <img class="miniature-img" src="${image.imageLink}" alt="${image.countryName}">
    `;
    miniatureContainer.innerHTML += miniatureCreated;
  });
}

function activateMiniature() {
  let idCustomCounter = 0;
  for(let miniature of generatedMiniature){
    miniature.idCustom = idCustomCounter;
    idCustomCounter++;
    miniature.addEventListener("click", activateImage);
  }
}

function activateImage() {
  generatedImages[imageCounter].classList.remove("active");
  generatedMiniature[imageCounter].classList.remove("active");
  console.log(this);
  imageCounter = this.idCustom;
  generatedImages[imageCounter].classList.add("active");
  generatedMiniature[imageCounter].classList.add("active");
};

function fwdBack(isFwd) {
  generatedImages[imageCounter].classList.remove("active");
  generatedMiniature[imageCounter].classList.remove("active");
  if(isFwd){
    imageCounter++;
    if(imageCounter === imagesCollection.length) imageCounter = 0;
  }else{
    imageCounter--;
    if(imageCounter < 0) imageCounter = arrayLength - 1;
  }
  generatedImages[imageCounter].classList.add("active");
  generatedMiniature[imageCounter].classList.add("active");
}