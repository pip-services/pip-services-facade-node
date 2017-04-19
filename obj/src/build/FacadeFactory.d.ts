import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class FacadeFactory extends Factory {
    static Descriptor: Descriptor;
    static MainFacadeServiceDescriptor: Descriptor;
    static PartitionFacadeServiceDescriptor: Descriptor;
    static AuthManagerDescriptor: Descriptor;
    static SessionManagerDescriptor: Descriptor;
    static AboutRoutesDescriptor: Descriptor;
    constructor();
}
