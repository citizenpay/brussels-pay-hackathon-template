"use server";

import {
  createOrder,
  getOrder,
  Order,
  OrderItem,
  OrderResponse,
} from "@citizenpay/sdk";

export const createOrderAction = async ({
  total,
  description,
  items,
}: {
  total: number;
  description?: string;
  items?: OrderItem[];
}): Promise<OrderResponse> => {
  const baseUrl = process.env.CHECKOUT_BASE_URL;
  if (!baseUrl) {
    throw new Error("CHECKOUT_BASE_URL is not set");
  }

  try {
    const apiKey = process.env.CHECKOUT_API_KEY;
    if (!apiKey) {
      throw new Error("CHECKOUT_API_KEY is not set");
    }

    const placeId = process.env.CHECKOUT_PLACE_ID;
    if (!placeId) {
      throw new Error("CHECKOUT_PLACE_ID is not set");
    }

    const order = await createOrder({
      baseUrl,
      apiKey,
      placeId: parseInt(placeId),
      total,
      description,
      items,
    });
    return order;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
};

export const getOrderAction = async (id: number): Promise<Order> => {
  const baseUrl = process.env.CHECKOUT_BASE_URL;
  if (!baseUrl) {
    throw new Error("CHECKOUT_BASE_URL is not set");
  }

  const apiKey = process.env.CHECKOUT_API_KEY;
  if (!apiKey) {
    throw new Error("CHECKOUT_API_KEY is not set");
  }

  try {
    const order = await getOrder({
      baseUrl,
      apiKey,
      orderId: id,
    });

    return order;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get order");
  }
};
