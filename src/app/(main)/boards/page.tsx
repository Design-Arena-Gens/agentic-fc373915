import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreateBoardButton } from "./_components/create-board-button";

const BoardsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const boards = await db.board.findMany({
    where: {
      ownerId: userId,
    },
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Boards</h1>
        <CreateBoardButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/boards/${board.id}`}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {board.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;
