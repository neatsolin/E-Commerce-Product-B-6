export class Address {
  constructor(
    private addressId: string,
    private street: string,
    private city: string,
    private country: string,
    private postalCode: string
  ) {}

  // Getter methods
  public getAddressId(): string {
    return this.addressId;
  }

  public getStreet(): string {
    return this.street;
  }

  public getCity(): string {
    return this.city;
  }

  public getCountry(): string {
    return this.country;
  }

  public getPostalCode(): string {
    return this.postalCode;
  }

  // Setter methods
  public setStreet(street: string): void {
    this.street = street;
  }

  public setCity(city: string): void {
    this.city = city;
  }

  public setCountry(country: string): void {
    this.country = country;
  }

  public setPostalCode(postalCode: string): void {
    this.postalCode = postalCode;
  }

  // Utility method to format full address
  public getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.country}, ${this.postalCode}`;
  }
}
