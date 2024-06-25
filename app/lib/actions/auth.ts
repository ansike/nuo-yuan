"use server";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { FormState, LoginFormSchema, SignUpFormSchema } from "../definitions";
import prisma from "@/lib/prisma";

export async function signUp(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { name, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // 3. Insert the user into the database or call an Library API
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });
    // Current steps:
    // 4. Create user session
    await createSession(user.id);
    // 5. Redirect user
  } catch (error: any) {
    console.log(error);
    return {
      message: `An error occurred while creating the user (${error.message}).`,
    };
  }
  redirect("/page/home");
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { name, password } = validatedFields.data;
  try {
    // 3. Insert the user into the database or call an Library API
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return {
        message: `user (${name}) is not exist`,
      };
    }
    // 使用bcrypt比较提交的密码和数据库中的密码哈希
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // 根据比较结果，返回验证信息
    if (isPasswordMatch) {
      // 密码匹配，返回成功和用户信息
      await createSession(user.id);
    } else {
      // 密码不匹配，返回失败
      return { success: false, message: 'The username and password do not match' };
    }
    // 4. Create user session
    // 5. Redirect user
  } catch (error: any) {
    console.log(error);
    return {
      message: `login error: (${error.message}).`,
    };
  }
  redirect("/page/home");
}
export async function logout() {
  deleteSession();
  redirect("/page/login");
}
