export class ApiClient {
    constructor () {
        this.baseUrl = "https://v2.api.noroff.dev/square-eyes/";
    }
    
    async get (endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error occurred when retrieving data: ${response.statusText}`);
        }
        
        return await response.json();
    }
}