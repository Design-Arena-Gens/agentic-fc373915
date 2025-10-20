"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createBoard = async (formData: { title: string }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { title } = formData;

  await db.board.create({
    data: {
      title,
      ownerId: userId,
    },
  });

  revalidatePath("/boards");
};
