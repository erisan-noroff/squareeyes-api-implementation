import { ApiClient } from './apiClient.js';

class Home {
    async init () {
        let filteredMovies;
        const apiClient = new ApiClient();
        try {
            // No parameter required to fetch all movies.
            const response = await apiClient.get('');

            // Rather than making several requests to the API, we filter the top 4 highest movies we want from the full list.
            filteredMovies = response.data.sort((a, b) => b.rating - a.rating).slice(0, 4);
        } catch (e) {
            console.error(e.message);
            // Fallback in case the loading indicator element is not found in the DOM.
            const loadingIndicator = document.getElementById('loading-indicator');
            loadingIndicator
                ? loadingIndicator.innerText = 'Failed to load movies. Please try again later.'
                : alert('Failed to load movies. Please try again later.');
            return;
        }

        // Populating the list of movies. Replaces the loading indicator with the actual content once loaded.
        const moviesContainer = document.getElementById('movies-container');
        moviesContainer.innerHTML = filteredMovies.map(movie => `
            <div class="movie-card">
                <a href="movie.html?id=${movie.id}">
                    <img src="${movie.data.image.url?.length > 0 ? movie.data.image.url : ''}" alt="${movie.image.alt?.length > 0 ? movie.image.alt : movie.title} movie cover image" />
                </a>
                <p><a href="movies.html?id=${movie.id}">${movie.title}</a></p>
                <p>${movie.price},-</p>
                <a href="checkout.html" class="button">add to cart</a>
            </div>
        `).join('');

        // Removes the loading indicator once the list has been populated.
        if (moviesContainer.innerText && filteredMovies.length > 0)
            document.getElementById('hidden-until-loaded').classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const home = new Home();
    await home.init();
});