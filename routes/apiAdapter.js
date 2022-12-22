const axios = require("axios");

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: parseInt(process.env.TIME_OUT),
  });
};
