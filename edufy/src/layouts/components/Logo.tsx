"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? "/logo.png" // Change this to the dark mode logo path
      : "/logo.png"; // Change this to the default logo path

  return (
    <Link href="/" className="navbar-brand inline-block">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150} // Change this to your desired width
        height={27} // Change this to your desired height
        priority
      />
    </Link>
  );
};

export default Logo;
