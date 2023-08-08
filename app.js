const url = "https://catfact.ninja/";
const val = {page : 1};

const page = {};
// cat-content
page.content = document.querySelector('.cat-content');

//fetching cat facts
fetch(url + "facts").then(res => res.json())
.then(json => json.data);

function getCats(){
    const baseUrl = url + "breeds" + "?page=" + val.page;
    fetch(baseUrl).then(res => res.json())
    .then(json => {

        const myData = json.data;
        console.log(myData);
        console.log(json);
        console.log(json.data);

        renderPage(json.data);


        // name sort btn toggle
        nameSortBtn.addEventListener('click', () => {
            document.querySelector('.dropDownBtnName')
            .classList.toggle('show');
        });


        // sort by country
        countrySortBtn.addEventListener('click', () => {
            document.querySelector('.dropDownBtnCountry')
            .classList.toggle('show');
        });


        //sort name ascending order
        nameSortAscendBtn.addEventListener('click', () => {
            let sortedNameAscend = myData.sort((a,b) => a.breed > b.breed ? 1 : -1);
            renderPage(sortedNameAscend);
        });

        //sort name descending order
        nameSortDescendBtn.addEventListener('click', () => {
            let sortedNameDescend = myData.sort((a, b) => b.breed > a.breed ? 1 : -1);
            renderPage(sortedNameDescend);
        })

        // sort uk cats
        countrySortUkBtn.addEventListener('click', () => {
            let sortedUkCats = myData.filter(cat => cat.country == "United Kingdom");
            renderPage(sortedUkCats);
        })

        //sort Usa cats
        countrySortUsaBtn.addEventListener('click', () => {
            let sortUsaCats = myData.filter(cat => cat.country == "United States");
            renderPage(sortUsaCats);
        })

        // cat facts
        // factsBtn.addEventListener('click', () => {
        //     fetch(url + "facts").then(res => res.json())
        //     .then(json => {
        //         renderPage(json.data);
        //     })
        // })

    })
}

getCats();


// render function

function renderPage(data){
    deletePage();

    data.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'divCat';
        const para = document.createElement('p');
        para.className = 'paraCat';
        para.textContent = `country: ${cat.country}`
        div.textContent = `breed: ${cat.breed}`;
        div.append(para);
        page.content.append(div);
    })
}


// delete function
function deletePage(){
    const parent = document.querySelector('.cat-content');
    while( parent.childNodes.length != 0){
        parent.removeChild(parent.childNodes[0]);
    }
}


//facts button
const factsBtn = document.getElementById('catFactsBtn');

// buttons for toggle
const nameSortBtn = document.getElementById('nameSort');
const countrySortBtn = document.getElementById('countrySort');

// buttons for sorting name
const nameSortAscendBtn = document.getElementById('btnSortNameAscend');
const nameSortDescendBtn = document.getElementById('btnSortNameDescend');

// button for sorting country
const countrySortUkBtn = document.getElementById('btnSortUk');
const countrySortUsaBtn = document.getElementById('btnSortUsa');




// handling sorting buttons
document.documentElement.addEventListener('click', (e) => {

    if(!e.target.matches('#nameSort')){
        let btnContent = document.querySelector('.dropDownBtnName');
        if(btnContent.classList.contains('show')){
            btnContent.classList.remove('show');
        }
    }

    if(!e.target.matches('#countrySort')){
        let btnContent = document.querySelector('.dropDownBtnCountry');
        if(btnContent.classList.contains('show')){
            btnContent.classList.remove('show');
        }
    }

})
