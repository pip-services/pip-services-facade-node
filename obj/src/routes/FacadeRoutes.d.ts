import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-commons-node';
import { CompositeCounters } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { IFacadeService } from '../services/IFacadeService';
export declare abstract class FacadeRoutes implements IConfigurable, IReferenceable {
    protected _logger: CompositeLogger;
    protected _counters: CompositeCounters;
    protected _dependencyResolver: DependencyResolver;
    protected _service: IFacadeService;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    private instrument(correlationId, method, route);
    private getCorrelationId(req);
    registerRoute(method: string, route: string, action: (req: any, res: any) => void): void;
    registerRouteWithAuth(method: string, route: string, authorize: (req: any, res: any, next: () => void) => void, action: (req: any, res: any) => void): void;
    registerMiddleware(action: (req: any, res: any, next: () => void) => void): void;
    protected abstract register(): void;
}
