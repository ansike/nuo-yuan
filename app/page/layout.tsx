import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 首页",
    default: "周边玩",
  },

};

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow flex-col h-full bg-gray-100">
      <div className="flex-grow overflow-y-auto">{children}</div>
      <div className="mt-2 text-center py-2 text-gray-300">@xxx 2024-2030 xxx All rights reserved</div>
    </div>
  );
}
