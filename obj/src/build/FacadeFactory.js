"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const MainFacadeService_1 = require("../services/MainFacadeService");
const PartitionFacadeService_1 = require("../services/PartitionFacadeService");
const AboutOperations_1 = require("../operations/AboutOperations");
// import { FacadeAuthorizationManagerV1 } from '../authorization/version1/FacadeAuthorizationManagerV1';
// import { FacadeSessionManagerV1 } from '../sessions/version1/FacadeSessionManagerV1';
class FacadeFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FacadeFactory.MainFacadeServiceDescriptor, MainFacadeService_1.MainFacadeService);
        this.registerAsType(FacadeFactory.PartitionFacadeServiceDescriptor, PartitionFacadeService_1.PartitionFacadeService);
        // this.registerAsType(FacadeFactory.AuthManagerDescriptor, FacadeAuthorizationManagerV1);
        // this.registerAsType(FacadeFactory.SessionManagerDescriptor, FacadeSessionManagerV1);
        this.registerAsType(FacadeFactory.AboutOperationsDescriptor, AboutOperations_1.AboutOperations);
    }
}
FacadeFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "factory", "default", "default", "1.0");
FacadeFactory.MainFacadeServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "service", "main", "*", "1.0");
FacadeFactory.PartitionFacadeServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "service", "partition", "*", "1.0");
FacadeFactory.AuthManagerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "authorization", "default", "*", "1.0");
FacadeFactory.SessionManagerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "session", "default", "*", "1.0");
FacadeFactory.AboutOperationsDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-facade", "operations", "about", "*", "1.0");
exports.FacadeFactory = FacadeFactory;
//# sourceMappingURL=FacadeFactory.js.map