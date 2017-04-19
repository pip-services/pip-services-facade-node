"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const pip_services_commons_node_9 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class FacadeRoutes {
    constructor() {
        this._logger = new pip_services_commons_node_2.CompositeLogger();
        this._counters = new pip_services_commons_node_3.CompositeCounters();
        this._dependencyResolver = new pip_services_commons_node_4.DependencyResolver(FacadeRoutes._defaultConfig);
    }
    configure(config) {
        config = config.setDefaults(FacadeRoutes._defaultConfig);
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._service = this._dependencyResolver.getOneRequired('service');
        this.register();
    }
    instrument(correlationId, method, route) {
        this._logger.debug(correlationId, "Calling %s %s", method, route);
        this._counters.incrementOne(route + "." + method + ".calls");
    }
    registerRoute(method, route, action) {
        let actionCurl = (req, res) => {
            let correlationId = this.getCorrelationId(req);
            this.instrument(correlationId, method, route);
            action.call(this, req, res);
        };
        this._service.registerRoute(method, route, actionCurl);
    }
    registerRouteWithAuth(method, route, authorize, action) {
        let actionCurl = (req, res) => {
            let correlationId = this.getCorrelationId(req);
            this.instrument(correlationId, method, route);
            action.call(this, req, res);
        };
        this._service.registerRouteWithAuth(method, route, authorize, actionCurl);
    }
    registerMiddleware(action) {
        let actionCurl = (req, res, next) => {
            action.call(this, req, res, next);
        };
        this._service.registerMiddleware(actionCurl);
    }
    getCorrelationId(req) {
        return req.params.correlation_id;
    }
    getFilterParams(req) {
        // Todo: Complete implementation
        return req.query;
    }
    getPagingParams(req) {
        let paging = {};
        if (req.query.skip)
            paging.skip = parseInt(req.query.skip);
        if (req.query.take)
            paging.take = parseInt(req.query.take);
        if (req.query.paging)
            paging.paging = req.query.paging;
        return paging;
    }
    sendResult(req, res) {
        return pip_services_net_node_1.HttpResponseSender.sendResult(req, res);
    }
    sendCreatedResult(req, res) {
        return pip_services_net_node_1.HttpResponseSender.sendCreatedResult(req, res);
    }
    sendDeletedResult(req, res) {
        return pip_services_net_node_1.HttpResponseSender.sendDeletedResult(req, res);
    }
    sendError(req, res, error) {
        pip_services_net_node_1.HttpResponseSender.sendError(req, res, error);
    }
    sendBadRequest(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_5.BadRequestException(correlationId, 'BAD_REQUEST', message);
        this.sendError(req, res, error);
    }
    sendUnauthorized(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_6.UnauthorizedException(correlationId, 'UNAUTHORIZED', message);
        this.sendError(req, res, error);
    }
    sendNotFound(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_7.NotFoundException(correlationId, 'NOT_FOUND', message);
        this.sendError(req, res, error);
    }
    sendConflict(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_8.ConflictException(correlationId, 'CONFLICT', message);
        this.sendError(req, res, error);
    }
    sendSessionExpired(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_9.UnknownException(correlationId, 'SESSION_EXPIRED', message);
        error.status = 440;
        this.sendError(req, res, error);
    }
    sendInternalError(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_9.UnknownException(correlationId, 'INTERNAL', message);
        this.sendError(req, res, error);
    }
    sendServerUnavailable(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_8.ConflictException(correlationId, 'SERVER_UNAVAILABLE', message);
        error.status = 503;
        this.sendError(req, res, error);
    }
}
FacadeRoutes._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.service', 'pip-services-facade:service:*:*:*');
exports.FacadeRoutes = FacadeRoutes;
//# sourceMappingURL=FacadeRoutes.js.map