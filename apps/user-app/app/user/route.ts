
import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db";

const client = new PrismaClient();
export const POST = async () => {
  try {
    await client.user.create({
      data: {
        email: "asdtyryrtyt563ytryrt",
        name: "adsads63",
      },
    });

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
