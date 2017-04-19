import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { FacadeFactory } from '../build/FacadeFactory';

export class FacadeProcess extends ProcessContainer {

    public constructor() {
        super("facade", "Client facade microservice");
        this._factories.add(new FacadeFactory);
    }

}
