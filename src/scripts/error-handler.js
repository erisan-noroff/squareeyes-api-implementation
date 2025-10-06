export class ErrorHandler {
    static displayError(errorMessage) {
        // Fallback in case the loading indicator element is not found in the DOM.
        const loadingIndicator = document.getElementById('loading');
        errorMessage = `${errorMessage}.<br/>Please try again later. Contact us if the issue persists.`;
        if (loadingIndicator) {
            loadingIndicator.style.color = 'red';
            loadingIndicator.innerHTML = errorMessage;
        }
        else
            alert(errorMessage.replace('<br/>', '\n'));
    }
}