import {
  GetOrder,
  CreateOrder,
  UpdateOrder,
  DeleteOrder,
} from "../controller/order.js";

export default async function orderRoutes(fastify) {
  fastify.get("/", GetOrder);
  fastify.post("/", CreateOrder);
  fastify.put("/:id", UpdateOrder);
  fastify.delete("/:id", DeleteOrder);
}
