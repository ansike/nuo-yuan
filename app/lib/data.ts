import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export async function getUser() {
  try {
    const session = cookies().get("session");
    if (session) {
      const sessionUser = await decrypt(session.value);
      const user = await prisma.user.findUnique({
        where: {
          id: +(sessionUser as any)?.userId,
        },
      });
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
