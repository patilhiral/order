import * as OrderService from "../services/order.js";

export const GetOrder = async (request, reply) => {
  try {
    const result = await OrderService.GetOrder();
    reply.code(200).send({ data: result });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};
export const CreateOrder = async (request, reply) => {
  try {
    const result = await OrderService.CreateOrder(request.body);
    reply.code(201).send({ message: "order created successfully" });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

export const UpdateOrder = async (request, reply) => {
  try {
    const { id } = request.params;
    const result = await OrderService.UpdateOrder(id, request.body);
    if (!result) return reply.code(404).send({ message: "Order not found" });
    reply.code(200).send({ message: "order updated successfully" });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

export const DeleteOrder = async (request, reply) => {
  try {
    const { id } = request.params;
    const result = await OrderService.DeleteOrder(id);
    if (!result) return reply.code(404).send({ message: "Order not found" });
    reply.code(200).send({ message: "order updated successfully" });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};
