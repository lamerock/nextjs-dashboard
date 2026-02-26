'use client';

import { deleteCustomer, DeleteCustomerState } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const initialState: DeleteCustomerState = { success: undefined, message: null };
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
  const [state, formAction] = useActionState(deleteCustomerWithId, initialState);

  useEffect(() => {
    if (!state.message || state.success === undefined) return;

    window.dispatchEvent(
      new CustomEvent('customer-action-toast', {
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
