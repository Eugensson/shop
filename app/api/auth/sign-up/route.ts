import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/lib/db-connect";
import { UserModel } from "@/lib/models/user-model";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Усі поля є обов’язковими для заповнення" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Електронна пошта вже використовується" },
        { status: 409 }
      );
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "Реєстрація успішна" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Помилка сервера. Спробуйте пізніше." },
      { status: 500 }
    );
  }
};
