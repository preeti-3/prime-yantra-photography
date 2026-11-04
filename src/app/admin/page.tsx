import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminPanel } from "@/components/admin-panel";
import {
  adminConfigured,
  SESSION_COOKIE,
  validSession,
} from "@/lib/admin-security";
import { sanityConfigured } from "@/lib/sanity-images";

export const metadata: Metadata = {
  title: "Image admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = validSession(
    (await cookies()).get(SESSION_COOKIE)?.value,
  );
  return (
    <AdminPanel
      authenticated={authenticated}
      adminReady={adminConfigured()}
      cmsReady={sanityConfigured()}
    />
  );
}
