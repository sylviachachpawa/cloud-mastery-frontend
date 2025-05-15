"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiGrid, FiUsers, FiSettings } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", href: "/", icon: <FiGrid /> },
  { label: "Products", href: "/products", icon: <FiUsers /> },
  { label: "Customers", href: "/customers", icon: <FiSettings /> },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 w-64 h-screen border-r bg-white p-4">
      <nav className="flex flex-col space-y-6 ">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 hover:border hover:border-sky-300 hover:bg-sky-200 rounded-lg p-3 text-sm font-medium ${
                isActive
                  ? "text-sky-900 border border-sky-200 bg-sky-200 font-semibold"
                  : "text-gray-500"
              } hover:text-black`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
