'use strict';

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (country) {
  const html = `
        <article class="country}">
          <img class="country__img" src="${country.flag}" />
          <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +country.population / 1000000
            ).toFixed(2)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              country.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              country.currencies[0].code
            }</p>
          </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
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
      renderCountry(nameOfCountry);
      countriesContainer.style.opacity = 1;
    });
};
// whereAmI();
whereAmI(52.508, 13.381);
renderCountry('germany');
// whereAmI(2, 4);
