
import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db";

const client = new PrismaClient();


export const POST = async () => {
  try {
    await client.user.create({
      data: {
        email: "jeet2276156@gmail.com",
        name: "jeet",
        number:"9635962585",
        password:"hello"
      },
    });

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error },{status:500});
  }
};
