"use client";
import { sideBarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const LefSideBar = () => {
  const isActiveLink = usePathname();
  return (
    <div className="flex flex-col fixed top-0 left-0 z-20 max-md:hidden overflow-auto h-screen w-56 bg-[#1e1f24] pb-5 pt-10">
      <section className="mt-11 flex flex-col space-y-10 w-ful items-center">
        {sideBarLinks.map((item) => {
          //   const isActive = isActiveLink === item.route;
          const isActive = true;
          return (
            <div
              key={item.id}
              className={`flex items-center space-x-3 [&>*:first-child]:text-2xl w-full pl-10 py-4 ${
                item.index % 2 && "bg-[#18191d] border-l-4 border-[#5f62e0]"
              }`}
            >
              {item.icon}
              <Link href={item.route}>{item.name}</Link>
            </div>
          );
        })}
      </section>
      <section className="flex-1"></section>
      <section className="flex w-ful items-center">
        <div className={`flex items-center  w-full pl-5 py-4 `}>
          <Link href="/" className="flex space-x-3">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/72665227?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <section>
              <div>Lại Đình Thuận</div>
              <div className="text-sm text-gray-400">Developer</div>
            </section>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LefSideBar;
