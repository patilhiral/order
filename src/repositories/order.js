import { readJSON, writeJSON } from "../utils/helper.js";
const FILE = "orders.json";

export const GetOrder = async () => {
  try {
    return await readJSON(FILE);
  } catch (err) {
    throw new Error("Repository: Failed to get order . " + err.message);
  }
};
export const addOrder = async (order) => {
  try {
    const orders = await readJSON(FILE);
    orders.push(order);
    await writeJSON(FILE, orders);
  } catch (err) {
    throw new Error("Repository: Failed to add order . " + err.message);
  }
};

export const updateOrder = async (id, updateOrder) => {
  try {
    const orders = await readJSON(FILE);
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    orders[index] = {
      ...orders[index],
      ...updateOrder,
      updatedAt: new Date().toISOString(),
    };
    await writeJSON(FILE, orders);
    return orders[index];
  } catch (err) {
    throw new Error("Repository: Failed to update order. " + err.message);
  }
};

export const deleteOrder = async (id) => {
  try {
    const orders = await readJSON(FILE);
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    const [removeOrder] = orders.splice(index, 1);
    await writeJSON(FILE, orders);
    return removeOrder;
  } catch (err) {
    throw new Error("Repository: Failed to delete order. " + err.message);
  }
};
