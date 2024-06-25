"use client";

import { Button, message } from "antd";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      messageApi.success("logout success");
      setTimeout(() => {
        router.replace("/page/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      {contextHolder}
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
