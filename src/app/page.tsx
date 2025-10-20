import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/boards");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tasky</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your new favorite project management tool.
        </p>
        <Link
          href="/sign-up"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}