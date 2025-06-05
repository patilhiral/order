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

  test("Get all the order", async () => {
    mockFileService.read.mockResolvedValue(sampleOrders);

    const orders = await orderRepository.getOrder();
    expect(orders).toEqual(sampleOrders);
    expect(mockFileService.read).toHaveBeenCalledWith(FILE);
  });
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
