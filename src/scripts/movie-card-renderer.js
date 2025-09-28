import { cartInstance } from './cart-instance.js';

export class MovieCardRenderer {
    constructor(moviesContainer, movies) {
        this.moviesContainer = moviesContainer;
        this.movies = movies;
    }

    init() {
        this.moviesContainer.innerHTML = this.movies.map((movie, index) => `
            <div class="movie-card">
                <a href="movie.html?id=${movie.id}">
                    <img src="${movie.image.url?.length > 0 ? movie.image.url : ''}" alt="${movie.image.alt?.length > 0 ? movie.image.alt : movie.title} movie cover image" />
                </a>
                <p><a href="movies.html?id=${movie.id}">${movie.title}</a></p>
                <p>${movie.price},-</p>
                <button type="button" data-i="${index}" class="button ${!cartInstance.cartItems[movie.title.toLowerCase()] ? 'add-to-cart-button' : ''}"
                ${!cartInstance.cartItems[movie.title.toLowerCase()] ? '' : 'disabled'}>
                ${!cartInstance.cartItems[movie.title.toLowerCase()] ? 'add to cart' : 'added to cart'}
                </button>
            </div>
        `).join('');

        const addToCartButtons = document.getElementsByClassName('add-to-cart-button');
        for(let i = 0; i < addToCartButtons.length; i++) {
            addToCartButtons[i].addEventListener('click', (e) => {
                cartInstance.addToCart(this.movies[e.target.dataset.i]);
                e.target.innerText = 'added to cart';
                e.target.setAttribute('disabled', '');
                e.target.classList.remove('add-to-cart-button');
            });
        }
    }
}

