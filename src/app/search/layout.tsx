import type { Metadata } from "next";
import { siteName } from "@/config";

export const metadata: Metadata = {
  title: `Search | ${siteName}`,
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
