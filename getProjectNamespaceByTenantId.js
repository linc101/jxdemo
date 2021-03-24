const axios = require('axios');
const { getFullAppConfig } = require('./templates');
const fs = require('fs');
const querystring = require('querystring');
const config = require('./config');

let token = fs.readFileSync("./data/token",{"encoding": "utf8"});

let header = {
    Authorization: token
};


let tenantId = "3c198518efbe492f";


let  projectsByTenant = (tenantId) => {
    axios.get(`${config.remoteEndpoint}/caas/tenants/${tenantId}/projects`,{ headers: header }) .then(function (response) {
        if( response.data.success){
            let ns = [];
            response.data.data.forEach((item) => {
                item.namespaceList.forEach((namespace) => {
                    ns.push({
                        namespaceName: namespace.namespaceName,
                        tenantId: namespace.tenantId,
                        projectId: namespace.projectId,
                        prometheusPort: namespace.prometheusPort,
                        clusterId: namespace.clusterId
                    });
                });
            });
            console.log(ns);
            fs.writeFile('./data/projectnamespace',JSON.stringify(ns), (err) => {
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
}
projectsByTenant(tenantId);

