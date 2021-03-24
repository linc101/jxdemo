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
    // hostname:  "atlas-500",      //主机名称   批量部署时不能指定节点
    modelAddress: "edge-arm64/mosquitto",    //模型地址
    modelVersion:  "1.5.10-arm64",    // 模型版本
    projectId: "4cb54ec0af8b453f",        //projectId 
    clusterId: "edge-system--edge-cluster",         // clusterId 
    group: 'aaaa'
};

let token = fs.readFileSync("./data/token",{"encoding": "utf8"});
let header = {
    Authorization: token,
    'content-type': 'application/x-www-form-urlencoded'
};



axios.get(`${config.remoteEndpoint}/caas/clusters/label/nodes?clusterId=${app.clusterId}&label=&groupName=${app.group}`,{ headers: header }).then(function (response) {
    if( response.data.success){
        if(response.data.data.length == 0){
            console.log("no available node found")
        }
        else{
            app.instance = response.data.data.length;
            let appconfig = getFullAppConfig(app);
            let qs = querystring.stringify(appconfig);
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
        }
    }
    else{
        console.log(response.data.data);
    }
  })
  .catch(function (error) {
    console.log(error);
  });





