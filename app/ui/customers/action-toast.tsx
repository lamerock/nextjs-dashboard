'use client';

import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error';

type ToastState = {
  type: ToastType;
  message: string;
} | null;

export default function CustomerActionToast() {
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: ToastType; message: string }>;
      setToast(customEvent.detail);
    };

    window.addEventListener('customer-action-toast', onToast);

    return () => {
      window.removeEventListener('customer-action-toast', onToast);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed right-4 top-4 z-50">
      <div
        className={`rounded-md px-4 py-3 text-sm text-white shadow ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
}
