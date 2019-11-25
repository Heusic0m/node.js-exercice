#!/usr/bin/env node
const { getCode } = require("country-list");
const axios = require("axios");

let country = process.argv[2];
let year = process.argv[3];

if (typeof year === "undefined") {
  year = new Date().getFullYear();
}

if (typeof country !== "undefined") {
  let countrycode = getCode(country);

  if (countrycode != undefined) {
    axios
      .get(`https://date.nager.at/api/v2/publicholidays/${year}/${countrycode}`)
      .then(response => {
        const data = response.data;

        data.map(element => {
          console.log(element.date, element.name);
        });
      });
  }
}
