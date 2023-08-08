const url = "https://catfact.ninja/";
const val = {page : 1};

const page = {};
// cat-content
page.content = document.querySelector('.cat-content');

function getCats(){
    const baseUrl = url + "breeds" + "?page=" + val.page;
    fetch(baseUrl).then(res => res.json())
    .then(json => {
        console.log(json);
        console.log(json.data);

        renderPage(json.data);



        delBtn.addEventListener('click', deletePage);
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


//del button
const delBtn = document.getElementById('del');

