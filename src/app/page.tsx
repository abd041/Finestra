import { redirect } from "next/navigation";
import { defaultLocale } from "@/content";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
