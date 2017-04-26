"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const FacadeOperations_1 = require("./FacadeOperations");
class AboutOperations extends FacadeOperations_1.FacadeOperations {
    setReferences(references) {
        super.setReferences(references);
        this._containerInfo = references.getOneOptional(new pip_services_commons_node_1.Descriptor('pip-services-container', 'container-info', '*', '*', '*'));
    }
    getNetworkAddresses() {
        let interfaces = os.networkInterfaces();
        let addresses = [];
        for (let k in interfaces) {
            for (let k2 in interfaces[k]) {
                let address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        return addresses;
    }
    getAbout(req, res) {
        let about = {
            server: {
                name: this._containerInfo != null ? this._containerInfo.name : 'unknown',
                description: this._containerInfo != null ? this._containerInfo.description : null,
                properties: this._containerInfo != null ? this._containerInfo.properties : null,
                uptime: this._containerInfo != null ? this._containerInfo.uptime : null,
                start_time: this._containerInfo != null ? this._containerInfo.startTime : null,
                current_time: new Date().toISOString(),
                protocol: req.protocol,
                host: pip_services_net_node_1.HttpRequestDetector.detectServerHost(req),
                addresses: this.getNetworkAddresses(),
                port: pip_services_net_node_1.HttpRequestDetector.detectServerPort(req),
                url: req.originalUrl,
            },
            client: {
                address: pip_services_net_node_1.HttpRequestDetector.detectAddress(req),
                client: pip_services_net_node_1.HttpRequestDetector.detectBrowser(req),
                platform: pip_services_net_node_1.HttpRequestDetector.detectPlatform(req),
                user: req.user
            }
        };
        res.json(about);
    }
}
exports.AboutOperations = AboutOperations;
//# sourceMappingURL=AboutOperations.js.map