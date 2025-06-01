import { Customer } from '../Customer/Customer';
import { OrderItem } from './OrderItem';
import { DeliveryOption } from '../Product/DeliveryOption';
import { Shipment } from './Shipment';
import { Invoice } from './Invoice';
import { Notification } from '../Common/Notification';

export class Order {
  orderItems: OrderItem[];
  customer: Customer;
  deliveryOption: DeliveryOption | null;
  shipments: Shipment[];
  invoice: Invoice | null;
  orderNumber: string;

  constructor(customer: Customer, deliveryOption?: DeliveryOption) {
    this.orderItems = [];
    this.customer = customer;
    this.deliveryOption = deliveryOption || null;
    this.shipments = [];
    this.invoice = null;
    this.orderNumber = `ORD-${Date.now()}`;
  }

  createShipments(): void {
    // Group items by seller and create separate shipments
    const itemsBySeller: { [sellerId: string]: OrderItem[] } = {};
    this.orderItems.forEach(item => {
      const sellerId = item.product.seller.toString();
      if (!itemsBySeller[sellerId]) itemsBySeller[sellerId] = [];
      itemsBySeller[sellerId].push(item);
    });

    Object.keys(itemsBySeller).forEach((sellerId, index) => {
      const shipment = new Shipment(this, `TRACK-${this.orderNumber}-${index + 1}`, this.deliveryOption!);
      this.shipments.push(shipment);
    });

    new Notification(`Order ${this.orderNumber} split into ${this.shipments.length} shipments`, this.customer.phoneNumber).send();
  }
}