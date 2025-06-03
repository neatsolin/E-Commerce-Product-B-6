import { OrderItem } from "../Order/OrderItem";
import { DeliveryOption } from "../Product/DeliveryOption";
import { Address } from "../Customer/Address";
export class Shipment {
  private shipmentId: string;
  private orderItems: OrderItem[];
  private trackingName: string;
  private destination: Address;
  private deliveryOption: DeliveryOption;

  constructor(
    shipmentId: string,
    orderItems: OrderItem[],
    trackingName: string,
    destination: Address,
    deliveryOption: DeliveryOption
  ) {
    this.shipmentId = shipmentId;
    this.orderItems = orderItems;
    this.trackingName = trackingName;
    this.destination = destination;
    this.deliveryOption = deliveryOption;
  }

  public getDeliveryMethod(): string {
    return "";
  }

  public getDestination(): Address {
    return this.destination;
  }
}
