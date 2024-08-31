const results = document.getElementById('searchresults')
let mywatchlist = []

document.addEventListener('click', e=> {
  if(e.target.dataset.id) { handleMywatchlistclick(e.target.dataset.id) }
})
function renderMovies() {
        mywatchlist = JSON.parse( localStorage.getItem("mywatchlist") )
        console.log(mywatchlist)
        let i=0
        results.innerHTML=''
                for(const title of mywatchlist) {
                        
                let request=`https://www.omdbapi.com/?apikey=8d632f91&t=${encodeURIComponent(title)}`
            //      console.log(d)
            //      console.log(request)
                    
                fetch(request)
                .then(tr=>tr.json())
                .then(tdata=> { 
                        td=tdata
                                            console.log("ID: " + i + " Title: " + title + " WL: " + mywatchlist[i])

                            //  console.log(tdata)
                                    results.innerHTML+=`<div class="oneresult">
                    <img id='poster' src='${td.Poster}'>
                    <div id='titledesc'>
                        <div class='titlehead'>
                            <span>${td.Title}</span>
                            <span id="stars"><img src="img/star.svg">${td.imdbRating}</span>
                        </div>
                        <div class='titlesub'>
                            <span>${td.Runtime}</span>
                            <span>${td.Genre}</span>
                            <span id='delwatchlist' data-title="${td.Title}" data-id="${i}">
                                <img id="delicon" src="img/delicon.svg">Remove
                            </span>                     
                        </div>
                        <div class='titleplot'>${tdata.Plot}</div>
                    </div>
                </div>
                `
                i++
                    })
            
            
                }
        
}
renderMovies()
function handleMywatchlistclick(id)  {
                      console.log("Clicked " + id)
                      console.log("LS: " + mywatchlist)
                      mywatchlist.splice(id,1)
                      localStorage.setItem("mywatchlist", JSON.stringify(mywatchlist) )
                      console.log(mywatchlist)
                      renderMovies()
                    }