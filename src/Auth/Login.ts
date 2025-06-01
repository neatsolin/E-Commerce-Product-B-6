import { User } from "./User";

export function loginUser(user: User, email: string, password: string): boolean {
    return user.login(email, password);
}
