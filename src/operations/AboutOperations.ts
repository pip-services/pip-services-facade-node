let os = require('os');

import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ContainerInfo } from 'pip-services-container-node';
import { HttpRequestDetector } from 'pip-services-net-node';

import { FacadeOperations } from './FacadeOperations';

export class AboutOperations extends FacadeOperations {
    private _containerInfo: ContainerInfo;

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._containerInfo = references.getOneOptional<ContainerInfo>(
            new Descriptor('pip-services-container', 'container-info', '*', '*', '*')
        );
    }

    private getNetworkAddresses(): string[] {
        let interfaces = os.networkInterfaces();
        let addresses: string[] = [];
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

    public getAbout(req, res) {
        let about = {
            server: {
                name: this._containerInfo != null ? this._containerInfo.name : 'unknown',
                description: this._containerInfo != null ? this._containerInfo.description : null,
                properties: this._containerInfo != null ? this._containerInfo.properties : null,
                uptime: this._containerInfo != null ? this._containerInfo.uptime : null,
                start_time: this._containerInfo != null ? this._containerInfo.startTime : null,

                current_time: new Date().toISOString(),
                protocol: req.protocol,
                host: HttpRequestDetector.detectServerHost(req),
                addresses: this.getNetworkAddresses(),
                port: HttpRequestDetector.detectServerPort(req),
                url: req.originalUrl,
            },
            client: {
                address: HttpRequestDetector.detectAddress(req),
                client: HttpRequestDetector.detectBrowser(req),
                platform: HttpRequestDetector.detectPlatform(req),
                user: req.user
            }
        };

        res.json(about);
    }

}
