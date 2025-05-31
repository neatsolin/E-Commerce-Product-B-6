import { User } from "./User";

export function registerUser(user: User, email: string, password: string): void {
    const result = user.register(email, password);
    if (!result) {
        console.log("Registration failed. Try again.");
    }
}
