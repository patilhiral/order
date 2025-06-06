import orderController from "../../controller/orderController";
import OrderRoutes from "../orderRoutes";
describe("Order Routes", () => {
  let mockOrderController;
  let mockFastify;

  beforeEach(() => {
    mockOrderController = {
      getOrder: jest.fn(),
      createOrder: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };
    mockFastify = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
  });

  describe("get orders Routes", () => {
    test("should call order route", async () => {
      await OrderRoutes(mockFastify, { orderController: mockOrderController });
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/",
        mockOrderController.getOrder
      );
    });
  });
  describe("Create orders Routes", () => {
    test("should call create order route", async () => {
      await OrderRoutes(mockFastify, { orderController: mockOrderController });
      expect(mockFastify.post).toHaveBeenCalledWith(
        "/",
        mockOrderController.getOrder
      );
    });
  });
  describe("Update orders Routes", () => {
    test("should call update order route", async () => {
      await OrderRoutes(mockFastify, { orderController: mockOrderController });
      expect(mockFastify.put).toHaveBeenCalledWith(
        "/:id",
        mockOrderController.getOrder
      );
    });
  });
  describe("delete orders Routes", () => {
    test("should call delete order route", async () => {
      await OrderRoutes(mockFastify, { orderController: mockOrderController });
      expect(mockFastify.delete).toHaveBeenCalledWith(
        "/:id",
        mockOrderController.getOrder
      );
    });
  });
  describe("get orders Routes", () => {
    test("should call order route", async () => {
      await OrderRoutes(mockFastify, { orderController: mockOrderController });
      expect(mockFastify.get).toHaveBeenCalledWith(
        "/",
        mockOrderController.getOrder
      );
    });
  });
});
