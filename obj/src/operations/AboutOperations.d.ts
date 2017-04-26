import { IReferences } from 'pip-services-commons-node';
import { FacadeOperations } from './FacadeOperations';
export declare class AboutOperations extends FacadeOperations {
    private _containerInfo;
    setReferences(references: IReferences): void;
    private getNetworkAddresses();
    getAbout(req: any, res: any): void;
}
