import { ApiClient } from './apiClient.js';

class MovieDescription {
    constructor (movieId) {
        this.movieId = movieId;
    }

    async init () {
        const movie = await new ApiClient().get(this.movieId);
        if (!movie)
            throw new Error(`Error occurred when retrieving movie data: ${movie}`);

        try {
            const metaData = document.querySelector('meta');
            metaData.setAttribute('content', `${movie.data.title} movie description page`);
            metaData.setAttribute('title', `${movie.data.title} movie details`);
            document.getElementById('movie-title').innerText = movie.data.title;
            document.getElementById('movie-description').innerText = movie.data.description;
            document.getElementById('movie-price').innerText = `${movie.data.price},-`;
            document.getElementById('movie-image').src = movie.data.image.url?.length > 0
                ? movie.data.image.url
                : '';
            document.getElementById('movie-image').alt = movie.data.image.alt?.length > 0
                ? movie.data.image.alt
                : `${movie.data.title} movie cover`;
        } catch (e) {
            throw new Error(`Unexpected error ${e.message} occurred when loading movie details.`);
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const parameters = new URLSearchParams(window.location.search);
    const movie = new MovieDescription(parameters.get('id'));
    await movie.init();
});