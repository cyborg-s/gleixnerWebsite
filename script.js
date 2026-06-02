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
    loadCarousel(data);
  } catch (error) {
    console.error("Fehler beim Laden der JSON:", error);
  }
}

function loadOverview(data) {
  const overViewContainer = document.getElementById("overview");

  overViewContainer.innerHTML = `

      <div class="overviewText flex column align">
        <h3>Neuvorstellung</h3>

        <h2>${data.books.current.title}</h2>

        <p class="descriptionIntro">${data.books.current.descriptionIntro}</p>
        <p class="description">${data.books.current.description}</p>
        <p class="subDescription">${data.books.current.subDescription}</p>

        <a href="${data.books.current.link}">
          Jetzt bestellen
        </a>
      </div>

              <div
            class="overviewImage"
            style="
                background-image:
                url('${data.books.current.image}');
            "
        ></div>


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
    <div class="practice flex">
    
      <div>
        ${data.practice.head}
        <div class="flex column">
        <div>${data.practice.text}</div>
        <h3>Kontakt</h3>
        <div>${data.practice.contact}</div>
        <a class="routeButton" href="https://maps.app.goo.gl/KJV2opGAqTigYjUZ7">Routenplaner</a>
        </div>
      </div>
      <img class="mapImg"
        src="${data.practice.image}"
        alt="Mapbild"
      />
        
    </div>
  `;
}

function loadAbout(data) {
  const aboutContainer = document.getElementById("aMinfos");
  const allBooksContaienr = document.getElementById("allBooks");
  const workContainer = document.getElementById("workContainer");
  const artContainer = document.getElementById("artContainer");

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
          <h2>Peter Gleixner</h2>
          <p class="fontSize">geboren 1967 in Amberg,</p>
        </div>
        <p class="fontSize">ist Spachtherapeut, Heilpädagoge, Musiler, Lyriekr, Freizeitbauer und Naturliebhaber.</p>
        <p class="fontSize">Neben seiner beruflichen Tätigkeit widmet er sich seit vielen Jahren dem Schreiben und hat bereits mehrere <a class="lyrikLink" onclick="lyrik('lyrik')" href="#lyrik">Gedichtsbände</a> veröffentlicht.</p>
        <wo class="fontSize">Der Autor lebt auf einem kleinen Bauernhof in der Nähe von Amberg wo er Inspiration für sein literarisches Schaffen in der Natur und im ländlichen Leben findet.</>
      </div>
    </div>

    
<div class="aboutMenu flex">
  <button id="work" onclick="aboutActivate('work', 'workContainer')" class="activ">Berufiches</button>
  <button id="art" onclick="aboutActivate('art', 'artContainer')">Künstlerische Tätigkeit</button>
  <button id="lyrik" onclick="aboutActivate('lyrik', 'allBooks')">Literarische Veröffentlichungen</button>
  <button id="img" onclick="aboutActivate('img', 'aboutCarousel')">Bilder</button>
</div>
`;

  workContainer.innerHTML = `
  <h3>Universitäre und fachakademische Ausbildung in den Bereichen</h3>

  <ul>
  <li>Sprecherziehung</li>
  <li>Stimmbildung</li>
  <li>Spieltherapie</li>
  <li>Elternarbeit</li>
  <li>Klientenzentrierte Gesprächsführung (nach Ruth Cohn)</li>
</ul>

  <h3>Selbständiger Therapeut für Sprachtherapie und Heilpädagogik mit eigener Praxis</h3>

  <ul>
    <li>von 1996 bis 2013 außerdem klinischer Sprachtherapeut an der Stroke-Unit (Schlaganfall-Notstation) im Klinikum St. Marien, Amberg</li>
    <li>zusätzlich Dozent für Stimme, Sprache, Kommunikation, u. a. an der Bayerischen Verwaltungs-schule, München</li>
  </ul>
  `;

  artContainer.innerHTML = `
  <h3>Künstler</h3>
  <ul>
    <li>seit 1985 als Keyboarder in verschiedenen musikalischen Formationen aktiv</li>
    <li>wurde 1990 bei einem Wettbewerb des RSGI (Regensburger Schriftstellerverband International) unter die zehn besten Nachwuchsschriftsteller gewählt</li>
    <li>gewann 1998 mit der Band „Voice“ das „Blue Note Festival“</li>
    <li>zahlreiche Lyriklesungen mit Musik, mehrere CD-Veröffentlichungen</li>
  </ul>

  <p>Peter Gleixner wurde hauptsächlich für seine „Musiklesungen“ bekannt, oft in Zusammenarbeit mit dem Multiinstrumentalisten und Komponisten <a href="https://heinzgrobmeier.de/">Heinz Grobmeier</a>. Als Duo waren sie in ganz Bayern unterwegs. Der Autor rezitierte seine Texte und begleitete sich selbst am Klavier, während Grobmeier mit klangmalerischer Musik die Grundstimmung der Texte einfühlsam verstärkte. Die Gedichte, die als Grundlage für mehrere Performance-Projekte dienten, wurden u. a. als „entschleunigt“ und „witzig“ beschrieben. Sie zeichnen sich aus durch eine Mischung aus Skurrilem, Träumerischem und kritischer Reflexion über Themen wie das Leben, die Zeit und die Natur. Seine Erfahrungen als Sprachtherapeut und Heilpädagoge fließen dabei oft subtil in die künstlerische Arbeit ein, bei der der bewusste Umgang mit Sprache und Stimme ein verbindendes Element darstellt.</p>

  `;

  allBooksContaienr.innerHTML = `
  <h3>Alle Veröffentlichungen</h3>
  <div>
  <div class="flex column">
      <ul>
        ${data.books.allBooks
          .map(
            (book) => `
              <li><div class="flex allBooksList"><p style="font-weight: bold;">${book.title}</p> <p>${book.info}</p></div></li>
            `,
          )
          .join("")}
      </ul>      
      </div>
  </div>
  `;
}

function loadCarousel(data) {
  const pictures = data.aboutInfo.pictures;

  const carousel = document.getElementById("aboutCarousel");

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

function activate(activeButton, activeSection) {
  const buttons = ["bookButton", "practiceButton", "aboutMeButton"];

  const sections = ["books", "practice", "aboutMe"];

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