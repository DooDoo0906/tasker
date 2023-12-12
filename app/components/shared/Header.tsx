import Link from "next/link";
import React from "react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="fixed top-0 flex shadow-xl border-black bg-[#1e1f24] w-full py-4 px-5  items-center z-30">
      <section>
        <Link
          className="flex items-center [&>*:first-child]:text-[#dd7e4e]  space-x-2  md:text-2xl text-xl"
          href="/"
        >
          <Image
            src="/logo/logo-no-background.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <div>Tasker</div>
        </Link>
      </section>
      <section className="flex-1"></section>
      <section>
        <UserButton afterSignOutUrl="/" />
      </section>
    </nav>
  );
};

export default Header;
