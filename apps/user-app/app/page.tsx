"use client";

import React from "react";
import { useBalance } from "@repo/store";

const Page = () => {
  const balance = useBalance();
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-500">Hello Jeet!</h1>
      {balance}
    </div>
  );
};

export default Page;
