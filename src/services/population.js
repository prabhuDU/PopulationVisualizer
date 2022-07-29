const axios = require("axios").default;
const populationApi =
  "https://datausa.io/api/data?drilldowns=State&measures=Population";

async function getPopulation(params) {
  var res;
  await axios
    .get(populationApi)
    .then(function (response) {
      // handle success
      console.log(response);
      res = response;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  console.log(res);
  return res;
}

export { getPopulation };
