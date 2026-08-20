import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  CalendarDays,
  CheckSquare,
  Compass,
  BarChart3,
  Cpu,
  Target as TargetIcon,
  Globe2,
  MessageSquareText,
  Library,
  RotateCcw,
  NotebookPen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Progress", url: "/progress", icon: TrendingUp },
      { title: "Roadmap", url: "/roadmap", icon: CalendarDays },
    ],
  },
  {
    label: "Learning tracks",
    items: [
      { title: "Product", url: "/product", icon: Compass },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Tech & GenAI", url: "/tech", icon: Cpu },
      { title: "Business & Growth", url: "/business", icon: TargetIcon },
      { title: "Domain Knowledge", url: "/domain", icon: Globe2 },
    ],
  },
  {
    label: "Practice",
    items: [
      { title: "Daily / Weekly", url: "/execution", icon: CheckSquare },
      { title: "Interview Prep", url: "/interview", icon: MessageSquareText },
      { title: "Revision Queue", url: "/revision", icon: RotateCcw },
      { title: "Resource Library", url: "/resources", icon: Library },
      { title: "Notes & Journal", url: "/notes", icon: NotebookPen },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-xs font-semibold">
            PP
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Placement Prep OS</span>
            <span className="text-[11px] text-muted-foreground">10-week readiness system</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {sections.map((s) => (
          <SidebarGroup key={s.label}>
            <SidebarGroupLabel>{s.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {s.items.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between px-2 py-1.5 group-data-[collapsible=icon]:justify-center">
          <span className="text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
