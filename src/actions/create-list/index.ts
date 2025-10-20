"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;
  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        ownerId: userId, // TODO: check for members
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    const newPosition = lastList ? lastList.position + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        position: newPosition,
      },
    });
  } catch {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
