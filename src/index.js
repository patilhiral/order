import Fastify from "fastify";
import orderRoutes from "./routes/order.js";

const fastify = Fastify();

fastify.register(orderRoutes, { prefix: "/orders" });

fastify.listen({ port: 3000 }, (err, address) => {
  console.log("Server running at 3000");
});
