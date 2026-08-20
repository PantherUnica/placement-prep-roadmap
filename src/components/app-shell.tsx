import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useHydrated } from "@/lib/hydration";

export function AppShell({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur">
          <SidebarTrigger />
          <div className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {hydrated ? (
            children
          ) : (
            <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
              Loading…
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
