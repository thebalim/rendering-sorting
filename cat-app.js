const url = "https://catfact.ninja/";
const val = { 
              page: 1, // cat page
              factPage: 1 // fact page
            };

// handling fact page or cat page
let eval = 1;

const page = {
  // cat-content
  content: document.querySelector(".cat-content"),
  // loader booleon
  catloader: true,
  factloader: true,
  message: document.createElement('div'),
};

page.message.textContent = "---Scroll to load more content--";
page.content.append(page.message);

// variable to store cats data
let cats = [];

// variable to store cats facts data
let catFacts = [];

//facts button
const factsBtn = document.getElementById("catFactsBtn");

// buttons for toggle
const nameSortBtn = document.getElementById("nameSort");
const countrySortBtn = document.getElementById("countrySort");

// buttons for sorting name
const nameSortAscendBtn = document.getElementById("btnSortNameAscend");
const nameSortDescendBtn = document.getElementById("btnSortNameDescend");

// button for sorting country
const filterUkBtn = document.getElementById("btnSortUk");
const filterUsaBtn = document.getElementById("btnSortUsa");

// get cats function
function getCats() {
  const baseUrl = url + "breeds" + "?page=" + val.page;

  fetch(baseUrl)
    .then((res) => res.json())
    .then((json) => {
      // checking if next page exits
      if(json.next_page_url != null){
        page.catloader = true;
        page.message.textContent = "-Page" + val.page + "--Scroll to load more content---";

      } else {
        page.message.style.display = "none";
      }

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

// get cat facts function
function getFactPage(){
  eval = 0;
  const baseUrl = url + "facts" + "?page=" + val.factPage;
  fetch(baseUrl)
  .then((res) => res.json())
  .then((json) => {
    // store data from api response in cat facts array
    catFacts = json.data;

    // checking if next page exits
    if(json.next_page_url != null){
      page.factloader = true;
      page.message.textContent = "-Page" + val.factPage + "--Scroll to load more content---";

    } else {
      page.message.style.display = "none";
    }

    // log as objects
    console.log({
      catFacts,
      json,
      jsonData: json.data
    })


    // render function for cat facts page
    function renderCatFacts(data){
      
      // remove all child nodes from page.content
      deletePage();

      let index = 1;

      data.forEach((data) => {
        const div = document.createElement('div');

        // add class to nodes
        div.className = "catFacts";

        // add texts to nodes
        div.textContent = `${index}. ${data.fact}`;

        // append div to page.content
        page.content.append(div);
        
        index += 1;
      })
    }

    renderCatFacts(catFacts);



  }); // --> fetch
}

function init() {
  setupEventListeners();
  if( eval == 1){
    getCats();
  } 
  else if ( eval == 0){
    getFactPage();
  }
  
}

// setup event listeners for all buttons
function setupEventListeners() {


  // get cat facts btn
  factsBtn.addEventListener('click', getFactPage); // --> catFacts button

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
    eval = 1;
    const sortedNameAscend = cats.sort((a, b) => (a.breed > b.breed ? 1 : -1));
    renderPage(sortedNameAscend);
  });

  //sort name descending order
  nameSortDescendBtn.addEventListener("click", () => {
    eval = 1;
    const sortedNameDescend = cats.sort((a, b) => (b.breed > a.breed ? 1 : -1));
    renderPage(sortedNameDescend);
  });

  // filter btn for uk cats
  filterUkBtn.addEventListener("click", () => {
    eval = 1;
    const sortedUkCats = cats.filter((cat) => cat.country == "United Kingdom");
    renderPage(sortedUkCats);
  });

  // filter btn for usa cats
  filterUsaBtn.addEventListener("click", () => {
    eval = 1;
    const sortUsaCats = cats.filter((cat) => cat.country == "United States");
    renderPage(sortUsaCats);
  });

// window onscroll event for cat page

  window.onscroll = function(ev){
  
    /* log window events
    console.log(ev);
    console.log(window.innerHeight);
    console.log(window.scrollY);
    console.log(page.content.offsetHeight);
    console.log(document.body.offsetHeight);
    */

    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
      // console.log('scrolling');

      if(eval == 1){
        // for cat page
        if(page.catloader){
          page.catloader = false;
          addNewCatPage();
        }
      } else {
        // for fact page
        if(page.factloader){
          page.factloader = false;
          addNewFactPage();
        }
      }
      
    }
  }

  // handling dropdown btn contents
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

} // --> setupEventListeners

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


  

// add new cat page function
function addNewCatPage(){
    val.page++;
    getCats();
  }

// add new fact page function
function addNewFactPage(){
  val.factPage++;
  getFactPage();
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
