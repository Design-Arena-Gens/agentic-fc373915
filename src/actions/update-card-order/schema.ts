import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      position: z.number(),
      listId: z.string(),
    })
  ),
  boardId: z.string(),
});
