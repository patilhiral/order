import * as order from "../repositories/order.js";
import { randomUUID } from "crypto";
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

export const GetOrder = async () => {
  try {
    return order.GetOrder();
  } catch (err) {
    throw new Error("Service: Unable to get order. " + err.message);
  }
};
export const CreateOrder = async (data) => {
  try {
    const orderData = {
      id: randomUUID(),
      ...data,
      status: "created",
      createdAt: new Date().toISOString(),
    };
    await order.addOrder(orderData);
    eventEmitter.emit("order-created", orderData);
  } catch (err) {
    throw new Error("Service: Unable to create order. " + err.message);
  }
};

export const UpdateOrder = async (id, data) => {
  try {
    const updateOrder = await order.updateOrder(id, data);
    if (!updateOrder) return null;
    eventEmitter.emit("order-updated", updateOrder);
    return updateOrder;
  } catch (err) {
    throw new Error("Service: Unable to update order. " + err.message);
  }
};

export const DeleteOrder = async (id) => {
  try {
    const deleteOrder = await order.deleteOrder(id);
    if (!deleteOrder) return null;
    eventEmitter.emit("order-delete", deleteOrder);
    return deleteOrder;
  } catch (err) {
    throw new Error("Service: Unable to delete order. " + err.message);
  }
};
