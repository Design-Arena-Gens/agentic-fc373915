import { z } from "zod";

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      position: z.number(),
    })
  ),
  boardId: z.string(),
});
