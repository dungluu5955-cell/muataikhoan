import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";

export default async function AdminIndexPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}
