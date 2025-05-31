import Fastify from "fastify";

const fastify = Fastify();
import emitter from "./utils/emitter.js";
import createFileService from "./db/fileStorage.js";
import orderRespository from "./repositories/orderRepository.js";
import orderService from "./services/orderService.js";
import orderController from "./controller/orderController.js";
import orderRoutes from "./routes/orderRoutes.js";

const fileService = createFileService();
const orderRepositoryInstance = orderRespository(fileService);
const orderServiceInstance = orderService(orderRepositoryInstance, emitter);
const orderControllerInstance = orderController(orderServiceInstance);

fastify.register(orderRoutes, {
  prefix: "/orders",
  orderController: orderControllerInstance,
});

fastify.listen({ port: 9000 }, (err, address) => {
  console.log("Server running at 000");
});
