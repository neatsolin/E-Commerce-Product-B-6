import { User } from "../Customer/User";

export function logoutUser(user: User): void {
    user.logout();
}
