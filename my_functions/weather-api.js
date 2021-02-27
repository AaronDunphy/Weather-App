const axios = require("axios");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async (event, context) => {
  if (event.queryStringParameters.location) {
    try {
      return axios
        .get(
          `https://www.metaweather.com/api/location/${event.queryStringParameters.location}`
        )
        .then((resp) => {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              ...resp.data,
            }),
          };
        });
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Error!",
        }),
      };
    }
  }

  if (event.queryStringParameters.searchQuery) {
    try {
      return axios
        .get(
          `https://www.metaweather.com/api/location/search?query=${event.queryStringParameters.searchQuery}`
        )
        .then((resp) => {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              locations: resp.data,
            }),
          };
        });
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Error!",
        }),
      };
    }
  }
};
