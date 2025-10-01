"use client";

import { createOrderAction, getOrderAction } from "@/actions/order";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Order } from "@citizenpay/sdk";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function BrusselsMatchTeaProduct() {
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate QR code when link is available
  useEffect(() => {
    if (link) {
      QRCode.toDataURL(link, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((dataUrl) => {
          setQrCodeDataUrl(dataUrl);
          setShowModal(true);
        })
        .catch((error) => {
          console.error("Error generating QR code:", error);
        });
    }
  }, [link]);

  // Poll order status when order is created
  useEffect(() => {
    if (order && isPolling) {
      if (order.status === "paid") {
        // Clear the polling interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPolling(false);
        setShowModal(false);
        toast.success("Payment successful! Your order has been confirmed.");
      }
    }
  }, [order, isPolling]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleConfirmOrder = async () => {
    setIsOrderConfirmed(true);

    try {
      const order = await createOrderAction({
        total: quantity * 100, // in cents
        description: "Brussels Matcha Tea",
      });

      console.log(order);

      setLink(order.link);
      setIsOrderConfirmed(true);
      setIsPolling(true);

      intervalRef.current = setInterval(async () => {
        try {
          const pendingOrder = await getOrderAction(order.orderId);
          setOrder(pendingOrder);
        } catch (error) {
          console.error(error);
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;
          setIsPolling(false);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      setLink(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized container with max-width */}
      <div className="max-w-md mx-auto bg-background min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">
                  Brussels Tea Co.
                </h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shop
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Product Section */}
        <main className="px-4 sm:px-6 py-6">
          <div className="space-y-6">
            {/* Product Image */}
            <div className="space-y-3">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/assets/matcha-tea.png"
                  alt="Brussels Matcha Tea - Premium ceremonial grade matcha"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Additional product images placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-md"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Brussels Matcha Tea
                </h1>
                <p className="text-base text-muted-foreground">
                  Premium ceremonial grade matcha from the heart of Brussels
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-foreground">
                  €1.00
                </span>
                <span className="text-base text-muted-foreground line-through">
                  €29.99
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (127 reviews)
                </span>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">
                  About this product
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Experience the perfect blend of traditional Japanese matcha
                  craftsmanship with a unique Brussels twist. Our premium
                  ceremonial grade matcha is carefully sourced and stone-ground
                  to perfection, delivering a rich, creamy texture and vibrant
                  green color that&apos;s perfect for both traditional tea
                  ceremonies and modern matcha lattes.
                </p>

                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Ceremonial grade quality
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Stone-ground to perfection
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Rich in antioxidants and L-theanine
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    Sustainably sourced
                  </li>
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-foreground"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground touch-manipulation"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-border text-foreground min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground touch-manipulation"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <button
                  onClick={handleConfirmOrder}
                  disabled={isOrderConfirmed}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-base transition-all duration-200 touch-manipulation ${
                    isOrderConfirmed
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                  }`}
                >
                  {isOrderConfirmed ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Order Confirmed!</span>
                    </div>
                  ) : (
                    "Confirm Order"
                  )}
                </button>

                {/* Order Summary */}
                <div className="bg-muted p-3 rounded-lg space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground">
                      €{(1 * quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="text-foreground">
                      €{(1 * quantity * 0.21).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-foreground">
                        €{(1 * quantity + 0 + 1 * quantity * 0.21).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex flex-col space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span className="mr-2">🚚</span>
                    Free shipping on orders over €50
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">↩️</span>
                    30-day returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* QR Code Modal */}
      {showModal && link && qrCodeDataUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Scan to Pay</h2>
              <p className="text-sm text-gray-600">
                Scan this QR code with your Brussels Pay app to complete payment
              </p>

              {/* QR Code */}
              <div className="flex justify-center">
                <Image
                  src={qrCodeDataUrl}
                  alt="Payment QR Code"
                  width={256}
                  height={256}
                  className="w-64 h-64 border border-gray-200 rounded-lg"
                />
              </div>

              {/* Loading State */}
              {isPolling && (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Waiting for payment confirmation...</span>
                </div>
              )}

              {/* Direct Link Button */}
              <button
                onClick={() => window.open(link, "_blank")}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Pay Directly
              </button>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
