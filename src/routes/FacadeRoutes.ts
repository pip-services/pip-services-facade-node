let _ = require('lodash');

import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-commons-node';
import { CompositeCounters } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { BadRequestException } from 'pip-services-commons-node';
import { UnauthorizedException } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { ConflictException } from 'pip-services-commons-node';
import { UnknownException } from 'pip-services-commons-node';
import { HttpResponseSender } from 'pip-services-net-node';

import { IFacadeService } from '../services/IFacadeService';

export abstract class FacadeRoutes implements IConfigurable, IReferenceable {
    private static readonly _defaultConfig = ConfigParams.fromTuples(
        'dependencies.service', 'pip-services-facade:service:*:*:*' 
    );

    protected _logger = new CompositeLogger();
    protected _counters = new CompositeCounters();
    protected _dependencyResolver = new DependencyResolver(FacadeRoutes._defaultConfig);
    protected _service: IFacadeService;

    public constructor() {}

    public configure(config: ConfigParams): void {
        config = config.setDefaults(FacadeRoutes._defaultConfig);
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._service = this._dependencyResolver.getOneRequired<IFacadeService>('service');

        this.register();
    }

	protected instrument(correlationId: string, method: string, route: string): void {
		this._logger.debug(correlationId, "Calling %s %s", method, route);
		this._counters.incrementOne(route + "." + method + ".calls");
	}

    public registerRoute(method: string, route: string, 
        action: (req: any, res: any) => void): void {

        let actionCurl = (req, res) => { 
            let correlationId = this.getCorrelationId(req);
            this.instrument(correlationId, method, route);
            action.call(this, req, res); 
        };

        this._service.registerRoute(method, route, actionCurl);
    }

    public registerRouteWithAuth(method: string, route: string, 
        authorize: (req: any, res: any, next: () => void) => void,
        action: (req: any, res: any) => void): void {

        let actionCurl = (req, res) => { 
            let correlationId = this.getCorrelationId(req);
            this.instrument(correlationId, method, route);
            action.call(this, req, res); 
        };

        this._service.registerRouteWithAuth(method, route, authorize, actionCurl);
    }

    public registerMiddleware(action: (req: any, res: any) => void): void {

        let actionCurl = (req, res) => { 
            action.call(this, req, res); 
        };

        this._service.registerMiddleware(actionCurl);
    }

    protected abstract register(): void;

    protected getCorrelationId(req: any): any {
        return req.params.correlation_id;
    }

    protected getFilterParams(req: any): any {
        // Todo: Complete implementation
        return req.query;
    }

    protected getPagingParams(req: any): any {
        let paging: any = {};
        if (req.query.skip)
            paging.skip = parseInt(req.query.skip);
        if (req.query.take)
            paging.take = parseInt(req.query.take);
        if (req.query.paging)
            paging.paging = req.query.paging;
        return paging;
    }

    protected sendResult(req, res): (err: any, result: any) => void {
        return HttpResponseSender.sendResult(req, res);
    }

    protected sendCreatedResult(req, res): (err: any, result: any) => void {
        return HttpResponseSender.sendCreatedResult(req, res);
    }

    protected sendDeletedResult(req, res): (err: any, result: any) => void {
        return HttpResponseSender.sendDeletedResult(req, res);
    }

    protected sendError(req, res, error): void {
        HttpResponseSender.sendError(req, res, error);
    }

    protected sendBadRequest(req: any, res: any, message: string): void {
        let correlationId = this.getCorrelationId(req);
        let error = new BadRequestException(correlationId, 'BAD_REQUEST', message);
        this.sendError(req, res, error);
    }

    protected sendUnauthorized(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnauthorizedException(correlationId, 'UNAUTHORIZED', message);
        this.sendError(req, res, error);
    }

    protected sendNotFound(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new NotFoundException(correlationId, 'NOT_FOUND', message);
        this.sendError(req, res, error);
    }

    protected sendConflict(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new ConflictException(correlationId, 'CONFLICT', message);
        this.sendError(req, res, error);
    }

    protected sendSessionExpired(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnknownException(correlationId, 'SESSION_EXPIRED', message);
        error.status = 440;
        this.sendError(req, res, error);
    }

    protected sendInternalError(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new UnknownException(correlationId, 'INTERNAL', message);
        this.sendError(req, res, error);
    }

    protected sendServerUnavailable(req: any, res: any, message: string): void  {
        let correlationId = this.getCorrelationId(req);
        let error = new ConflictException(correlationId, 'SERVER_UNAVAILABLE', message);
        error.status = 503;
        this.sendError(req, res, error);
    }

}