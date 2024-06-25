'use server'
import { getUser } from "@/lib/data";
import LogoutBtn from "@/ui/logout-btn";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex w-screen flex-col justify-center items-center h-80">
      <div>
        have a good day&nbsp;<span style={{ color: "blue" }}>{user?.name}</span>
      </div>
      <LogoutBtn />
    </main>
  );
}
