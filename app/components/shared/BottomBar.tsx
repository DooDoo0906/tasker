import { sideBarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import React from "react";

const BottomBar = () => {
  return (
    <div className="fixed flex bottom-0 z-20 lg:hidden overflow-auto items-center w-full bg-[#1e1f24] ">
      {sideBarLinks.map((item) => {
        //TODO: do the navigation
        //   const isActive = isActiveLink === item.route;
        const isActive = true;
        return (
          <Link
            href={item.route}
            key={item.id}
            className={`flex max-lg:flex-col max-lg:items-center max-lg:py-1 max-sm:py-3  [&>*:first-child]:text-2xl w-full  ${
              item.index === 1 && "bg-[#18191d] border-b-4 border-[#5f62e0]"
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
