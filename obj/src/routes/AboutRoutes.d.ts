import { IReferences } from 'pip-services-commons-node';
import { FacadeRoutes } from './FacadeRoutes';
export declare class AboutRoutes extends FacadeRoutes {
    private _containerInfo;
    setReferences(references: IReferences): void;
    protected register(): void;
    private getNetworkAddresses();
    private getAbout(req, res);
}
