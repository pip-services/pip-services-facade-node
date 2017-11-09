"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class BasicAuthManager {
    anybody() {
        return (req, res, next) => {
            next();
        };
    }
    signed() {
        return (req, res, next) => {
            if (req.user == null) {
                pip_services_net_node_1.HttpResponseSender.sendError(req, res, new pip_services_commons_node_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                next();
            }
        };
    }
}
exports.BasicAuthManager = BasicAuthManager;
//# sourceMappingURL=BasicAuthManager.js.map