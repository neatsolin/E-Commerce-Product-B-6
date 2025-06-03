import { User } from "../Customer/User";


export function registerUser(user: User, email: string, password: string): boolean {
    return user.register(email, password);
}
