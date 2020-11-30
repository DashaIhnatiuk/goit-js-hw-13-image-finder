import PixabayService from './apiService';
import photosTpl from '../templates/templates.hbs'

const refs = getRefs();
const pixabayService = new PixabayService();

refs.searchForm.addEventListener('submit', onSearchClicked);

function onSearchClicked(e) {
    e.preventDefault();

    pixabayService.query = e.currentTarget.elements.query.value;

    if (pixabayService.query === '') {
    return alert('Enter something');
  }

    pixabayService.resetPage();
    clearPhotos();
    pixabayService.fetchPhotos().then(hits => {
        appendPhotosMarkup(hits);
        pixabayService.incrementPage();
    });
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && pixabayService.query !== '') {
            pixabayService.fetchPhotos().then(hits => {
                appendPhotosMarkup(hits);
                pixabayService.incrementPage();
            });
        }
    });
};

function clearPhotos(){
    refs.gallery.innerHTML = '';
}

function appendPhotosMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', photosTpl(hits));
}

function getRefs() {
    return {
        searchForm: document.querySelector('.search-form'),
        gallery: document.querySelector('.gallery'),
        scroll: document.querySelector('#scroll'),
    };
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '50px',
});
observer.observe(refs.scroll);