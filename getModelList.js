const axios = require('axios');
const { getFullAppConfig } = require('./templates');
const fs = require('fs');
const querystring = require('querystring');
const config = require('./config');
let token = fs.readFileSync("./data/token",{"encoding": "utf8"});
let tenantId = "3c198518efbe492f";
let projectId = "4cb54ec0af8b453f";

let header = {
    Authorization: token
};
axios.get(`${config.remoteEndpoint}/caas/tenants/${tenantId}/projects/${projectId}/repositories/images`,{ headers: header }) .then(function (response) {
    if( response.data.success){
        let models = {
            private: [],
            public: []
        };
        console.log(response.data.data);
        response.data.data.public.forEach((repoItem)=> {
            let repo = {
                repoUrl: repoItem.fullNameRepo,
                version: []
            };
            repoItem.tags.forEach((item) => {
                repo.version.push(item);
            });
            models.public.push(repo);
        });
        response.data.data.private.forEach((repoItem)=> {
            let repo = {
                repoUrl: repoItem.fullNameRepo,
                version: []
            };
            repoItem.tags.forEach((item) => {
                repo.version.push(item);
            });
            models.private.push(repo);
        });
        console.log(JSON.stringify(models));
        fs.writeFile('./data/models',JSON.stringify(models), (err) => {
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


