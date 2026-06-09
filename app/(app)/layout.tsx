"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { WelcomeModal } from "@/components/ui/WelcomeModal";
import { useAuth } from "@/providers/AuthProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "var(--bg-page)",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Memuat...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="main-wrap">
        <div className="page-content">{children}</div>
      </div>
      <MobileNav />
      <ChatWidget />
      <WelcomeModal />
    </>
  );
}