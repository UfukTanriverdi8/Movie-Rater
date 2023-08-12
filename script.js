const API_KEY = "4ed091188d2b12d2db528fc3ef894cc9";
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

            if(element.original_language != "en"){
                if(element.original_title !== element.title){
                    title.innerText = element.original_title + `\n(${element.title})`;
                }else{
                    title.innerText = element.title;
                }
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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searched = true;
    const searchItem = search.value;
    if(searchItem && searchItem !== ""){
        main.innerHTML = null;
        returnMovies(SEARCH_API + searchItem);
   }
})


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }