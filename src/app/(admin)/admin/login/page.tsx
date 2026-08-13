"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await loginAction(formData);
    },
    null
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/logo-si.jpeg" 
            alt="Logo" 
            width={80} 
            height={80} 
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-gray-500">Portal Pengurus SEMUT INDONESIA</p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              required
              defaultValue="admin@semutindonesia.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-red outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              required
              defaultValue="admin123"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:ring-2 focus:ring-semut-red outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-semut-red hover:bg-semut-red-dark text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
