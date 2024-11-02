const searchBtn = document.getElementById("search-btn")
const searchValue = document.getElementById("search")
const movieList = document.getElementById("movie-list")
const addWatchListBtn = document.getElementById("addWatchListBtn")
let watchlistArray =[]
let searchArray =[]

function search(){
    fetch(`http://www.omdbapi.com/?s=${searchValue.value}&apikey=697a5c4e`)
        .then(res => res.json())
        .then(data =>{
            movieList.innerHTML = ""
            searchArray = data.Search
            searchArray.forEach(function(idNo){
                fetch(`http://www.omdbapi.com/?i=${idNo.imdbID}&apikey=697a5c4e`)
                .then(res => res.json())
                .then(data =>{
                    movieList.insertAdjacentHTML("beforeend", `
                            <div class="movie-insert">
                                <img class="poster" src="${data.Poster}">
                                <div class="details">
                                    <div class="title-block">
                                        <h3>${data.Title} </h3>
                                        <img src="img/Icon3.png">
                                        <p>${data.imdbRating}</p>
                                    </div>
                                    <div class="movie-details">
                                        <p>${data.Runtime}</p>
                                        <p>${data.Genre}</p>
                                        <div class="add-movie">
                                            <button id="${data.imdbID}">+</button>
                                            <p>Watchlist</p>
                                        </div>
                                    </div>
                                    <p class="plot">${data.Plot}</p>
                                </div>
                                
                            </div>
                            <hr>
                        `
                        )
            
                    document.getElementById(data.imdbID).addEventListener("click", ()=>{
                        const text = localStorage.getItem("watchlistArray")
                        let watchlistArray
                        if (Boolean(text)){
                            watchlistArray = JSON.parse(text)
                        }
                        else{
                                watchlistArray=[]
                        }
                        watchlistArray.push(data.imdbID)
                        localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray))
                    })
                }) 
            })
        })
    searchValue.value =""
}

searchBtn.addEventListener("click", search)