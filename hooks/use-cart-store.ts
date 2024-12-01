import { create } from "zustand";
import { persist } from "zustand/middleware";

import { round2 } from "@/lib/utils";
import { OrderItem, ShippingAddress } from "@/lib/models/order-model";

export type PaymentMethod = "PayPal" | "Bank_Transfer" | "Cash_On_Delivery";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: "Cash_On_Delivery",
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, { name: "cartStore", version: 1 })
);

export const useCartService = () => {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      const newQuantity = exist ? exist.quantity + 1 : 1;

      if (newQuantity > item.countInStock) {
        return; // Тост вже не потрібно тут, просто виходимо
      }

      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...x, quantity: x.quantity + 1 } : x
          )
        : [...items, { ...item, quantity: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((i) => i.slug === item.slug);
      if (!exist) return;

      const updatedCartItems =
        exist.quantity === 1
          ? items.filter((i) => i.slug !== item.slug)
          : items.map((i) =>
              i.slug === item.slug ? { ...i, quantity: i.quantity - 1 } : i
            );
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    saveShippingAddrress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({ shippingAddress });
    },
    savePaymentMethod: (paymentMethod: PaymentMethod) => {
      cartStore.setState({ paymentMethod });
    },
    clear: () => {
      cartStore.setState({ items: [] });
    },
    init: () => cartStore.setState(initialState),
  };
};

const calcPrice = (items: OrderItem[]) => {
  if (!items || items.length === 0) {
    return {
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };
  }
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number(0.15 * itemsPrice));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
