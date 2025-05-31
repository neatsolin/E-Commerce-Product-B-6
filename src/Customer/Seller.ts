import { User } from "../Auth/User";
export class Seller extends User {
    private sellerID: string;

    constructor(userID: string, email: string, password: string, address: string, phoneNumber: string, sellerID: string) {
        super(userID, email, password, address, phoneNumber);
        this.sellerID = sellerID;
    }

    getSellerID(): string {
        return this.sellerID;
    }
}