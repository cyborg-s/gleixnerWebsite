window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

async function loadData() {
  try {
    const response = await fetch("./data.json");

    const data = await response.json();

    loadOverview(data);
    loadBooks(data);
    loadPractice(data);
    loadAbout(data);
    loadImages(data);
    loadMusic(data);
  } catch (error) {
    console.error("Fehler beim Laden der JSON:", error);
  }
}

function loadOverview(data) {
  const overViewContainer = document.getElementById("overview");

  overViewContainer.innerHTML = `

      <div class="overviewText flex column align">
        <h2 class="headFont pt15">Peter Gleixner</h2>
        <h3 class="new">Neuvorstellung meines Buches</h3>

        <h2 class="headFont overviewHead overviewTitle alignLeft">${data.books.current.title}</h2>
        <h3 class="headFont overviewHead overviewSubTitle alignLeft">${data.books.current.subTitle}</h3>

        <p class="descriptionIntro">${data.books.current.descriptionIntro}</p>
        <p class="description">${data.books.current.description}</p>
       

        <a href="${data.books.current.link}">
          Jetzt bestellen
        </a>
      </div>

            
<div class="overviewCoverDiv flex center"><div class="overviewCoverShadow"><img class="overviewCover" src="./IMG/buchCover.jpeg" alt="Buch Cover Spurenelemente"> </div>


  `;
}

function loadBooks(data) {
  const moreBooksContainer = document.getElementById("moreBooks");
  const newestBookContainer = document.getElementById("newestBook");

  newestBookContainer.innerHTML = `
  <div class="flex column align">
    <h4>Aktuell</h4>

    <div class="flex moreList">

      <div class="flex column space listItem">
        <div class="flex column align">
          <img
            class="bookCover"
            src="${data.books.current.image}"
            alt="buchcover"
          />
          <h4 style="height: 23px;">${data.books.current.title}</h4>
        </div>
        <a class="booksButton" href="${data.books.current.link}">
          Jetzt bestellen
        </a>
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
            (book) => `
            <div class="flex column listItem space">
              <div class="flex column align">    
                <img
                    class="bookCover"
                    src="${book.image}"
                    alt="buchcover"
                />  
                <h4>${book.title}</h4>
              </div>
              <a class="booksButton" href="${data.books.current.link}">
                Jetzt bestellen
              </a>
            </div>
            `,
          )
          .join("")}

      
      </div>
    </div>
  `;
}

function loadPractice(data) {
  const practiceContainer = document.getElementById("practice");

  practiceContainer.innerHTML = `
    <div class="practiceTop flex">
    
      <div>
        <h2 class="headFont pt14">${data.practice.head}</h2>
        <div class="flex column">
        <div>${data.practice.text}</div>
        <h3 class="headFont pt13">Universitäre und fachakademische Ausbildung in den Bereichen</h3>
        <p class="pt12">– Sprecherziehung<br>– Stimmbildung<br>– Spieltherapie<br>– Elternarbeit<br>– Klientenzentrierte Gesprächsführung (nach Ruth Cohn)</p>
        
        </div>
      </div>
      <div class="contact">
      <h3 class="headFont pt14">Kontakt</h3>
        <div>${data.practice.contact}</div>
        <a class="routeButton" href="https://maps.app.goo.gl/KJV2opGAqTigYjUZ7">Routenplaner</a>
      </div>

        
    </div>
    <div class="practice">
      <h3 class="headFont pt13">Selbständiger Therapeut für Sprachtherapie und Heilpädagogik mit eigener Praxis</h3>
      <p class="pt12">– von 1996 bis 2013 außerdem klinischer Sprachtherapeut an der Stroke-Unit (Schlaganfall-Notstation) im Klinikum St. Marien, Amberg<br>– zusätzlich Dozent für Stimme, Sprache, Kommunikation, u. a. an der Bayerischen Verwaltungsschule, München</br>
    </div>
  `;
}

function loadAbout(data) {
  const aboutContainer = document.getElementById("aMinfos");



  aboutContainer.innerHTML = `
    <div class="flex">
      

      <div
            class="profileImage"
            style="
                background-image:
                url('${data.aboutInfo.image}');
            "
        ></div>
      <div class="profileInfo">
        <div>
          <h2 class="pt17">Peter Gleixner</h2>
          <p class="pt14">* 1967 in Amberg,</p>
        </div>
        <p class="pt12">–  <a class="aboutLink" onclick="activate('practiceButton', 'practice')" href="#practice">Spachtherapeut</a> und staatlich geprüfter Heilpädagoge</p>
        <p class="pt12">–  <a class="aboutLink" onclick="activate('bookButton', 'books')" href="#lyrik">Lyriker</a></p>
        <p class="pt12">–  <a class="aboutLink" onclick="activate('musicButton', 'music')" href="#music">Musiker</a></p>
        <p class="pt12">–  Freizeitbauer</p>
        <p class="pt12">–  Naturliebhaber</p>
        <p class="pt12">Der Autor lebt auf seinem kleinen Bauernhof in der Nähe von Amberg.</p>
      </div>
    </div>`;

    

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

function loadImages(data){
    const imageContainer = document.getElementById("image");
    const pictures = data.aboutInfo.pictures;

  
    pictures.forEach((picture) => {
      imageContainer.innerHTML += `


        <img class="imgGalery"
            src="${picture.IMG}"
            alt="${picture.alternateText}"
        >


    `;
  })
}

function activate(activeButton, activeSection) {
  const buttons = ["bookButton", "practiceButton", "aboutMeButton", "imageButton", "musicButton"];

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
  const sections = ["workContainer", "artContainer", "allBooks", "aboutCarousel"];


  buttons.forEach((button) => {
    document.getElementById(button).classList.remove("activ");
  });

  sections.forEach((section) => {
    document.getElementById(section).classList.add("none");
  });

  document.getElementById(aboutActivButton).classList.add("activ");

  document.getElementById(aboutActivSection).classList.remove("none");
}

function loadMusic(data){
  const imageContainer = document.getElementById("music");
  const list = data.music.list;

  imageContainer.innerHTML =`
  <h2 class="headFont pt14">Musik</h2>
  <div id="musicList"></div>
  <p class="pt12 musicDescription">${data.music.description}</p>
  `

list.forEach((listItem) => {
    musicList.innerHTML += `
    <p>${listItem.text}</p>
`

})};