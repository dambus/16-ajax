'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className) {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call Country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // render country 1
//     renderCountry(data);

//     //get neighbour country
//     const [neighbour] = data.borders;
//     console.log(neighbour);

//     if (!neighbour) return;

//     //AJAX Call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       console.log(this.reposnseText);
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('japan');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  });
};
const getCountryData = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`something went wrong - ${err.message}. Please try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function (lat, lng) {
  let nameOfCountry;
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381&localityLanguage=en`
  )
    .then(response => {
      // console.log(response.json());
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      nameOfCountry = data.countryName;
    })
    .catch(err => {
      countriesContainer.insertAdjacentText(
        `Something went wrong - ${err.message}`
      );
    })
    .finally(() => {
      // console.log(nameOfCountry);
      getCountryData(nameOfCountry);
      countriesContainer.style.opacity = 1;
    });
};

// whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// btn.addEventListener('click', () => {
//   getCountryData('australia');
// });
