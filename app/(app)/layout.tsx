import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="main-wrap">
        <div className="page-content">{children}</div>
      </div>
      <MobileNav />
    </>
  );
}
