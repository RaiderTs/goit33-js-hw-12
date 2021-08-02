import './css/styles.css';
import countryCard from './templates/countries.hbs';
import countryList from './templates/countriesList.hbs';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import notification from './js/notification ';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  refs.cardContainer.innerHTML = '';
  const name = refs.input.value.trim();
  if (!name) return;
  API.fetchCountry(name).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(data) {
  if (data.length === 1) {
    renderCountryCard(data);
    return;
  } else if (data.length <= 10 && data.length > 1) {
    renderCountryList(data);
    return;
  } else if (data.length > 10) {
    notification.overTen();
  }
}

function onFetchError() {
  notification.error();
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.cardContainer.innerHTML = markup;
}

function renderCountryList(list) {
  const markupList = countryList(list);
  refs.cardContainer.innerHTML = markupList;
}
