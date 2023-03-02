import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce((e) => {
    const countryInput = e.target.value.trim();
    if (countryInput === ""){
        return
    };
    fetchCountries(countryInput)
        .then(data => {
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if (data.length >= 2 && data.length <= 10) {
                countryList.innerHTML = countryListMarkup(data);
                console.log(data)
            } else if (data.length === 1) {
                countryInfo.innerHTML = countryMarkup(data);
                console.log(data)
            } else if (data.length === 0) {
                input.value = "";
                return;
            }
            // Data handling
        })
        .catch(error => {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            // Error handling
        })
}, DEBOUNCE_DELAY)
);

function countryListMarkup(data) {
   return data.map(country => 
    `<li>
    <img
    src = "${country.flags.svg}"
    alt = "${country.name} flag" 
    width = 150px 
    </img>
    <h2>${country.name.official}</h2>
    </li>`
   )
    .join('');
    
}

function countryMarkup(data) {
    return data.map(country =>
    `<ul>
    <li><img
    src = "${country.flags.svg}"
    alt = "${country.name} flag" 
    width = 150px 
    </img></li>
    <li><h2 class = country>${country.name.official}</h2></li>
    <li class = name>${country.capital}</li>
    <li class = pop>${country.population}</li>
    <li class = lang>${Object.values(country.languages)}</li>
    </ul>`
    );
}
