import { ApiClient } from './apiClient.js';
import { MovieCardRenderer } from './movie-card-renderer.js';

class MoviesList {
    async init() {
        const apiClient = new ApiClient();
        try {
            // No parameter required to fetch all movies.
            const response = await apiClient.get('');
            // Sorted by rating in descending order (highest to lowest).
            this.sortedMovies = response.data.sort((a, b) => b.rating - a.rating);
            this.moviesContainer = document.getElementById('movies-container');
            this.movieCardRenderer = new MovieCardRenderer(this.moviesContainer, this.sortedMovies);
            this.addToggleFilterMenuListener();
        } catch(e) {
            // Fallback in case the loading indicator element is not found in the DOM.
            const loadingIndicator = document.getElementById('loading');
            loadingIndicator
                ? loadingIndicator.innerText = 'Failed to load movies. Please try again later.'
                : alert('Failed to load movies. Please try again later.');
        }
    }

    addToggleFilterMenuListener() {
        const filterBtn = document.getElementById('filter-toggle');
        const filterDropdown = document.getElementById('filter-dropdown');

        filterBtn.addEventListener('click', () => {
            const expanded = filterBtn.getAttribute('aria-expanded') === 'true';
            filterBtn.setAttribute('aria-expanded', !expanded);
            filterDropdown.style.display = expanded ? 'none' : 'block';
        });

        filterDropdown.addEventListener('click', (e) => {
            const filterOption = e.target.closest('[data-filter]');
            if(!filterOption)
                return;

            const selectedFilter = filterOption.getAttribute('data-filter');
            this.movieCardRenderer.movies = selectedFilter === 'none'
                ? this.sortedMovies
                : this.sortedMovies.filter(movie => movie.genre && movie.genre.toLowerCase() === selectedFilter.toLowerCase());
            this.movieCardRenderer.init();
        });
    }
}

await new MoviesList().init();