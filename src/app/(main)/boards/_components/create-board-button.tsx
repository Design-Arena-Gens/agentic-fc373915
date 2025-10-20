"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const CreateBoardButton = () => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("createBoard")}>Create Board</Button>
  );
};
