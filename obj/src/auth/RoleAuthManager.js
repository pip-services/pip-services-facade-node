"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class RoleAuthManager {
    userInRole(role) {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                pip_services_net_node_1.HttpResponseSender.sendError(req, res, new pip_services_commons_node_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation'));
            }
            else {
                let authorized = _.includes(user.roles, role);
                if (!authorized) {
                    pip_services_net_node_1.HttpResponseSender.sendError(req, res, new pip_services_commons_node_1.UnauthorizedException(null, 'NOT_IN_ROLE', 'User must be ' + role + ' to perform this operation').withDetails('role', role));
                }
                else {
                    next();
                }
            }
        };
    }
    admin() {
        return this.userInRole('admin');
    }
}
exports.RoleAuthManager = RoleAuthManager;
//# sourceMappingURL=RoleAuthManager.js.map