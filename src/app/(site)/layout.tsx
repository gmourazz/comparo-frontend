import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlobalOverlays } from "@/components/layout/GlobalOverlays";
import { getActiveMachines } from "@/services/catalog/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const machines = await getActiveMachines();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-bg font-inter text-text">
      <Header />
      {children}
      <Footer />
      <GlobalOverlays machines={machines} />
    </div>
  );
}
