"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { OrderItem } from "@/lib/models/order-model";

import { useToast } from "@/hooks/use-toast";
import { useCartService } from "@/hooks/use-cart-store";

export const AddToCartBtn = ({ item }: { item: OrderItem }) => {
  const { toast } = useToast();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((i) => i.slug === item.slug));
  }, [item, items]);

  const isIncreaseDisabled = () => {
    if (item.countInStock === 0) return true;
    if (existItem && existItem.quantity >= item.countInStock) return true;
    return false;
  };

  const addToCartHandler = () => {
    if (item.countInStock === 0) {
      toast({
        title: "This item is out of stock.",
        variant: "destructive",
      });
      return;
    }

    increase(item);
  };

  return existItem ? (
    <div className="flex justify-center items-center gap-4">
      <Button type="button" size="icon" onClick={() => decrease(existItem)}>
        <Minus size={28} />
      </Button>
      <span className="px-4 py-2 border border-border rounded-md">
        {existItem.quantity}
      </span>
      <Button
        disabled={isIncreaseDisabled()}
        type="button"
        size="icon"
        onClick={() => increase(existItem)}
      >
        <Plus size={28} />
      </Button>
    </div>
  ) : (
    <Button
      type="button"
      size="lg"
      className="w-full"
      onClick={addToCartHandler}
    >
      Add to cart
    </Button>
  );
};

// "use client";

// import { Minus, Plus } from "lucide-react";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { OrderItem } from "@/lib/models/order-model";
// import { useCartService } from "@/hooks/use-cart-store";

// export const AddToCartBtn = ({ item }: { item: OrderItem }) => {
//   const { items, increase, decrease } = useCartService();
//   const { toast } = useToast();
//   const [existItem, setExistItem] = useState<OrderItem | undefined>();

//   // Відслідковуємо зміни в items після виклику increase
//   useEffect(() => {
//     setExistItem(items.find((i) => i.slug === item.slug));
//   }, [items, item]); // Додаємо `items` як залежність

//   const addToCartHandler = () => {
//     if (item.countInStock === 0) {
//       toast({
//         title: "This item is out of stock.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Логіка для додавання товару в кошик
//     increase(item);

//     // Додатковий консольний лог для перевірки зміни кількості в кошику
//     console.log("item.countInStock after increase:", item.countInStock);
//   };

//   return existItem ? (
//     <div className="flex justify-center items-center gap-4">
//       <Button type="button" size="icon" onClick={() => decrease(existItem)}>
//         <Minus size={28} />
//       </Button>
//       <span className="px-4 py-2 border border-border rounded-md">
//         {existItem.quantity}
//       </span>
//       <Button
//         disabled={existItem.quantity >= item.countInStock} // Дізейблимось, коли досягнуто ліміту
//         type="button"
//         size="icon"
//         onClick={() => increase(existItem)} // Відповідно до кількості в кошику
//       >
//         <Plus size={28} />
//       </Button>
//     </div>
//   ) : (
//     <Button
//       type="button"
//       size="lg"
//       className="w-full"
//       onClick={addToCartHandler}
//     >
//       Add to cart
//     </Button>
//   );
// };
