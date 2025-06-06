import OrderService from "../orderService.js";
import { v4 as uuidv4 } from "uuid";

// Mock uuid so we can control generated ID
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

describe("order Service test case", () => {
  let mockOrderRepository;

  let mockEventEmitter;

  let orderservice;

  beforeEach(() => {
    mockOrderRepository = {
      getOrder: jest.fn(),
      addOrder: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };
    mockEventEmitter = {
      emit: jest.fn(),
    };
    orderservice = OrderService(mockOrderRepository, mockEventEmitter);
  });
  describe("getOrder", () => {
    test("get list of orders", async () => {
      const orders = [{ id: "1", name: "Book" }];
      mockOrderRepository.getOrder.mockResolvedValue(orders);
      const result = await orderservice.getOrder();
      expect(result).toEqual(orders);
      expect(mockOrderRepository.getOrder).toHaveBeenCalled();
    });

    test("getOrder throws error if repo fails", async () => {
      mockOrderRepository.getOrder.mockRejectedValue(
        new Error("Service: Unable to get order. Repo failed")
      );

      await expect(orderservice.getOrder()).rejects.toThrow(
        "Service: Unable to get order. Repo failed"
      );
    });
  });
  describe("createOrder", () => {
    test("create order and emits events", async () => {
      const orderData = { name: "Book" };

      await orderservice.createOrder(orderData);

      expect(mockOrderRepository.addOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "mock-uuid",
          name: "Book",
          status: "created",
          createdAt: expect.any(String),
        })
      );

      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        "order-created",
        expect.objectContaining({
          id: "mock-uuid",
          name: "Book",
          status: "created",
          createdAt: expect.any(String),
        })
      );
    });
    test("createOrder throws error if repo fails", async () => {
      mockOrderRepository.addOrder.mockRejectedValue(new Error("Repo failed"));

      await expect(orderservice.createOrder({ name: "Test" })).rejects.toThrow(
        "Service: Unable to create order. Repo failed"
      );
    });
  });

  describe("update Order", () => {
    test("updateOrder updates order and emits event", async () => {
      const updatedOrder = { id: "1", name: "Book", status: "delivered" };
      mockOrderRepository.updateOrder.mockResolvedValue(updatedOrder);

      const result = await orderservice.updateOrder("1", {
        status: "delivered",
      });

      expect(result).toEqual(updatedOrder);
      expect(mockOrderRepository.updateOrder).toHaveBeenCalledWith("1", {
        status: "delivered",
      });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        "order-updated",
        updatedOrder
      );
    });

    test("updateOrder returns null if order not found", async () => {
      mockOrderRepository.updateOrder.mockResolvedValue(null);

      const result = await orderservice.updateOrder("999", {
        status: "cancelled",
      });

      expect(result).toBeNull();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
    test("updateOrder throws error if repo fails", async () => {
      mockOrderRepository.updateOrder.mockRejectedValue(
        new Error("Repo failed")
      );

      await expect(
        orderservice.updateOrder("1", { status: "received" })
      ).rejects.toThrow("Service: Unable to update order. Repo failed");
    });
  });
  describe("deleteOrder", () => {
    test("deleteOrder deletes order and emits event", async () => {
      const deletedOrder = { id: "1", name: "Book" };
      mockOrderRepository.deleteOrder.mockResolvedValue(deletedOrder);

      const result = await orderservice.deleteOrder("1");

      expect(result).toEqual(deletedOrder);
      expect(mockOrderRepository.deleteOrder).toHaveBeenCalledWith("1");
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        "order-delete",
        deletedOrder
      );
    });

    test("deleteOrder returns null if order not found", async () => {
      mockOrderRepository.deleteOrder.mockResolvedValue(null);

      const result = await orderservice.deleteOrder("999");

      expect(result).toBeNull();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
    test("deleteOrder throws error if repo fails", async () => {
      mockOrderRepository.deleteOrder.mockRejectedValue(
        new Error("Repo failed")
      );

      await expect(orderservice.deleteOrder("1")).rejects.toThrow(
        "Service: Unable to delete order. Repo failed"
      );
    });
  });
});
