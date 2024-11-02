const watchlistArea = document.getElementById("watchlist-area")

function renderWatchlist() {
    const text = localStorage.getItem("watchlistArray")
    let watchlistArray = JSON.parse(text)
    watchlistArea.innerHTML =""
    for(let i = 0; i<watchlistArray.length; i++ ){
        fetch(`http://www.omdbapi.com/?i=${watchlistArray[i]}&apikey=697a5c4e`)
                .then(res => res.json())
                .then(data =>{
                    watchlistArea.insertAdjacentHTML("beforeend", `
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
                                            <button id="${data.imdbID}">-</button>
                                            <p>Remove</p>
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
                        const watchlistArray = JSON.parse(text)
                        const index = watchlistArray.indexOf(data.imdbID)
                        if (index > -1) { 
                            watchlistArray.splice(index, 1)
                        }
                        localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray))
                        window.location.reload()
                    })
                })
    }
}

renderWatchlist()
