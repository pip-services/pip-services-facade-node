let _ = require('lodash');

import { UnauthorizedException } from 'pip-services-commons-node';
import { HttpResponseSender } from 'pip-services-net-node';

export class BasicAuthManager {

    public anybody(): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            next();
        };
    }

    public signed(): (req: any, res: any, next: () => void) => void {
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
                next();
            }
        };
    }

}
