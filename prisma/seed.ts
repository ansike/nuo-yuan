import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// 初始化 Prisma Client
const prisma = new PrismaClient();
async function main() {
  const userName = "demo";
  const dbUser = await prisma.user.findUnique({
    where: {
      name: userName,
    },
  });
  if(!dbUser){
    const hashedPassword = await bcrypt.hash(userName, 10);
    const user = await prisma.user.create({
      data: {
        name: userName,
        password: hashedPassword,
      },
    });
    
    console.log("insert done:", user);
  }else{
    console.log(`user (${userName}) is exist`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });
