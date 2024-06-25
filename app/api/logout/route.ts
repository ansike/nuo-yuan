import { logout } from "@/lib/actions/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    logout();
    return Response.json({ messge: "success" });
  } catch (error: any) {
    return Response.json({ message: error?.message || "server error" });
  }
}
