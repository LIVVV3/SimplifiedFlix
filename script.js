
//http://www.omdbapi.com/?apikey=5272e65&
const movieGrid = document.querySelector('.movies-grid');

async function fetchMovieData() {
    const response = await fetch('http://www.omdbapi.com/?apikey=5272e65&s=avengers');
    const data = await response.json();
    console.log(data); // Debugging line to check API response

    // Check if the response is successful and contains movies
    if (data.Response === 'True') {
        const moviesArray = data.Search; // Access the array of movies
        movieGrid.innerHTML = moviesArray.map(movie => movieHTML(movie)).join('');
    } else {
        // Handle the case where no movies are found or there is an error
        console.error('No movies found:', data.Error);
    }
}

function sortMovies(event) {
    const sortValue = event.target.value;
    const moviesArray = Array.from(movieGrid.children); // Get the current movie cards as an array
    if (sortValue === 'a-z') {
        moviesArray.sort((a, b) => {
            const titleA = a.querySelector('.movie-card__title').textContent.toLowerCase();
            const titleB = b.querySelector('.movie-card__title').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });
    } else if (sortValue === 'z-a') {
        moviesArray.sort((a, b) => {
            const titleA = a.querySelector('.movie-card__title').textContent.toLowerCase();
            const titleB = b.querySelector('.movie-card__title').textContent.toLowerCase();
            return titleB.localeCompare(titleA);
        });
    }
    else if (sortValue === 'newest') {
        moviesArray.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.movie-card__year').textContent);
            const yearB = parseInt(b.querySelector('.movie-card__year').textContent);
            return yearB - yearA;
        });
    }
    else if (sortValue === 'oldest') {
        moviesArray.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.movie-card__year').textContent);
            const yearB = parseInt(b.querySelector('.movie-card__year').textContent);
            return yearA - yearB;
        });
    }
    // Clear the movie grid and append the sorted movies
    movieGrid.innerHTML = '';
    moviesArray.forEach(movie => movieGrid.appendChild(movie));
}

// Call the function to fetch and display movie data when the page loads


fetchMovieData();

function movieHTML(movie) {
    return `
        <div class="movie-card">
            <img class="movie-card__img" src="${movie.Poster}" alt="${movie.Title}">
            <h2 class="movie-card__title">${movie.Title}</h2>
            <p class="movie-card__year">${movie.Year}</p>
        </div>
    `;
}