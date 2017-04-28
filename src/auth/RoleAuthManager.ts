let _ = require('lodash');

import { UnauthorizedException } from 'pip-services-commons-node';
import { HttpResponseSender } from 'pip-services-net-node';

export class RoleAuthManager {

    public userInRole(role: string): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    )
                );
            } else {
                let authorized = _.includes(user.roles, role);

                if (!authorized) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'NOT_IN_ROLE',
                            'User must be ' + role + ' to perform this operation'
                        ).withDetails('role', role)
                    );
                } else {
                    next();
                }
            }
        };
    }

    public admin(): (req: any, res: any, next: () => void) => void {
        return this.userInRole('admin');
    }

}
