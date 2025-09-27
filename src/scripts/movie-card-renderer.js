export class MovieCardRenderer {
    constructor (moviesContainer, movies) {
        this.moviesContainer = moviesContainer;
        this.movies = movies;
    }

    init () {
        this.moviesContainer.innerHTML = this.movies.map(movie => `
            <div class="movie-card">
                <a href="movie.html?id=${movie.id}">
                    <img src="${movie.image.url?.length > 0 ? movie.image.url : ''}" alt="${movie.image.alt?.length > 0 ? movie.image.alt : movie.title} movie cover image" />
                </a>
                <p><a href="movies.html?id=${movie.id}">${movie.title}</a></p>
                <p>${movie.price},-</p>
                <a href="checkout.html" class="button">add to cart</a>
            </div>
        `).join('');
    }
}