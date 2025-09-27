import { ApiClient } from './apiClient.js';
import { MovieCardRenderer } from './movie-card-renderer.js';

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
            const loadingIndicator = document.getElementById('loading');
            loadingIndicator
                ? loadingIndicator.innerText = 'Failed to load movies. Please try again later.'
                : alert('Failed to load movies. Please try again later.');
            return;
        }

        // Populating the list of movies. Replaces the loading indicator with the actual content once loaded.
        const moviesContainer = document.getElementById('movies-container');
        new MovieCardRenderer(moviesContainer, filteredMovies).init();

        // Shows the header once the content has been rendered
        if (moviesContainer.innerText && filteredMovies.length > 0)
            document.getElementById('hidden-until-loaded').classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await new Home().init();
});