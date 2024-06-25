import { LoginForm } from "@/ui/login-form";

export default function Page() {
  return (
    <div>
      <div className="w-screen flex flex-col justify-center items-center">
        <div className="mt-20 font-bold">NUO YUAN LOGIN</div>
        <LoginForm />
      </div>
    </div>
  );
}
