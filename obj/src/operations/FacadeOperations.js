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
const pip_services_commons_node_10 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class FacadeOperations {
    constructor() {
        this._logger = new pip_services_commons_node_3.CompositeLogger();
        this._counters = new pip_services_commons_node_4.CompositeCounters();
        this._dependencyResolver = new pip_services_commons_node_5.DependencyResolver();
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._counters.setReferences(references);
        this._dependencyResolver.setReferences(references);
    }
    getCorrelationId(req) {
        return req.params.correlation_id;
    }
    getFilterParams(req) {
        let filter = pip_services_commons_node_1.FilterParams.fromValue(_.omit(req.query, 'skip', 'take', 'total'));
        return filter;
    }
    getPagingParams(req) {
        let paging = pip_services_commons_node_2.PagingParams.fromValue(_.pick(req.query, 'skip', 'take', 'total'));
        return paging;
    }
    sendResult(req, res) {
        return pip_services_net_node_1.HttpResponseSender.sendResult(req, res);
    }
    sendEmptyResult(req, res) {
        return pip_services_net_node_1.HttpResponseSender.sendEmptyResult(req, res);
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
        let error = new pip_services_commons_node_6.BadRequestException(correlationId, 'BAD_REQUEST', message);
        this.sendError(req, res, error);
    }
    sendUnauthorized(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_7.UnauthorizedException(correlationId, 'UNAUTHORIZED', message);
        this.sendError(req, res, error);
    }
    sendNotFound(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_8.NotFoundException(correlationId, 'NOT_FOUND', message);
        this.sendError(req, res, error);
    }
    sendConflict(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_9.ConflictException(correlationId, 'CONFLICT', message);
        this.sendError(req, res, error);
    }
    sendSessionExpired(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_10.UnknownException(correlationId, 'SESSION_EXPIRED', message);
        error.status = 440;
        this.sendError(req, res, error);
    }
    sendInternalError(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_10.UnknownException(correlationId, 'INTERNAL', message);
        this.sendError(req, res, error);
    }
    sendServerUnavailable(req, res, message) {
        let correlationId = this.getCorrelationId(req);
        let error = new pip_services_commons_node_9.ConflictException(correlationId, 'SERVER_UNAVAILABLE', message);
        error.status = 503;
        this.sendError(req, res, error);
    }
}
exports.FacadeOperations = FacadeOperations;
//# sourceMappingURL=FacadeOperations.js.map