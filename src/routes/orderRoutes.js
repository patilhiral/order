export default async function orderRoutes(fastify, options) {
  const { orderController } = options;
  fastify.get("/", orderController.getOrder);
  fastify.post("/", orderController.createOrder);
  fastify.put("/:id", orderController.updateOrder);
  fastify.delete("/:id", orderController.deleteOrder);
}
