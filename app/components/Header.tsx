import Image from "next/image";
import Link from "next/link";
import { FiBell, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow ">
      <div className="flex items-center space-x-2">
        <Link href={"/"}>
          <Image src="/logo.png" alt="Pawa IT Logo" width={100} height={40} />
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-md bg-sky-200 hover:border hover:bg-sky-200 hover:border-sky-300 transition cursor-pointer">
          <FiBell className="w-5 h-5 text-sky-900 " />
        </button>

        <button className="flex items-center space-x-2 bg-sky-200 hover:border hover:bg-sky-200  hover:border-sky-300 text-sky-900 font-medium py-2 px-3 rounded-md transition cursor-pointer">
          <FiUser className="w-4 h-4" />
          <span>Flatlay Carpets</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
