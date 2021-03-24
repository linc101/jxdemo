const axios = require('axios');
const { getFullAppConfig } = require('./templates');
const fs = require('fs');
const querystring = require('querystring');
const config = require('./config');

let token = fs.readFileSync("./data/token",{"encoding": "utf8"});

let header = {
    Authorization: token
};
axios.get(`${config.remoteEndpoint}/caas/tenants`,{ headers: header }) .then(function (response) {
    if( response.data.success){
        let tenants = [];
        response.data.data.forEach((item)=> {
            tenants.push({
                tenantName: item.tenantName,
                aliasName: item.aliasName,
                tenantId: item.tenantId
            });
        });
        console.log(tenants);
        fs.writeFile('./data/tenants',JSON.stringify(tenants), (err) => {
            if (err) throw err;
        });
    }
    else{
        console.log(response.data.data);
    }
  })
  .catch(function (error) {
    console.log(error);
  });


