const API_KEY = process.env['API_KEY'];
var page_num = 1;
const API_LINK = `https:/api.themoviedb.org/3/discover/movie?include_adult=false&sort_by=popularity.desc&api_key=${API_KEY}&page=`;
var searched = false;

function api_linker(num){
    return API_LINK + num.toString();
}



const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const home = document.getElementsByClassName("active")[0];
const main = document.getElementsByClassName("main_sect")[0];
const form = document.getElementById("form");
const search = document.getElementById("query");



window.onscroll = function() {
    if(searched == false){
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            console.log(page_num);
            returnMovies(api_linker(page_num));
        }
    }
    
}

returnMovies(api_linker(1));

home.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = "";
    search.value = "";
    searched = false;
    page_num = 1;
    returnMovies(api_linker(1));
})

function returnMovies(url){
    page_num ++;
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
            title.innerHTML = `${element.title}<br><a class="review_link" href="movie.html?id=${element.id}&title=${element.title}">Reviews<a/>`;
            /* if(element.original_language != "en"){
                if(element.original_title !== element.title){
                    title.innerText = element.original_title + `\n(${element.title})`;
                }else{
                    title.innerText = element.title;
                }
            }else{
                title.innerText = element.title;
            } */
            
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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searched = true;
    const searchItem = search.value;
    if(searchItem && searchItem !== ""){
        main.innerHTML = null;
        returnMovies(SEARCH_API + searchItem);
   }
})


