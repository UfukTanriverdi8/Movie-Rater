const API_KEY = "4ed091188d2b12d2db528fc3ef894cc9";
const API_LINK = `https:/api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const home = document.getElementsByClassName("active")[0];
const main = document.getElementsByClassName("main_sect")[0];
const form = document.getElementById("form");
const search = document.getElementById("query");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = null;

    const searchItem = search.value;
    if(searchItem){
        returnMovies(SEARCH_API + searchItem);

   }
})

returnMovies(API_LINK);
home.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = "";
    search.value = "";
    returnMovies(API_LINK);
})

function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(data => {
        console.log(data.results)
        data.results.forEach(element => {
            const div_card = document.createElement("div");
            div_card.setAttribute("class","card");
            const div_row = document.createElement("div");
            div_row.setAttribute("class","row");
            const div_column = document.createElement("div");
            div_column.setAttribute("class","column");
            const image = document.createElement("img");
            image.setAttribute("class","thumbnail");
            const title = document.createElement("h3");
            const center = document.createElement("div");
            center.setAttribute("class","center_div");

            if(element.original_language != "en"){
                title.innerText = element.original_title + `(${element.title})`;
            }else{
                title.innerText = element.title;
            }
            
            if(typeof element.poster_path == "string"){
                image.src = IMG_PATH + element.poster_path;
            }else{
                image.src = "not_found.jpg";
            }
            
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);
        });
    })
}



