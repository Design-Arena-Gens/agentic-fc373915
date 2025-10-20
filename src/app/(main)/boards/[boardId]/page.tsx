import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { boardId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { userId } = await auth();

  if (!userId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      ownerId: userId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdPage = async ({ params }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      ownerId: userId, // TODO: check for members
    },
    include: {
      lists: {
        include: {
          cards: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!board) {
    return redirect("/boards");
  }

  return (
    <div className="p-4 h-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
      <ListContainer board={board} />
    </div>
  );
};

export default BoardIdPage;