let _ = require('lodash');

import { UnauthorizedException } from 'pip-services-commons-node';
import { HttpResponseSender } from 'pip-services-net-node';

export class OwnerAuthManager {

    public owner(idParam: string): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    )
                );
            } else {
                let userId = req.param(idParam);
                if (req.user_id != userId) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'UNAUTHORIZED',
                            'Only data owner can perform this operation'
                        )
                    );
                } else {
                    next();
                }
            }
        };
    }

    public ownerOrAdmin(idParam: string): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            if (req.user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    )
                );
            } else {
                let userId = req.param(idParam);
                let roles = req.user != null ? req.user.roles : null;
                let admin = _.includes(roles, 'admin');
                if (req.user_id != userId && !admin) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'UNAUTHORIZED',
                            'Only data owner can perform this operation'
                        )
                    );
                } else {
                    next();
                }
            }
        };
    }

}
