import React from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full py-4 bg-primary-600 text-white text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
}
