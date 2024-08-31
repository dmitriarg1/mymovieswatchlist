const movieName = document.getElementById('moviename')
const mysearch = document.getElementById('search')
const results = document.getElementById('searchresults')
let mywatchlist = []

document.addEventListener('click', e=> {
  if(e.target.dataset.title) { handleMywatchlistclick(e.target.dataset.title) }
})

mysearch.addEventListener('click',e=> {
    let m=movieName.value
    results.innerHTML=""
    console.log(m)
  fetch(`https://www.omdbapi.com/?apikey=8d632f91&s=${m}&plot=short`)
    .then(r=>r.json())
    .then(data=> {
    //   console.log(data)
    let td={}
        for(const d of data.Search) {
          let request=`https://www.omdbapi.com/?apikey=8d632f91&t=${encodeURIComponent(d.Title)}`
       //      console.log(d)
             console.log(d.Title)
       //      console.log(request)
            
          fetch(request)
           .then(tr=>tr.json())
           .then(tdata=> { 
                  td=tdata
                       //  console.log(tdata)
                            results.innerHTML+=`<div class="oneresult">
              <img id='poster' src='${d.Poster}'>
              <div id='titledesc'>
                <div class='titlehead'>
                      <span>${d.Title}</span>
                      <span id="stars"><img src="img/star.svg">${td.imdbRating}</span>
                </div>
                <div class='titlesub'>
                      <span>${td.Runtime}</span>
                      <span>${td.Genre}</span>
                      <span id='addwatchlist' data-title="${d.Title}">
                        <img id="addicon" src="img/addicon.svg">Watchlist
                      </span>                     
                </div>
                <div class='titleplot'>${tdata.Plot}</div>
              </div>
           </div>
          `
              })
       
      
        }
        
    })
})

function handleMywatchlistclick(mytitle)  {
                      console.log("Clicked " + mytitle)
                      
                      mywatchlist = JSON.parse( localStorage.getItem("mywatchlist") )
                      console.log("LS: " + mywatchlist)
                      
          //            if(!mywatchlist.includes(mytitle)) 
          //            {
                      if(!mywatchlist) {
                        localStorage.clear()
                        mywatchlist=[mytitle]
                      }
                      if(!mywatchlist.includes(mytitle)) {
                        mywatchlist.push(mytitle) 
                      }
         //             }
                      localStorage.setItem("mywatchlist", JSON.stringify(mywatchlist) )
                      console.log(mywatchlist)
                    }