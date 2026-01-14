"use strict";

/**
 * order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

const crypto = require("crypto");

function calDiscountPrice(price, discount) {
  if (!discount) return price;

  const discountAmount = (price * discount) / 100;

  const result = price - discountAmount;
  return result.toFixed(2);
}

async function generatehashIntegraty(amount, currency, orderId) {
  const encodedText = new TextEncoder().encode(
    `${orderId}${amount}${currency}${process.env.SECRET_KEY_BOLD}`
  );

  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedText);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

module.exports = createCoreController("api::order.order", () => ({
  async paymentOrder(ctx) {
    const { products, user, currency, address } = ctx.request.body;

    let totalPayment = 0;
    const idPayment = crypto.randomUUID();

    products.forEach((product) => {
      const priceTemp = calDiscountPrice(product.price, product.discount);
      totalPayment += Number(priceTemp) * Number(product.quantity);
    });

    const data = {
      products: products,
      totalPayment: Math.round(totalPayment),
      user: user,
      idPayment: idPayment,
      addressShiping: address,
    };

    const model = strapi.contentTypes["api::order.order"];
    const validData = await strapi.entityValidator.validateEntityCreation(
      model,
      data
    );

    const entry = await strapi.db
      .query("api::order.order")
      .create({ data: validData });

    const hash = await generatehashIntegraty(totalPayment, currency, idPayment);

    return {
      ...entry,
      hashIntegraty: hash,
      apiKey: process.env.API_KEY_BOLD,
    };
  },
}));
