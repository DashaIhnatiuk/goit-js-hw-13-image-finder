const API_KEY = '19314898-a321ad0327b9224b8439f7dcd';
const BASE_URL = 'https://pixabay.com/api'

export default class PixabayService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    async fetchPhotos() {
        try {
            const request = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=15&key=${API_KEY}`
        const response = await fetch(BASE_URL + request);
        const newResponse = await response.json();
        return newResponse.hits;
        } catch (error) {
            alert(error);
            console.log(error);
        }       
    }

    resetPage() {
        this.page = 1;
    }

    incrementPage() {
        this.page += 1;
    }
}