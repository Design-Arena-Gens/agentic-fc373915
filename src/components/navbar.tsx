import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      {/* TODO: Mobile sidebar */}
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <p className="text-lg font-semibold">Tasky</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
