"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface YooKassaWidgetProps {
  confirmationToken: string;
  returnUrl: string;
  onSuccess: () => void;
  onError: () => void;
}

export default function YooKassaWidget({
  confirmationToken,
  returnUrl,
  onSuccess,
  onError,
}: YooKassaWidgetProps) {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    if (!isWidgetLoaded || !confirmationToken) return;

    // Инициализация виджета ЮKassa после загрузки скрипта
    const checkout = new (window as any).YooMoneyCheckoutWidget({
      confirmation_token: confirmationToken,
      return_url: returnUrl,
      error_callback: function(error: any) {
        console.error("YooKassa Error:", error);
        onError();
      }
    });

    checkout.on('success', () => {
      onSuccess();
      checkout.destroy();
    });

    checkout.on('fail', () => {
      onError();
      checkout.destroy();
    });

    checkout.render('payment-form');

    return () => {
      checkout.destroy();
    };
  }, [isWidgetLoaded, confirmationToken, returnUrl, onSuccess, onError]);

  return (
    <>
      <Script 
        src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js" 
        onLoad={() => setIsWidgetLoaded(true)}
      />
      <div id="payment-form" className="w-full min-h-[400px]"></div>
    </>
  );
}