import { v4 as uuidv4 } from "uuid";

const orderService = (orderRepository, eventEmitter) => {
  return {
    getOrder: async () => {
      try {
        return orderRepository.getOrder();
      } catch (err) {
        throw new Error("Service: Unable to get order. " + err.message);
      }
    },
    createOrder: async (data) => {
      try {
        const orderData = {
          id: uuidv4(),
          ...data,
          status: "created",
          createdAt: new Date().toISOString(),
        };
        await orderRepository.addOrder(orderData);
        eventEmitter.emit("order-created", orderData);
      } catch (err) {
        throw new Error("Service: Unable to create order. " + err.message);
      }
    },
    updateOrder: async (id, data) => {
      try {
        const updatedOrder = await orderRepository.updateOrder(id, data);
        if (!updatedOrder) return null;
        eventEmitter.emit("order-updated", updatedOrder);
        return updatedOrder;
      } catch (err) {
        throw new Error("Service: Unable to update order. " + err.message);
      }
    },
    deleteOrder: async (id) => {
      try {
        const deletedOrder = await orderRepository.deleteOrder(id);
        if (!deletedOrder) return null;
        eventEmitter.emit("order-delete", deletedOrder);
        return deletedOrder;
      } catch (err) {
        throw new Error("Service: Unable to delete order. " + err.message);
      }
    },
  };
};

export default orderService;
