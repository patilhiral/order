import OrderRepository from "../orderRepository.js";

describe("order Repository", () => {
  let mockFileService;
  let orderRepository;
  const FILE = "orders.json";
  let sampleOrders;
  beforeEach(() => {
    mockFileService = {
      read: jest.fn(),
      write: jest.fn(),
    };
    orderRepository = OrderRepository(mockFileService);
    sampleOrders = [
      { id: 1, name: "book", status: "pending" },
      { id: 2, name: "pen", status: "pending" },
    ];
  });
  describe("Get Order Repository", () => {
    test("Get all the order", async () => {
      mockFileService.read.mockResolvedValue(sampleOrders);

      const orders = await orderRepository.getOrder();
      expect(orders).toEqual(sampleOrders);
      expect(mockFileService.read).toHaveBeenCalledWith(FILE);
    });
  });
  describe("add Order Repository", () => {
    test("add orders", async () => {
      const newOrder = { id: 1, name: "book", status: "pending" };
      mockFileService.read.mockResolvedValue([...sampleOrders]);
      await orderRepository.addOrder(newOrder);
      expect(mockFileService.read).toHaveBeenCalledWith(FILE);
      expect(mockFileService.write).toHaveBeenCalledWith(FILE, [
        ...sampleOrders,
        newOrder,
      ]);
    });
  });
  describe("update Order Repository", () => {
    test("update order", async () => {
      const updatedOrder = { id: 1, name: "book", status: "completed" };
      mockFileService.read.mockResolvedValue([...sampleOrders]);
      const result = await orderRepository.updateOrder(1, updatedOrder);
      expect(mockFileService.read).toHaveBeenCalledWith(FILE);
      expect(mockFileService.write).toHaveBeenCalledWith(FILE, [
        { ...sampleOrders[0], ...updatedOrder, updatedAt: expect.any(String) },
        sampleOrders[1],
      ]);
      expect(result).toEqual({
        ...sampleOrders[0],
        ...updatedOrder,
        updatedAt: expect.any(String),
      });
    });

    test("should return null if order not found", async () => {
      const updatedOrder = { id: 1, name: "book", status: "completed" };
      mockFileService.read.mockResolvedValue([...sampleOrders]);
      const result = await orderRepository.updateOrder(3, updatedOrder);
      expect(result).toBeNull();
    });
  });
  describe("delete Order Repository", () => {
    test("delete order", async () => {
      mockFileService.read.mockResolvedValue([...sampleOrders]);
      const result = await orderRepository.deleteOrder(1);
      expect(mockFileService.read).toHaveBeenCalledWith(FILE);
      expect(mockFileService.write).toHaveBeenCalledWith(FILE, [
        sampleOrders[1],
      ]);
      expect(result).toEqual(sampleOrders[0]);
    });
    test("should return null if order to delete not found", async () => {
      const result = await orderRepository.deleteOrder(3);
      expect(result).toBeNull();
    });
  });
  describe("Error Handling for read and write", () => {
    test("should throw error if read fails", async () => {
      mockFileService.read.mockRejectedValue(new Error("Read error"));
      await expect(orderRepository.getOrder()).rejects.toThrow(
        "Repository: Failed to get order . Read error"
      );
    });
    test("should throw error if write fails", async () => {
      mockFileService.write.mockRejectedValue(new Error("Write error"));
      await expect(orderRepository.addOrder(sampleOrders[0])).rejects.toThrow(
        "Repository: Failed to add order . Write error"
      );
    });
  });
});
