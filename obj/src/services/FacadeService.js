"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let express = require('express');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class FacadeService {
    constructor() {
        this._rootPath = '';
        this._partition = express();
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver();
        this._logger = new pip_services_commons_node_1.CompositeLogger();
    }
    configure(config) {
        this._rootPath = config.getAsStringWithDefault('root_path', this._rootPath);
        if (this._rootPath.length > 0 && !this._rootPath.startsWith('/'))
            this._rootPath = '/' + this._rootPath;
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
    }
    getRootPath() {
        return this._rootPath;
    }
    registerMiddleware(action) {
        this._partition.use(action);
    }
    registerMiddlewareForPath(path, action) {
        this._partition.use(path, action);
    }
    registerRoute(method, route, action) {
        if (method == 'del')
            method = 'delete';
        this._logger.debug(null, 'Registering route %s %s', method, this.getRootPath() + route);
        this._partition[method](route, action);
    }
    registerRouteWithAuth(method, route, authorize, action) {
        if (method == 'del')
            method = 'delete';
        this._logger.debug(null, 'Registering route %s %s', method, this.getRootPath() + route);
        this._partition[method](route, authorize, action);
    }
}
exports.FacadeService = FacadeService;
//# sourceMappingURL=FacadeService.js.map