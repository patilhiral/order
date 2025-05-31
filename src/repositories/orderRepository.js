const orderRespository = (fileService) => {
  const FILE = "orders.json";
  return {
    getOrder: async () => {
      try {
        return (await fileService.read(FILE)) || [];
      } catch (err) {
        throw new Error("Repository: Failed to get order . " + err.message);
      }
    },
    addOrder: async (order) => {
      try {
        const orders = (await fileService.read(FILE)) || [];
        orders.push(order);
        await fileService.write(FILE, orders);
      } catch (err) {
        throw new Error("Repository: Failed to add order . " + err.message);
      }
    },
    updateOrder: async (id, updateOrder) => {
      try {
        const orders = (await fileService.read(FILE)) || [];
        const index = orders.findIndex((o) => o.id === id);
        if (index === -1) return null;

        orders[index] = {
          ...orders[index],
          ...updateOrder,
          updatedAt: new Date().toISOString(),
        };
        await fileService.write(FILE, orders);
        return orders[index];
      } catch (err) {
        throw new Error("Repository: Failed to update order. " + err.message);
      }
    },
    deleteOrder: async (id) => {
      try {
        const orders = (await fileService.read(FILE)) || [];
        const index = orders.findIndex((o) => o.id === id);
        if (index === -1) return null;
        const [removeOrder] = orders.splice(index, 1);
        await fileService.write(FILE, orders);
        return removeOrder;
      } catch (err) {
        throw new Error("Repository: Failed to delete order. " + err.message);
      }
    },
  };
};
export default orderRespository;
