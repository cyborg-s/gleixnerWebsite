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