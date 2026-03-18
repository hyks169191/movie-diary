import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "映画感想記録",
  description: "観た映画の感想を記録・一覧できるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
