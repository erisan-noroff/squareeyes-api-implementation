export class Cart {
    constructor() {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        this.cartItems = storedCart ? storedCart : {};
    }

    addToCart(movie) {
        // To make the key case insensitive, all keys are stored in lowercase.
        const lowerCaseTitle = movie.title.toLowerCase();
        
        // Prevent adding the same movie multiple times. If this site sold physical copies, we would handle quantity instead.
        if(this.cartItems[lowerCaseTitle])
            return;

        this.cartItems[lowerCaseTitle] = new CartItem(movie);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}

class CartItem {
    constructor(movie) {
        this.movieTitle = movie.title;
        this.moviePrice = movie.price;
    }
}
