const axios = require('axios');
const { getFullAppConfig } = require('./templates');
const fs = require('fs');
const querystring = require('querystring');
const FormData = require('form-data');
const formUrlencoded = require("form-urlencoded");
const config = require('./config');

let app = {
    name: "mosqto5",         // 名称
    namespace: "tester-testns",    //namespace
    tenantName: "tester",    //租户名称
    tenantId: "3c198518efbe492f",  //租户ID
    instance: 1,     //实例数量
    hostname:  "atlas-500",      //主机名称
    modelAddress: "edge-arm64/mosquitto",    //模型地址
    modelVersion:  "1.5.10-arm64",    // 模型版本
    projectId: "4cb54ec0af8b453f",        //projectId 
    clusterId: "edge-system--edge-cluster"         // clusterId 
};
let appconfig = getFullAppConfig(app);
let token = fs.readFileSync("./data/token",{"encoding": "utf8"});
let qs = querystring.stringify(appconfig);
let header = {
    Authorization: token,
    'content-type': 'application/x-www-form-urlencoded'
};



axios.post(`${config.remoteEndpoint}/caas/tenants/${app.tenantId}/projects/${app.projectId}/deploys`, qs, { headers: header }) .then(function (response) {
    if( response.data.success){
        console.log(`${app.name}部署成功`);
    }
    else{
        console.log(response.data.data);
    }
  })
  .catch(function (error) {
    console.log(error);
  });


