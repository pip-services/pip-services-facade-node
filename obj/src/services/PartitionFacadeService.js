"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const FacadeService_1 = require("./FacadeService");
class PartitionFacadeService extends FacadeService_1.FacadeService {
    constructor() {
        super();
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver();
        this._dependencyResolver.put('parent', new pip_services_commons_node_1.Descriptor('pip-services-facade', 'service', 'main', '*', '*'));
    }
    configure(config) {
        super.configure(config);
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._parent = this._dependencyResolver.getOneRequired('parent');
        this._parent.registerMiddlewareForPath(this._rootPath, this._partition);
    }
    getRootPath() {
        return this._parent.getRootPath() + this._rootPath;
    }
}
exports.PartitionFacadeService = PartitionFacadeService;
//# sourceMappingURL=PartitionFacadeService.js.map