import OrderController from "../orderController.js";

describe("orderController", () => {
  let ordercontroller;
  let mockOrderService;
  let mockReply;

  beforeEach(() => {
    mockOrderService = {
      getOrder: jest.fn(),
      createOrder: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };

    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    ordercontroller = OrderController(mockOrderService);

    jest.clearAllMocks();
  });
  describe("getOrder", () => {
    test("getOrder returns orders", async () => {
      const orders = [{ id: "1", name: "Book" }];
      mockOrderService.getOrder.mockResolvedValue(orders);

      await ordercontroller.getOrder({}, mockReply);

      expect(mockOrderService.getOrder).toHaveBeenCalled();
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({ data: orders });
    });

    test("getOrder handles service error", async () => {
      mockOrderService.getOrder.mockRejectedValue(
        new Error("Service: Unable to get order. Service error")
      );

      await ordercontroller.getOrder({}, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Service: Unable to get order. Service error",
      });
    });
  });

  describe("createOrder", () => {
    test("createOrder calls service and sends 201", async () => {
      mockOrderService.createOrder.mockResolvedValue();

      const request = { body: { name: "Pen" } };

      await ordercontroller.createOrder(request, mockReply);

      expect(mockOrderService.createOrder).toHaveBeenCalledWith({
        name: "Pen",
      });
      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: "order created successfully",
      });
    });
    test("createOrder handles service error", async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new Error("Service: Unable to create order. Service error")
      );

      const request = { body: { name: "Pen" } };

      await ordercontroller.createOrder(request, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Service: Unable to create order. Service error",
      });
    });
  });
  describe("updateOrder", () => {
    test("updateOrder updates and sends 200", async () => {
      const updatedOrder = { id: "1", status: "delivered" };
      mockOrderService.updateOrder.mockResolvedValue(updatedOrder);

      const request = {
        params: { id: "1" },
        body: { status: "delivered" },
      };

      await ordercontroller.updateOrder(request, mockReply);

      expect(mockOrderService.updateOrder).toHaveBeenCalledWith("1", {
        status: "delivered",
      });
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: "order updated successfully",
      });
    });

    test("updateOrder returns 404 if not found", async () => {
      mockOrderService.updateOrder.mockResolvedValue(null);

      const request = {
        params: { id: "999" },
        body: { status: "cancelled" },
      };

      await ordercontroller.updateOrder(request, mockReply);

      expect(mockOrderService.updateOrder).toHaveBeenCalledWith("999", {
        status: "cancelled",
      });
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: "Order not found",
      });
    });
  });
  describe("deleteOrder", () => {
    test("deleteOrder deletes and sends 200", async () => {
      const deletedOrder = { id: "1", name: "Book" };
      mockOrderService.deleteOrder.mockResolvedValue(deletedOrder);

      const request = {
        params: { id: "1" },
      };

      await ordercontroller.deleteOrder(request, mockReply);

      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith("1");
      expect(mockReply.code).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: "order updated successfully",
      });
    });

    test("deleteOrder returns 404 if not found", async () => {
      mockOrderService.deleteOrder.mockResolvedValue(null);

      const request = {
        params: { id: "999" },
      };

      await ordercontroller.deleteOrder(request, mockReply);

      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith("999");
      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        message: "Order not found",
      });
    });
  });
});
