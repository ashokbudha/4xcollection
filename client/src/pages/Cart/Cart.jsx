import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";

const CART_STORAGE_KEY = "4x-collection-cart";
const CART_ADD_EVENT = "cart:add";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NPR",
  minimumFractionDigits: 2,
});

function readStoredCart() {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function getPrice(value) {
  if (typeof value === "number") return value;

  return Number(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;
}

function createCartItem(product) {
  const productId = product.id ?? product._id;

  if (!productId) return null;

  const variant = product.variant ?? ([product.color, product.size].filter(Boolean).join(" · ") || "Default");
  const variantId = product.variantId ?? product.selectedVariantId ?? "default";

  return {
    id: `${productId}-${variantId}`,
    productId,
    variantId,
    name: product.name ?? product.title ?? "Untitled product",
    variant,
    price: getPrice(product.price),
    quantity: Math.max(1, Number(product.quantity) || 1),
    image: product.image ?? product.thumbnail ?? "",
  };
}

function Cart({ isOpen, onClose, onItemCountChange }) {
  const [items, setItems] = useState(readStoredCart);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const addItem = useCallback((product) => {
    const cartItem = createCartItem(product);

    if (!cartItem) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === cartItem.id);

      if (!existingItem) return [...currentItems, cartItem];

      return currentItems.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity + cartItem.quantity }
          : item,
      );
    });
  }, []);

  useEffect(() => {
    onItemCountChange?.(itemCount);
  }, [itemCount, onItemCountChange]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const handleAddToCart = (event) => addItem(event.detail);

    window.addEventListener(CART_ADD_EVENT, handleAddToCart);

    return () => window.removeEventListener(CART_ADD_EVENT, handleAddToCart);
  }, [addItem]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  const updateQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-slate-950/25"
        onClick={onClose}
        aria-label="Close cart"
      />

      <aside
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[390px] flex-col bg-white text-[#0f2342] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-y border-slate-200 px-7">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.8} aria-hidden="true" />
            <h2 id="cart-title" className="text-sm font-medium uppercase tracking-[0.12em]">
              Cart ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center text-slate-500 transition hover:text-slate-950"
            aria-label="Close cart"
          >
            <X size={21} strokeWidth={1.8} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-4">
          {items.length > 0 ? (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="grid grid-cols-[80px_1fr] gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-24 w-20 object-cover" />
                  ) : (
                    <div className="grid h-24 w-20 place-items-center bg-slate-100 text-2xl font-serif text-slate-400">
                      {item.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="truncate text-sm font-medium">{item.name}</h3>
                        <p className="mt-1 text-xs text-[#8a9bb5]">{item.variant}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="-mt-1 text-lg leading-none text-slate-300 transition hover:text-slate-900"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex h-8 items-center border border-slate-200 text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="grid h-full w-10 place-items-center text-slate-400 transition hover:bg-slate-50 hover:text-slate-950"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="grid h-full w-9 place-items-center border-x border-slate-200 text-[#0f2342]">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="grid h-full w-10 place-items-center text-slate-400 transition hover:bg-slate-50 hover:text-slate-950"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{money.format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid h-full place-items-center text-center">
              <div>
                <ShoppingBag size={30} className="mx-auto text-slate-300" aria-hidden="true" />
                <h3 className="mt-4 text-sm font-semibold">Your cart is empty</h3>
                <p className="mt-2 text-sm text-slate-500">Find something you&apos;ll love.</p>
              </div>
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-slate-200 px-7 py-5">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-[#415778]">Subtotal</dt><dd>{money.format(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-[#415778]">Shipping</dt><dd className="text-emerald-600">Free</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold"><dt>Total</dt><dd>{money.format(subtotal)}</dd></div>
          </dl>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => window.alert("Checkout will be available soon.")}
            className="mt-5 flex w-full items-center justify-center gap-3 bg-[#101a2c] py-4 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#1d2b45] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout <ArrowRight size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full text-xs font-medium uppercase tracking-[0.12em] text-[#667895] transition hover:text-[#0f2342]"
          >
            Continue shopping
          </button>
        </footer>
      </aside>
    </div>
  );
}

export default Cart;
