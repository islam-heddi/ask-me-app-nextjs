import React from "react";

interface VoteProps {
  userId?: string;
  answerId?: string;
}

export default function Vote(userId, answerId: VoteProps) {
  return (
    <div className="flex flex-row justify-center items-center p-1 bg-white m-4 rounded-2xl shadow-2xl">
      <div className="rounded-2xl inline-block p-3 text-center cursor-pointer text-2xl hover:bg-gray-500 transition-colors">
        &uarr;
      </div>
      <div className="rounded-2xl inline-block p-3 text-center cursor-pointer text-2xl hover:bg-gray-500 transition-colors">
        &darr;
      </div>
    </div>
  );
}
