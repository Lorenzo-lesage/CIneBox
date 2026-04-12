// Layout
import { Navbar, Footer } from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <Navbar />
      <div className="min-h-screen">
        <main className=" overflow-hidden">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
