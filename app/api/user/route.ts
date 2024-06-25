import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ message: "user id is required" });
  }
  const users = await prisma.user.findUnique({ where: { id: +id } });
  return Response.json(users);
}
