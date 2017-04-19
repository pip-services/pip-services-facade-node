import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';

import { IFacadeService } from './IFacadeService';
import { FacadeService } from './FacadeService';

export class PartitionFacadeService extends FacadeService {
    protected _parent: IFacadeService;
    protected _dependencyResolver: DependencyResolver = new DependencyResolver();

    public constructor() {
        super();
        this._dependencyResolver.put('parent', new Descriptor('pip-services-facade', 'service', 'main', '*', '*'));
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._parent = this._dependencyResolver.getOneRequired<IFacadeService>('parent');
        this._parent.registerMiddlewareForPath(this._rootPath, this._partition);
    }

    public getRootPath(): string {
        return this._parent.getRootPath() + this._rootPath;
    }

}