import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input');


input.addEventListener('input', debounce((e) => {
    countryInput = e.target.value.trim;
    if (data.length === 0) {
        return;
    }

    fetchCountries(countryInput)
    .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (data.length >= 2 && data.length <= 10) {
            console.log(data)
        } else if (data.length === 1) {
            console.log(data)
        } 
        // Data handling
        })
        .catch(error => {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            // Error handling
        })
}, DEBOUNCE_DELAY)
);







