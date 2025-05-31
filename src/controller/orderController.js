const orderController = (orderService) => {
  return {
    getOrder: async (request, reply) => {
      try {
        const result = await orderService.getOrder();
        reply.code(200).send({ data: result });
      } catch (err) {
        reply.code(500).send({ error: err.message });
      }
    },
    createOrder: async (request, reply) => {
      try {
        const result = await orderService.createOrder(request.body);
        reply.code(201).send({ message: "order created successfully" });
      } catch (err) {
        reply.code(500).send({ error: err.message });
      }
    },
    updateOrder: async (request, reply) => {
      try {
        const { id } = request.params;
        const result = await orderService.updateOrder(id, request.body);
        if (!result)
          return reply.code(404).send({ message: "Order not found" });
        reply.code(200).send({ message: "order updated successfully" });
      } catch (err) {
        reply.code(500).send({ error: err.message });
      }
    },
    deleteOrder: async (request, reply) => {
      try {
        const { id } = request.params;
        const result = await orderService.deleteOrder(id);
        if (!result)
          return reply.code(404).send({ message: "Order not found" });
        reply.code(200).send({ message: "order updated successfully" });
      } catch (err) {
        reply.code(500).send({ error: err.message });
      }
    },
  };
};

export default orderController;
