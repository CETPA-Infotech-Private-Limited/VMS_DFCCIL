import React from 'react';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from './ui/sidebar';
import SiteHeader from './site-header';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <SiteHeader />

      {/* Main Layout */}
      <SidebarProvider className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar className="w-64 bg-gray-800 text-white flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 p-2 bg-gray-100 overflow-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout;
