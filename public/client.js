'use strict';


const serverbase = '//localhost:8080/';
const streamURL = serverbase + 'stream';


// Full link path: http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg

// Poster Path: /nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg


//movie list template
function movieListTemplate(item) {
  console.log('enter movie list template');
  return `<li class = "movie-item">
    <p><span class="movie-title">${item.title}</span></p>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.posterPath}"</></div>
    <div class = "release-date">Release Date:  ${item.releaseDate}</div>
    <div class="movie-item-controls">
    <button class="view-movie">
    <span class="button-label">View</span>
    </button>
    </div>
    </li>`;
}

function movieCardTemplate(item) {
  return `<div class = "movie-card"></div><p><span class="movie-title">${item.title}</span></p>
  <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.posterPath}"</></div>
  <div class = "release-date">Release Date:  ${item.releaseDate}</div>
  <p>Overview: ${item.overview}</p><p>Rating: ${item.voteAvg}</p>
  <ul class="stream-list">
  <li>${item.amazon}</li>
  <li>${item.HBO}</li>
  <li>${item.netflix}</li>
  <li>${item.hulu}</li></ul>
  <div class="movie-item-controls">
  <button class="add-to-box-office">
  <span class="button-label">Add to Box Office</span>
  </button>
  `;
}

function getMovieList() {
  console.log('getMovieList');
  console.log('URL' + streamURL);
  $.ajax({
    url: streamURL,
    data: {
      format: 'json'
    },
    success: function(data) {
      displayMovieList();
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList


function displayMovieList(data) {
  console.log('displayMovieList');
  let movie;
  let Element = data.map(item => {
    movie = movieListTemplate(item);
    $('.movie-list').append(movie);

    // let item = {
    //   title: 'Die Hard',
    //   posterPath: 'nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
    //   releaseDate: '8/5/1982'
    // };
    //   //temp data to test DOM manipulation
    // let movie = [];
    // //render item to HTML
    // for (let i = 0; i < 10; i++) {

    // }
  });
} //end displayMovieList


function getMovieCard() {
  console.log('enter getMovieCard');
  $('.view-movie').on('click', event => {
    event.preventDefault();

    let item = {
      title: 'Die Hard',
      posterPath: 'nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
      releaseDate: '8/5/1982',
      overview: 'This is an excellent moview for the whole family to see',
      voteAvg: '8',
      netflix: 'true',
      amazon: 'true',
      HBO: 'false',
      hulu: 'true'
    };
    // $.ajax({
    //     url: streamURL,
    //     data: {
    //       format: 'json'
    //     },
    //     success: displayMovieCard,
    //     type: 'GET'
    //   });
    displayMovieCard(item);
  });

} //end getMovieCard


function displayMovieCard(data) {
  console.log('displayMovieCard');
  let card;
  $('.movie-list').remove();
  card = movieCardTemplate(data);
  $('.movie-list-form').append(card);
} //end displayMovieCard


$(displayMovieList);
$(getMovieCard);