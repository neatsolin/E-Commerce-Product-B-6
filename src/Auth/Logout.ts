import { User } from "./User";

export function logoutUser(user: User): void {
    user.logout();
}
