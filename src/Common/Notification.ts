export class Notification {
  message: string;
  recipient: string;

  constructor(message: string, recipient: string) {
    this.message = message;
    this.recipient = recipient;
  }

  send(): void {
    console.log(`Notification to ${this.recipient}: ${this.message}`);
  }
}