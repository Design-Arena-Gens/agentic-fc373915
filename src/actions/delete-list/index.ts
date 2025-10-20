"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          ownerId: userId, // TODO: check for members
        },
      },
    });
  } catch {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
