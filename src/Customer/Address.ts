export class Address {
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  type: string;

  constructor(streetAddress: string, city: string, country: string, postalCode: string, type: string) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.type = type;
  }

  toString(): string {
    return `${this.streetAddress}, ${this.city}, ${this.country}, ${this.postalCode}`;
  }
}