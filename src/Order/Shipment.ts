import { Order } from './Order';
import { DeliveryOption } from '../Product/DeliveryOption';

export class Shipment {
  order: Order;
  trackingNumber: string;
  deliveryOption: DeliveryOption;

  constructor(order: Order, trackingNumber: string, deliveryOption: DeliveryOption) {
    if (!deliveryOption) throw new Error('Delivery option required for shipment');
    this.order = order;
    this.trackingNumber = trackingNumber;
    this.deliveryOption = deliveryOption;
  }

  // User Story 3: Delivery manager checks delivery method and destination
  getDeliveryDetails(): { method: string, destination: string } {
    return {
      method: this.deliveryOption.method,
      destination: this.order.customer.address.toString()
    };
  }
}