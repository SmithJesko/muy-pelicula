let apikey = 'd30f5732';
let playerapikey = 'iAc7klBC7bQqpwWO';

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get(`http://www.omdbapi.com?apikey=${apikey}&s=${searchText}`)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="card">
                    <img class="card-img-top" src="${movie.Poster}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text"><small class="text-muted">${movie.Year} | ID: ${movie.imdbID}</small></p>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
                `;
            });
            $('#movies').html(output);
        })
        .catch((e) => {
            console.log(e);
        });
};

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
};

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get(`http://www.omdbapi.com?apikey=${apikey}&i=${movieId}`)
        .then((response) => {
            console.log(movieId);
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        <ul>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <div class="well">
                            <h3>Plot</h3>
                            ${movie.Plot}
                            <hr>
                            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="player.html">Watch Movie</a>
                            <a href="index.html" class="btn btn-secondary">Go Back to Search</a>
                        </div>
                    </div>
                </div>
            `;
            $('#movie').html(output);
        })
        .catch((e) => {
            console.log(e);
        });
}

function getPlayer() {
    let movieId = sessionStorage.getItem('movieId');
    let output = `
    <iframe src="https://videospider.in/getvideo?key=${playerapikey}&video_id=${movieId}" width="800" height="600" frameborder="0" allowfullscreen="true" scrolling="no"></iframe>
    `;
    $('#player').html(output);
}