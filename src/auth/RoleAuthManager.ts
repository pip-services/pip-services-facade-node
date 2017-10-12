let _ = require('lodash');

import { UnauthorizedException } from 'pip-services-commons-node';
import { HttpResponseSender } from 'pip-services-net-node';

export class RoleAuthManager {

    public userInRoles(roles: string[]): (req: any, res: any, next: () => void) => void {
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
                let authorized = false;
                
                for (let role of roles)
                    authorized = authorized || _.includes(user.roles, role);

                if (!authorized) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'NOT_IN_ROLE',
                            'User must be ' + roles.join(' or ') + ' to perform this operation'
                        ).withDetails('roles', roles)
                    );
                } else {
                    next();
                }
            }
        };
    }

    public userInRole(role: string): (req: any, res: any, next: () => void) => void {
        return this.userInRoles([role]);
    }
        
    public admin(): (req: any, res: any, next: () => void) => void {
        return this.userInRole('admin');
    }

}
