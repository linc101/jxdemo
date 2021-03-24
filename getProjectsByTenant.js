const axios = require('axios');
const { getFullAppConfig } = require('./templates');
const fs = require('fs');
const querystring = require('querystring');
const config = require('./config');

let token = fs.readFileSync("./data/token",{"encoding": "utf8"});

let header = {
    Authorization: token
};


let tId = "3c198518efbe492f";

let  projectsByTenant = (tenantId) => {
    axios.get(`${config.remoteEndpoint}/caas/tenants/${tenantId}/projects`,{ headers: header }) .then(function (response) {
        if( response.data.success){
            let projects = [];
            response.data.data.forEach((item)=> {
                projects.push({
                    projectId: item.projectId,
                    tenantId: item.tenantId,
                    nanemspaceList: JSON.stringify(item.namespaceList)
                });
                console.log(projects);
                fs.writeFile('./data/projects',JSON.stringify(projects), (err) => {
                    if (err) throw err;
                });
            });
        }
        else{
            console.log(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}
projectsByTenant(tId);

