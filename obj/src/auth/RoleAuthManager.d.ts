export declare class RoleAuthManager {
    userInRole(role: string): (req: any, res: any, next: () => void) => void;
    admin(): (req: any, res: any, next: () => void) => void;
}
