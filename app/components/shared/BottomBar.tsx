"use client";
import { sideBarLinks } from "@/constant/sidebarLinks";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const isActiveLink = usePathname();

  return (
    <div className="fixed flex bottom-0 z-20 lg:hidden overflow-auto items-center w-full bg-[#1e1f24] ">
      {sideBarLinks.map((item) => {
        const isActive = isActiveLink === item.route;
        return (
          <Link
            href={item.route}
            key={item.id}
            className={`flex max-lg:flex-col max-lg:items-center max-lg:py-1 max-sm:py-3  [&>*:first-child]:text-2xl w-full  ${
              isActive && "bg-[#18191d] border-b-4 border-[#5f62e0]"
            }`}
          >
            {item.icon}
            <div className="max-sm:hidden">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;
