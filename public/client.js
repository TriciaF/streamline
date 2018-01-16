'use strict';


const serverbase = '//localhost:8080/';
const streamURL = serverbase + 'stream';


// Full link path: http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg

// Poster Path: /nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg


//movie list template
function movieListTemplate(item) {
  console.log('movieListTemplate');

  return `<li class = "movie-item">
    <p><span class="movie-title">${item.title}</span></p>
    <div class = "id" style="display:none;">${item._id}</div>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185/${item.poster_path}"</></div>
    <div class = "release-date">Release Date:  ${item.release_date}</div>
    <div class="movie-item-controls">
    <button class="view-movie">
    <span class="button-label">View</span>
    </button>
    </div>
    </li>`;
}

function movieCardTemplate(item) {
  console.log('movieCardTemplate');
  console.log(item);
  return `<li class = "movie-item">
    <p><span class="movie-title">${item.title}</span></p>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.poster_path}"</></div>
    <div class = "release-date">Release Date: ${item.release_date}</div>
    <p>Overview: ${item.overview}</p><p>Rating: ${item.vote_average}</p>
    <ul class="stream-list">
      <li>Amazon: ${item.amazon}</li>
      <li>HBO: ${item.hbo}</li>
      <li>Netflix: ${item.netflix}</li>
      <li>Hulu: ${item.hulu}</li></ul>
    <div class="movie-item-controls">
      <button class="add-to-box-office">
      <span class="button-label">Add to Box Office</span>
      </button></div>
      </li>`;
}

function getMovieList() {
  console.log('getMovieList');

  $.ajax({
    url: streamURL,
    data: {
      format: 'json'
    },
    success: function(data) {
      displayMovieList(data);
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList


function displayMovieList(data) {
  console.log('displayMovieList');
  console.log(data);
  const movie = data.map((item) => movieListTemplate(item));
  $('.movie-list').html(movie);

} //end displayMovieList


function getMovieCard() {
  console.log('getMovieCard');
  $('.movie-list').on('click', '.view-movie',
    event => {
      console.log('view click');
      event.preventDefault();
      let id = $(event.currentTarget).closest('li').find('div.id');
      let _id = id[0].innerHTML;

      $.ajax({
        url: streamURL + '/' + _id,
        data: {
          format: 'json'
        },
        success: function(data) {
          displayMovieCard(data);
        },
        type: 'GET'
      });

    });

} //end getMovieCard


function displayMovieCard(data) {
  console.log('displayMovieCard');
  $('.movie-list').remove();
  const movie = movieCardTemplate(data);
  console.log(movie);
  $('#movie-list-form').html(movie);

} //end displayMovieCard


$(getMovieList);
$(displayMovieList);
$(getMovieCard);