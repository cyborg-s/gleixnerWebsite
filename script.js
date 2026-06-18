window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

let websiteData;

async function loadData() {
  try {
    const response = await fetch("./data.json");

    websiteData = await response.json();

    loadOverview(websiteData);
    loadBooks(websiteData);
    loadPractice(websiteData);
    loadAbout(websiteData);
    loadImages(websiteData);
    loadMusic(websiteData);
  } catch (error) {
    console.error("Fehler beim Laden der JSON:", error);
  }
}

function loadOverview(data) {
  const overViewContainer = document.getElementById("overview");

  overViewContainer.innerHTML = `

      <div class="overviewText flex column align">
        <h1 class="headFont pt20">Peter Gleixner</h1>
        <h3 class="new">Neuvorstellung meines Buches</h3>

        <h2 class="headFont overviewHead overviewTitle alignLeft">${data.books.current.title}</h2>
        <h3 class="headFont overviewHead overviewSubTitle alignLeft">${data.books.current.subTitle}</h3>

        <p class="descriptionIntro">${data.books.current.descriptionIntro}</p>
        <p class="description">${data.books.current.description}</p>
       


        <button class="pt14 buyButton" onclick="loadBuyPopup('current')">Jetzt Bestellen</button>
      </div>

            
<div class="overviewCoverDiv flex center">
  <div class="overviewCoverShadow">
    <img class="overviewCover" src="./IMG/buchCover.jpeg" alt="Buch Cover Spurenelemente" loading="lazy"> 
    </div>
  </div>

  `;
}

function loadBuyPopup(bookKey, index = null) {
  const popup = document.getElementById("buyPopup");
  let book;

let buyButton = "";
let amazonLink = "";
let thaliaLink = "";
let hugendubelLink = "";  

  if (index !== null) {
        book = websiteData.books[bookKey][index];
    } else {
        book = websiteData.books[bookKey];
    }


  if (book.linkBuy !== "") {
    buyButton = `
    <h2>Dieses Buch ist für ${book.price} direkt beim Autor per Email erhältlich.</h2>
    <p class="flex center">Bitte Adressdaten in der Email angeben, Versand erfolgt auf Rechnung</p>
    <button class="pt14 buyButton" onclick="orderBookMail('${book.linkBuy}', '${book.price}')">
      Per E-Mail bestellen
    </button>
  `;
  }

  
  if (book.linkAmazon !== "") {
    amazonLink = `
    <a
      class="topLink"
      href="${book.linkAmazon}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="shopLinkIco" src="./IMG/amazon.webp" alt="Amazon" loading="lazy">
    </a>
  `;
  }

  if (book.linkThalia !== "") {
    thaliaLink = `
    <a
      href="${book.linkThalia}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="shopLinkIco" src="./IMG/thalia.webp" alt="Thalia" loading="lazy">
    </a>
  `;
  }

  if (book.linkHugendubel !== "") {
    hugendubelLink = `
    <a
      href="${book.linkHugendubel}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="shopLinkIco" src="./IMG/hugendubel.webp" alt="Hugendubel" loading="lazy">
    </a>
  `;
  }

  popup.innerHTML = `
  <div class="buyBackground">
        <div class="buyPopupContent flex">

        <div class="popupCoverShadow">    
          <img class="buyCover"
                src="${book.image}"
                alt="${book.title}"
                loading="lazy"
            >
        </div>
            <h2 class="popupHead headFont">${book.title}</h2>

            <h3 class="popupHead headFont">${book.subTitle}</h3>

            <div class="shopLinks flex column">

                ${amazonLink}

    ${thaliaLink}

    ${hugendubelLink}

    ${buyButton}

    <button class="closeButton" onclick="closeBuyPopup()">
      X
    </button>

            </div>

        </div></div>

    `;

  openBuyPopup();
}

function openBuyPopup() {
  document.getElementById("buyPopup").classList.remove("none");
}

function closeBuyPopup() {
  document.getElementById("buyPopup").classList.add("none");
}

function loadBooks(data) {
  const moreBooksContainer = document.getElementById("moreBooks");
  const newestBookContainer = document.getElementById("newestBook");
  const notAContainer = document.getElementById("booksNotA");

  newestBookContainer.innerHTML = `
  <div class="flex column align">
    <h4>Aktuell</h4>

    <div class="flex moreList">

      <div class="flex column space listItem">
        <div class="flex column align">
          <div class="minCover flex align"><img
            class="bookCover"
            src="${data.books.current.image}"
            alt="buchcover"
            loading="lazy"
          /></div>
          <div class="minBookInfo">
          <div class="minHead"><h4 style="height: 23px;">${data.books.current.title}</h4>
          <h4 style="height: 23px;">${data.books.current.subTitle}</h4></div>
          <p>${data.books.current.info}</p>
                <p>${data.books.current.publisher}</p>
                <p>${data.books.current.ISBN}</p>
          </div>
        </div>
        <button class="pt14 buyButton" onclick="loadBuyPopup('current')">Jetzt Bestellen</button>
      </div>

    </div>

  </div>
  `;

  moreBooksContainer.innerHTML = `
    <div>
      <h4 class="moreHead">Weitere verfügbare Bücher</h4>


      <div class="flex moreList">  
      

        ${data.books.moreBooks
          .map(
            (book,index) =>
              `
            <div class="flex column listItem space">
              <div class="flex column align">    
                <div class="minCover flex align"><img
                    class="bookCover"
                    src="${book.image}"
                    alt="buchcover"
                    loading="lazy"
                /></div>  
                <div class="minBookInfo">
                <div class="minHead"><h4>${book.title}</h4>
                <h4>${book.subTitle}</h4></div>
                <p>${book.info}</p>
                <p class="textCenter">${book.publisher}</p>
                <p>${book.ISBN}</p>
              </div></div>
              <button class="pt14 buyButton" onclick="loadBuyPopup('moreBooks', ${index})">Jetzt Bestellen</button>
            </div>
            `,
          )
          .join("")}

      
      </div>
    </div>
  `;


  notAContainer.innerHTML = `
  <h2 class="pt18 headFont sectionHeader">Vergriffene Bücher</h2>
  <ul>
  ${data.books.allBooks
          .map(
            (book,index) =>
              `
            <li class="pt14"><b class="pt16">${book.title}</b> ${book.info}</li>
            `,
          )
          .join("")}
  
  
  </ul>
  `


}

function loadPractice(data) {
  const practiceContainer = document.getElementById("practice");

  practiceContainer.innerHTML = `
    <div class="practiceTop flex">
    
      <div>
        <h2 class="headFont pt18">${data.practice.head}</h2>
        <div class="flex column">
        <div><p class="pt14">${data.practice.text}</p></div>
        <div class="contact">
      <h3 class="headFont pt16">Kontakt</h3>
        <div><p class="pt14">${data.practice.contact}</p></div>
        <a class="pt14 headFont routeButton" href="https://maps.app.goo.gl/KJV2opGAqTigYjUZ7">Routenplaner</a>
      </div>
        <h3 class="headFont pt16">Universitäre und fachakademische Ausbildung in den Bereichen</h3>
          <ul>
          <li class="pt14">Sprecherziehung</li>
          <li class="pt14">Stimmbildung</li>
          <li class="pt14">Spieltherapie</li>
          <li class="pt14">Elternarbeit</li>
          <li class="pt14">Klientenzentrierte Gesprächsführung (nach Ruth Cohn)</li>
          </ul>
        
        </div>
      </div>
      

        
    </div>
    <div class="practice">
      <h3 class="headFont pt16">Selbständiger Therapeut für Sprachtherapie und Heilpädagogik mit eigener Praxis</h3>
      <ul>
      <li class="practiceList">von 1996 bis 2013 außerdem klinischer Sprachtherapeut an der Stroke-Unit (Schlaganfall-Notstation) im Klinikum St. Marien, Amberg</li>
      <li class="practiceList">zusätzlich Dozent für Stimme, Sprache, Kommunikation, u. a. an der Bayerischen Verwaltungsschule, München</li>
      <ul>
    </div>
  `;
}

function loadAbout(data) {
  const aboutContainer = document.getElementById("aMinfos");

  aboutContainer.innerHTML = `
    <div class="flex">
      
      <div class="flex center pImgCont">
      <div class="overviewCoverShadow">      
      <img class="profileImage" src="${data.aboutInfo.image}" alt="Peter Gleixner Foto" loading="lazy"></div></div>
      <div class="profileInfo">
        <div>
          <h2 class="pt20">Peter Gleixner</h2>
          <p class="pt16">* 1967 in Amberg,</p>
        </div>
        <ul>
        <li class="pt14">  <a class="aboutLink" onclick="activate('practiceButton', 'practice')" href="#practice">Spachtherapeut</a> und staatlich geprüfter Heilpädagoge</li>
        <li class="pt14">  <a class="aboutLink" onclick="activate('bookButton', 'books')" href="#lyrik">Lyriker</a></li>
        <li class="pt14">  <a class="aboutLink" onclick="activate('musicButton', 'music')" href="#music">Musiker</a></li>
        <li class="pt14">  Freizeitbauer</li>
        <li class="pt14">  Naturliebhaber</li>
        <li class="pt14">Der Autor lebt auf seinem kleinen Bauernhof in der Nähe von Amberg.</li>
      </ul></div>
    </div>`;
}

function orderBookMail(title, price) {
  const subject = encodeURIComponent(
    `${title}`,
  );

  const body = encodeURIComponent(
      "Guten Tag,\n\n" +
      `hiermit möchte ich Ihr Buch "${title}" zum Preis von ${price} bestellen.\n\n` +
      "Meine Lieferadresse lautet:\n" +
      "Name:\n" +
      "Straße / Hausnummer:\n" +
      "PLZ / Ort:\n" +
      "Land:\n\n"+
      "Zahlweise: Rechung\n\n" +
      "Mit freundlichen Grüßen",
  );

  window.location.href = `mailto:gleixnerpeter@web.de?subject=${subject}&body=${body}`;
}

function loadCarousel(data) {
  const pictures = data.aboutInfo.pictures;

  const carousel = document.getElementById("carousel");

  carousel.innerHTML = `
        <button class="carouselArrow left">&lt;</button>

        <div class="carouselViewport">
            <div class="carouselTrack"></div>
        </div>

        <button class="carouselArrow right">&gt;</button>
    `;

  const track = carousel.querySelector(".carouselTrack");

  pictures.forEach((picture) => {
    track.innerHTML += `
    <div class="carouselSlide">

        <div
            class="slideBackground"
            style="background-image: url('${picture.IMG}')"
        ></div>

        <img
            src="${picture.IMG}"
            alt="${picture.alternateText}"
            loading="lazy"
        >

    </div>
`;
  });

  let currentIndex = 0;
  const slides = track.querySelectorAll(".carouselSlide");

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");

      if (index === currentIndex) {
        slide.classList.add("active");
      }
    });

    track.style.transform = `translateX(calc(50% - ${currentIndex * 70 + 35}%))`;
  }

  carousel.querySelector(".left").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;

    updateCarousel();
  });

  carousel.querySelector(".right").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;

    updateCarousel();
  });

  /* Swipe */

  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      currentIndex = (currentIndex + 1) % slides.length;

      updateCarousel();
    }

    if (endX - startX > 50) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;

      updateCarousel();
    }
  });

  updateCarousel();
}

function loadImages(data) {
  const imageContainer = document.getElementById("image");
  const pictures = data.aboutInfo.pictures;

  pictures.forEach((picture) => {
    imageContainer.innerHTML += `


        <img class="imgGalery"
            src="${picture.IMG}"
            alt="${picture.alternateText}"
            loading="lazy"
        >


    `;
  });
}

function activate(activeButton, activeSection) {
  const buttons = [
    "bookButton",
    "practiceButton",
    "aboutMeButton",
    "imageButton",
    "musicButton",
  ];

  const sections = ["books", "practice", "aboutMe", "image", "music"];

  buttons.forEach((button) => {
    document.getElementById(button).classList.remove("activ");
  });

  sections.forEach((section) => {
    document.getElementById(section).classList.add("none");
  });

  document.getElementById(activeButton).classList.add("activ");

  document.getElementById(activeSection).classList.remove("none");
}

function aboutActivate(aboutActivButton, aboutActivSection) {
  const buttons = ["work", "art", "lyrik", "img"];
  const sections = [
    "workContainer",
    "artContainer",
    "allBooks",
    "aboutCarousel",
  ];

  buttons.forEach((button) => {
    document.getElementById(button).classList.remove("activ");
  });

  sections.forEach((section) => {
    document.getElementById(section).classList.add("none");
  });

  document.getElementById(aboutActivButton).classList.add("activ");

  document.getElementById(aboutActivSection).classList.remove("none");
}

function loadMusic(data) {
  const imageContainer = document.getElementById("music");
  const list = data.music.list;

  imageContainer.innerHTML = `
  <h2 class="headFont pt20">Musik</h2>
  <ul id="musicList"></ul>
  <p class="pt14 musicDescription">${data.music.description}</p>
  `;

  list.forEach((listItem) => {
    musicList.innerHTML += `
    <li>${listItem.text}</li>
`;
  });
}

function contactEmail() {

    const subject = encodeURIComponent(
        "Kontaktanfrage"
    );

    window.location.href =
        `mailto:gleixnerpeter@web.de?subject=${subject}`;
}