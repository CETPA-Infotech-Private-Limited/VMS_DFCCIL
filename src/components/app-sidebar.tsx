import * as React from 'react';
import { CalendarCheck, CalendarSync, Contact, Home, LayoutDashboard, Settings, UserPlus } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { logo } from '@/assets/image/images';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/home',
      icon: LayoutDashboard,
    },
    {
      title: 'Pending Meeting',
      url: '/pending-meeting',
      icon: CalendarSync,
    },
    {
      title: 'Upcoming Meeting ',
      url: '/upcomming-meeting',
      icon: CalendarCheck,
    },
    {
      title: 'Contact List ',
      url: '/contact-list',
      icon: Contact,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className=" pt-20">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
