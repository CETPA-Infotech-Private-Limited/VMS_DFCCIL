import { type LucideIcon } from 'lucide-react'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { NavLink } from 'react-router'

export function NavMain({
  items
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavLink to={item.url} onClick={() => setOpenMobile(false)}>
              {({ isActive }) => (
                <SidebarMenuButton
                  asChild
                  className={`transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'bg-primary text-white hover:bg-primary hover:text-white h-10'
                      : 'hover:bg-primary hover:text-white active:bg-primary active:text-white h-10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
