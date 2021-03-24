const axios = require('axios');
const fs = require('fs');
const config = require('./config');
const FormData = require('form-data');
const form = new FormData();
form.append('username', config.username);
form.append('password', config.password);

axios.post(`${config.remoteEndpoint}/user/auth/login`, form, { headers: form.getHeaders() }) .then(function (response) {
    console.log(response);
    let token = response.data.data.token;
    fs.writeFile('./data/token',token, (err) => {
        if (err) throw err;
        console.log('token 已保存');
      });
  })
  .catch(function (error) {
    console.log(error);
  });
