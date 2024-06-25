"use client";

import { login } from "@/lib/actions/auth";
import { Button, Input } from "antd";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button
        aria-disabled={pending}
        htmlType="submit"
        type="primary"
        className="w-full rounded-full"
      >
        {pending ? "Log In..." : "Log In"}
      </Button>
      <div className="mt-1 flex justify-between">
        <span></span>
        <Link href="/page/signup">{'create new account >'}</Link>
      </div>
    </div>
  );
}

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  return (
    <form action={action} className="mt-10 w-72">
      <Input
        autoComplete="off"
        className="peer block w-full cursor-pointer rounded-md py-2 px-4 text-sm outline-2 placeholder:text-gray-500 "
        inputMode="numeric"
        id="name"
        name="name"
        placeholder="Please input user name"
        maxLength={11}
      />
      {state?.errors?.name && (
        <p className="text-red-400 mt-1 text-xs">{state.errors.name}</p>
      )}
      <Input
        autoComplete="new-password"
        id="password"
        name="password"
        type="password"
        className="peer block w-full cursor-pointer rounded-md py-2 px-4 text-sm outline-2 placeholder:text-gray-500 mt-4"
        placeholder="please input password"
      />
         {state?.errors?.password && (
        <p className="text-red-400 mt-1 text-xs">{state.errors.password}</p>
      )}
      <p className="text-red-400 mt-1">{state?.message}</p>
      <br />
      <LoginButton />
    </form>
  );
}
