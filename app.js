const url = "https://catfact.ninja/";
const val = { page: 1 };

const page = {
  // cat-content
  content: document.querySelector(".cat-content"),
};

// variable to store cats data
let cats = [];

//facts button
const factsBtn = document.getElementById("catFactsBtn");

// buttons for toggle
const nameSortBtn = document.getElementById("nameSort");
const countrySortBtn = document.getElementById("countrySort");

// buttons for sorting name
const nameSortAscendBtn = document.getElementById("btnSortNameAscend");
const nameSortDescendBtn = document.getElementById("btnSortNameDescend");

// button for sorting country
const countrySortUkBtn = document.getElementById("btnSortUk");
const countrySortUsaBtn = document.getElementById("btnSortUsa");

function getCats() {
  const baseUrl = url + "breeds" + "?page=" + val.page;

  fetch(baseUrl)
    .then((res) => res.json())
    .then((json) => {
      // store data from api response to cats array
      cats = json.data;

      // log as object
      console.log({
        cats,
        json,
        jsonData: json.data,
      });

      // render to page
      renderPage(cats);
    });
}

function init() {
  setupEventListeners();
  getCats();
}

// setup event listeners for all buttons
function setupEventListeners() {
  // name sort btn toggle
  nameSortBtn.addEventListener("click", () => {
    document.querySelector(".dropDownBtnName").classList.toggle("show");
  });

  // sort by country
  countrySortBtn.addEventListener("click", () => {
    document.querySelector(".dropDownBtnCountry").classList.toggle("show");
  });

  //sort name ascending order
  nameSortAscendBtn.addEventListener("click", () => {
    const sortedNameAscend = cats.sort((a, b) => (a.breed > b.breed ? 1 : -1));
    renderPage(sortedNameAscend);
  });

  //sort name descending order
  nameSortDescendBtn.addEventListener("click", () => {
    const sortedNameDescend = cats.sort((a, b) => (b.breed > a.breed ? 1 : -1));
    renderPage(sortedNameDescend);
  });

  /**
   * sort uk cats
   * yo tah filter button hola nih?
   */
  countrySortUkBtn.addEventListener("click", () => {
    const sortedUkCats = cats.filter((cat) => cat.country == "United Kingdom");
    renderPage(sortedUkCats);
  });

  /**
   * sort Us cats
   * yo nih filter button hola?
   */
  countrySortUsaBtn.addEventListener("click", () => {
    const sortUsaCats = cats.filter((cat) => cat.country == "United States");
    renderPage(sortUsaCats);
  });

  // handling sorting buttons
  document.documentElement.addEventListener("click", (e) => {
    if (!e.target.matches("#nameSort")) {
      let btnContent = document.querySelector(".dropDownBtnName");
      if (btnContent.classList.contains("show")) {
        btnContent.classList.remove("show");
      }
    }

    if (!e.target.matches("#countrySort")) {
      let btnContent = document.querySelector(".dropDownBtnCountry");
      if (btnContent.classList.contains("show")) {
        btnContent.classList.remove("show");
      }
    }
  });
}

// render function
function renderPage(data) {
  // remove all child nodes from page.content
  deletePage();

  data.forEach((cat) => {
    const div = document.createElement("div");
    const paragraph = document.createElement("p");

    // add classes to nodes
    div.classList.add("divCat");
    paragraph.classList.add("paraCat");

    // add texts to nodes
    paragraph.textContent = `country: ${cat.country}`;
    div.textContent = `breed: ${cat.breed}`;

    // append paragraph to parent div
    div.append(paragraph);

    // append parent div to page.content
    page.content.append(div);
  });
}

/**
 * delete function
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren
 * Using replaceChildren to remove all child nodes from the parent element.
 */
function deletePage() {
  const parent = page.content;
  parent.replaceChildren();
  //   while (parent.childNodes.length != 0) {
  //     parent.removeChild(parent.childNodes[0]);
  //   }
}

// init function to call all initial functions
init();
