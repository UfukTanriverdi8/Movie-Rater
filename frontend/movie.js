const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");


var page_num = 1;
const API_LINK = `http://localhost:8000/api/v1/reviews/`;
var searched = false;

function api_linker(num){
    return API_LINK + num.toString();
}

const home = document.getElementsByClassName("active")[0];
const main = document.getElementsByClassName("main_sect")[0];
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)
/* window.onscroll = function() {
    if(searched == false){
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            console.log(page_num);
            returnMovies(api_linker(page_num));
        }
    }
    
} */

returnMovies(API_LINK);

//tryinout(API_LINK)
home.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = "";
    /* search.value = "";
    searched = false;
    page_num = 1; */
    window.open("index.html","_self")
})

function editReview(id, review, user) {

    const element = document.getElementById(id);
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    
    element.innerHTML = `
                <p><strong>Review: </strong>
                  <input type="text" id="${reviewInputId}" value="${review}">
                </p>
                <p><strong>User: </strong>
                  <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
                </p>
    
    `
}
function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
  
    if (id) {
      fetch(API_LINK + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });        
    } else {
      fetch(API_LINK + "new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });
    }
  }



function deleteReview(id) {
    fetch(API_LINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });    
}

function returnMovies(url){
    //page_num ++;
    fetch(url+ "movie/" + movieId).then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(review => {
            const div_card = document.createElement("div");
            div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑️</a></p>
              </div>
            </div>
          </div>
        `
            /* const div_card = document.createElement("div");
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
            div_row.appendChild(div_column);*/
            main.appendChild(div_card); 
        });
    })
}

