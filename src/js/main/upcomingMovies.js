import fetchUpcomingMovies from '../api/fetchUpcomingMovies';
import  htmlMarkupFilmsSerchHelper  from '../main/upcomingMovieMarkup';
import refs from '../allRefs/refs';
import arrayGenres from './arrayGenres';
import { getGenres } from '../main/renderMain';
import { renderModal } from '../more_info/more_info';
import { addTrailerPlayer } from '../main/showMovieTrailer';
// import {tns} from './src/tiny-slider.js';
import { tns } from 'tiny-slider';
// console.log(tns);
// console.log(htmlMarkupFilmsSerchHelper);
// console.log(getGenres);
// console.log(fetchUpcomingMovies);
// console.log(refs.upcomingMovies);
const slider = tns({
    container: '.my-slider',
    items: 8,
    responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 5
      },
      700: {
        gutter: 30
      },
      900: {
        items: 3
      }
    }
  });

// ================== add listeners ============
refs.upcomingMovies.addEventListener('click', onMovieCard)


fetchUpcomingMovies().then(r => {
    const movies = r.results.slice(0, 8);
    // console.log(movies);
    refs.upcomingMovies.insertAdjacentHTML('beforeend', renderUpconingMovies(movies));
    
})

function renderUpconingMovies(movies) {
    return movies.map(({ id, poster_path, title, release_date, vote_average, genre_ids  }) => {
        const releaseYear = release_date ? release_date.split('-')[0] : 'No';
        const movieGenre = genre_ids ? getGenres(genre_ids) : 'Unknown';
        const poster = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
        
    return htmlMarkupFilmsSerchHelper(id, poster, title, releaseYear, vote_average , movieGenre )    
    //     return`     
    //     <li class='upcoming__item' id=${id}>
    //     <img class="upcoming___image" style = "border-radius: 5px" src=${poster} alt='Обложка фильма' loading='lazy' />
    //     <div class='upcoming__info'>
    //         <p class='upcoming__info-title'>
    //         <b>${title}</b>
    //         </p>
    //         <p class='upcoming__info-date'>
    //         <span>${vote_average} | ${releaseYear}</span>
    //         </p>
    //     </div>
    // </li>
    // `;
    })
    .join('');
}

function onMovieCard(e) {
    // console.log(e);
    const cardItemId = e.target.id;
    // console.log(cardItemId);
    renderModal(cardItemId);
    addTrailerPlayer(cardItemId);    
}