"use client";

import { signUp } from "@/lib/actions/auth";
import { Button, Input } from "antd";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      htmlType="submit"
      type="primary"
      className="w-full rounded-full"
      style={{ borderRadius: 20, height: 36 }}
    >
      {pending ? "Sign Up..." : "Sign Up"}
    </Button>
  );
}

export function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);

  return (
    <form action={action} className="mt-10 w-72">
      <Input
        autoComplete="off"
        className="peer block w-full cursor-pointer rounded-md py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
        id="name"
        name="name"
        placeholder="Please input user name"
        maxLength={20}
      />
      {state?.errors?.name && (
        <p className="text-red-400 mt-1 text-xs">{state.errors.name}</p>
      )}

      <Input
        className="peer block w-full cursor-pointer rounded-md py-2 px-4 text-sm outline-2 placeholder:text-gray-500 mt-4"
        autoComplete="new-password"
        id="password"
        name="password"
        placeholder="please input password"
        type="password"
      />
     {state?.errors?.password && (
        <p className="text-red-400 mt-1 text-xs">{state.errors.password}</p>
      )}

      <p className="text-red-400 mt-1">{state?.message}</p>
      <br />
      <SignUpButton />
    </form>
  );
}
