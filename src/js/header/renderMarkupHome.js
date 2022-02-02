import fetchFavoritesMovies from '../api/fetchFavoritesMovies';
import preloader from '../main/preloader';
import { arrayGenres, renderGallery } from '../main/renderMain';

const refs = {
  gallery: document.querySelector('.list_film'),
  homeLink: document.querySelector('.page__home'),
  libraryLink: document.querySelector('.page__library'),
  headerContainer: document.querySelector('.header'),
  libraryButtonBox: document.querySelector('.library__button-box'),
  formSearch: document.querySelector('.form__search'),
};

refs.homeLink.addEventListener('click', renderMarkupHome);

export default function renderMarkupHome(e) {
  e.preventDefault();

  fetchFavoritesMovies().then(data => {
    preloader();

    refs.gallery.innerHTML = '';
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.results));
  });

  if (!refs.homeLink.classList.contains('active')) {
    refs.headerContainer.classList.add('header');
    refs.headerContainer.classList.remove('header__library');

    refs.libraryLink.classList.remove('active');
    refs.homeLink.classList.add('active');

    refs.libraryButtonBox.classList.add('is-hidden');
    refs.formSearch.classList.remove('is-hidden');
  }
}