import SiteHeader from './site-header'
import Footer from './footer'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <SiteHeader />
      <div className=" flex-1 w-full p-2 sm:p-6 bg-[#F0F5FF]">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout
