"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { router, isSeller } = useAppContext();
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setRole(parsedData?.role);
    }
  }, []);

  const handleProfile = () => {
    if (!userData || userData === null || userData === undefined) {
      return "Login"
    } else if (role === "ADMIN") {
      return "Admin"
    }
    else if (role === "SELLER") {
      return "Seller"
    }
    else if (role === "USER") {
      return "User"
    }
  }

  console.log("Role", handleProfile());
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 bg-white text-gray-700 z-50 shadow-md">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {role === "SELLER" && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {handleProfile() == "Login" ?
          <button className="border px-3 rounded-[5px] flex items-center gap-2 hover:text-gray-900 transition" onClick={() => router.push('/login')}>
            {handleProfile()}
          </button>
          :
          <button className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>}
      </ul>

     
    </nav>
  );
};

export default Navbar;
