"use client";

import { sideBarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";

const LefSideBar = () => {
  const isActiveLink = usePathname();

  return (
    <div className="flex flex-col fixed top-0 left-0 z-20 max-lg:hidden overflow-auto h-screen w-56 bg-[#1e1f24] pb-5 pt-10">
      <section className="mt-11 flex flex-col space-y-10 w-ful items-center">
        {sideBarLinks.map((item) => {
          //TODO: do the navigation
          //   const isActive = isActiveLink === item.route;
          const isActive = true;
          return (
            <Link
              href={item.route}
              key={item.id}
              className={`flex items-center space-x-3 [&>*:first-child]:text-2xl w-full pl-10 py-4 ${
                item.index === 1 && "bg-[#18191d] border-l-4 border-[#5f62e0]"
              }`}
            >
              {item.icon}
              <div>{item.name}</div>
            </Link>
          );
        })}
      </section>
      <section className="flex-1"></section>
      <section className="flex justify-center">
        <div className=" border-b-2 w-44 border-[#434a50]"></div>
      </section>
      <section className="flex [&>*:first-child]:text-2xl items-center space-x-2 pl-10  py-10">
        <CiLogout />
        <SignOutButton />
      </section>
    </div>
  );
};

export default LefSideBar;
