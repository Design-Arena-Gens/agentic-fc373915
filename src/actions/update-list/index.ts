"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          ownerId: userId, // TODO: check for members
        },
      },
      data: {
        title,
      },
    });
  } catch {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
