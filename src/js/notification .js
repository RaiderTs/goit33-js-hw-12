import Notiflix from 'notiflix';

function overTen() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function error() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

export default {
  overTen,
  error,
};
