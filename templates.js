const getFullAppConfig = (app) => {
    const appTemplate = `{
        "namespace": "${app.namespace}",
        "serviceTemplate.name": "${app.name}",
        "serviceTemplate.tenant": "${app.tenantName}",
        "serviceTemplate.external": 0,
        "serviceTemplate.type": 1,
        "serviceTemplate.isPublic": false,
        "serviceTemplate.deploymentDetail.createDefaultSvc": false,
        "serviceTemplate.deploymentDetail.restartPolicy": "Always",
        "serviceTemplate.deploymentDetail.name": "${app.name}",
        "serviceTemplate.deploymentDetail.instance": ${app.instance},
        "serviceTemplate.deploymentDetail.strategyType": 4,
        "serviceTemplate.deploymentDetail.isPrivilege": 0,
        "serviceTemplate.deploymentDetail.hostIPC": false,
        "serviceTemplate.deploymentDetail.hostPID": false,
        "serviceTemplate.deploymentDetail.hostNetwork": false,
        "serviceTemplate.deploymentDetail.nodeAffinity[0].label": "${getLabel(app)}",
        "serviceTemplate.deploymentDetail.nodeAffinity[0].required": true,
        "serviceTemplate.deploymentDetail.containers[0].name": "${app.name}",
        "serviceTemplate.deploymentDetail.containers[0].img": "${app.modelAddress}",
        "serviceTemplate.deploymentDetail.containers[0].tag": "${app.modelVersion}",
        "serviceTemplate.deploymentDetail.containers[0].resource.cpu": "100m",
        "serviceTemplate.deploymentDetail.containers[0].resource.memory": "128",
        "serviceTemplate.deploymentDetail.containers[0].env[0].key": "TZ",
        "serviceTemplate.deploymentDetail.containers[0].env[0].value": "Asia/Shanghai",
        "serviceTemplate.deploymentDetail.containers[0].ports[0].protocol": "TCP",
        "serviceTemplate.deploymentDetail.containers[0].ports[0].name": "TCP",
        "serviceTemplate.deploymentDetail.containers[0].ports[0].port": 80,
        "serviceTemplate.deploymentDetail.containers[0].ports[0].expose": true,
        "serviceTemplate.deploymentDetail.containers[0].imagePullPolicy": "IfNotPresent",
        "serviceTemplate.deploymentDetail.containers[0].securityContext.security": true,
        "serviceTemplate.deploymentDetail.containers[0].securityContext.privileged": true,
        "serviceTemplate.deploymentDetail.containers[0].limit.cpu": "100m",
        "serviceTemplate.deploymentDetail.containers[0].limit.memory": "128",
        "serviceTemplate.deploymentDetail.containers[0].limit.currentRate": 1,
        "serviceTemplate.deploymentDetail.containers[0].faultIsolation": false,
        "serviceTemplate.projectId": "${app.projectId}",
        "clusterId": "${app.clusterId}",
        ${ifpodDisperse(app)}
        "serviceTemplate.deploymentDetail.podDisperse.required": true,
        "projectId": "${app.projectId}"
    }`
    ;
    return JSON.parse(appTemplate);
}

let getLabel = (app) => {
    if(app.hostname){
        return `hostname=${app.hostname}`;
    }
    else if (app.group){
        return `group=${app.group}`;
    }
}
let ifpodDisperse = (app) => {
    if(app.group) {
        return `"serviceTemplate.deploymentDetail.podDisperse.required": true,`; 
    }
    else{
        return '';
    }
}
module.exports = {
    getFullAppConfig: getFullAppConfig,
};