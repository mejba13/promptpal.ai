import { Sidebar, DashboardHeader } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="pl-[280px] transition-all duration-300">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
