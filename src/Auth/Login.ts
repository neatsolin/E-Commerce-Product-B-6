import { User } from "./User";

export function loginUser(user: User, email: string, password: string): void {
    const result = user.login(email, password);
    if (!result) {
        console.log("Login failed. Try again.");
    }
}
