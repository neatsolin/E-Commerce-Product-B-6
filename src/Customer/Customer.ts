import { User } from "../Auth/User";
export class Customer extends User {
    private customerID: string;

    constructor(userID: string, email: string, password: string, address: string, phoneNumber: string, customerID: string) {
        super(userID, email, password, address, phoneNumber);
        this.customerID = customerID;
    }

    getCustomerID(): string {
        return this.customerID;
    }
}