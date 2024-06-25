import "@/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | 首页",
    default: "NUO YUAN",
  },
  // description: "The official Next.js Learn Dashboard built with App Router.",
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
