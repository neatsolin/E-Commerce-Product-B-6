import { User } from "../Auth/User";
export  class Admin extends User {
    private adminID: string;

    constructor(userID: string, email: string, password: string, address: string, adminID: string) {
        super(userID, email, password, address);
        this.adminID = adminID;
    }

    getAdminID(): string {
        return this.adminID;
    }
}