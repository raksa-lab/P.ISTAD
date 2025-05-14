import React from "react";

export default function ButtonCom() {
  return (
    <main className="flex items-center justify-center h-screen gap-5">
      <button className="bg-secondary hover:bg-accent_1 text-white font-semibold py-2 px-5 rounded-[12px]">
        Button
      </button>
      <button className="border border-secondary text-secondary font-semibold py-2 px-5 rounded-[12px]">
        Button Outline 1
      </button>
    </main>
  );
}
