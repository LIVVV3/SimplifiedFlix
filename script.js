const movieGrid = document.querySelector('.movies-grid');
const searchInput = document.querySelector('#searchInput');
const resultsInfo = document.querySelector('#resultsInfo');

async function fetchMovieData(searchTerm = 'avengers') {
    const response = await fetch(`https://www.omdbapi.com/?apikey=5272e65&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    if (data.Response === 'True') {
        const moviesArray = data.Search;
        movieGrid.innerHTML = moviesArray.map(movie => movieHTML(movie)).join('');
    } else {
        movieGrid.innerHTML = `<p class="no-results">${data.Error || 'No movies found.'}</p>`;
    }
}

function searchMovies(event) {
    event.preventDefault(); // Prevents page reload
    const query = searchInput.value.trim();
    if (!query) return;

    if (resultsInfo) {
        resultsInfo.innerHTML = `<span>Showing: </span>${query}`;
    }

    fetchMovieData(query);
}

function sortMovies(event) {
    const sortValue = event.target.value;
    const moviesArray = Array.from(movieGrid.children);

    if (sortValue === 'a-z') {
        moviesArray.sort((a, b) => {
            const titleA = a.querySelector('.movie-card__title')?.textContent.toLowerCase() || '';
            const titleB = b.querySelector('.movie-card__title')?.textContent.toLowerCase() || '';
            return titleA.localeCompare(titleB);
        });
    } else if (sortValue === 'z-a') {
        moviesArray.sort((a, b) => {
            const titleA = a.querySelector('.movie-card__title')?.textContent.toLowerCase() || '';
            const titleB = b.querySelector('.movie-card__title')?.textContent.toLowerCase() || '';
            return titleB.localeCompare(titleA);
        });
    } else if (sortValue === 'newest') {
        moviesArray.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.movie-card__year')?.textContent) || 0;
            const yearB = parseInt(b.querySelector('.movie-card__year')?.textContent) || 0;
            return yearB - yearA;
        });
    } else if (sortValue === 'oldest') {
        moviesArray.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.movie-card__year')?.textContent) || 0;
            const yearB = parseInt(b.querySelector('.movie-card__year')?.textContent) || 0;
            return yearA - yearB;
        });
    }

    movieGrid.innerHTML = '';
    moviesArray.forEach(movie => movieGrid.appendChild(movie));
}

function movieHTML(movie) {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
    return `
        <div class="movie-card">
            <img class="movie-card__img" src="${poster}" alt="${movie.Title}">
            <h2 class="movie-card__title">${movie.Title}</h2>
            <p class="movie-card__year">${movie.Year}</p>
        </div>
    `;
}

// Initial load
fetchMovieData();