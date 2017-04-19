import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { MainFacadeService } from '../services/MainFacadeService';
import { PartitionFacadeService } from '../services/PartitionFacadeService';
import { AboutRoutes } from '../routes/AboutRoutes';
// import { FacadeAuthorizationManagerV1 } from '../authorization/version1/FacadeAuthorizationManagerV1';
// import { FacadeSessionManagerV1 } from '../sessions/version1/FacadeSessionManagerV1';

export class FacadeFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-facade", "factory", "default", "default", "1.0");
	public static MainFacadeServiceDescriptor = new Descriptor("pip-services-facade", "service", "main", "*", "1.0");
	public static PartitionFacadeServiceDescriptor = new Descriptor("pip-services-facade", "service", "partition", "*", "1.0");
	public static AuthManagerDescriptor = new Descriptor("pip-services-facade", "authorization", "default", "*", "1.0");
	public static SessionManagerDescriptor = new Descriptor("pip-services-facade", "session", "default", "*", "1.0");
	public static AboutRoutesDescriptor = new Descriptor("pip-services-facade", "routes", "about", "*", "1.0");
	
	public constructor() {
		super();
		this.registerAsType(FacadeFactory.MainFacadeServiceDescriptor, MainFacadeService);
		this.registerAsType(FacadeFactory.PartitionFacadeServiceDescriptor, PartitionFacadeService);
		// this.registerAsType(FacadeFactory.AuthManagerDescriptor, FacadeAuthorizationManagerV1);
		// this.registerAsType(FacadeFactory.SessionManagerDescriptor, FacadeSessionManagerV1);

		this.registerAsType(FacadeFactory.AboutRoutesDescriptor, AboutRoutes);
	}
	
}
