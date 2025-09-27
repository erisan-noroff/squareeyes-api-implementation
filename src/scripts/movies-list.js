import { ApiClient } from './apiClient.js';
import { MovieCardRenderer } from './movie-card-renderer.js';

class MoviesList {
    async init () {
        const apiClient = new ApiClient();
        let sortedMovies;
        try {
            // No parameter required to fetch all movies.
            const response = await apiClient.get('');
            // Sorted by rating in descending order.
            sortedMovies = response.data.sort((a, b) => b.rating - a.rating);
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
        new MovieCardRenderer(moviesContainer, sortedMovies).init();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await new MoviesList().init();
});