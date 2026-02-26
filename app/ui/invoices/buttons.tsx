 'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, DeleteInvoiceState } from '@/app/lib/actions';
import { useActionState, useEffect } from 'react';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const initialState: DeleteInvoiceState = { success: undefined, message: null };
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [state, formAction] = useActionState(deleteInvoiceWithId, initialState);

  useEffect(() => {
    if (!state.message || state.success === undefined) return;

    window.dispatchEvent(
      new CustomEvent('invoice-action-toast', {
        detail: {
          type: state.success ? 'success' : 'error',
          message: state.message,
        },
      }),
    );
  }, [state.message, state.success]);

  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
