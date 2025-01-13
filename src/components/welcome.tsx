import React from 'react'
import { WhiteLogo } from '@/assets/image/images'
import { Button } from './ui/button'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center min-h-screen bg-primary relative overflow-hidden p-2 sm:p-0">
        {/* Decorative Background Elements */}
        <div className="absolute w-28 h-28 bg-blue-500 rounded-full opacity-30 top-10 right-2 animate-pulse"></div>
        <div className="absolute w-60 h-60 bg-blue-400 rounded-full opacity-20 -bottom-10 -right-6 animate-ping"></div>

        {/* Main Content */}
        <div className="text-center space-y-6 z-10">
          {/* Logo */}
          <img src={WhiteLogo} alt="DFCCIL Logo" className="mx-auto w-40 h-auto" />

          {/* Welcome Text */}
          <h1 className="text-white text-3xl font-bold">
            Welcome to <span className="text-yellow-400">DFCCIL</span>
          </h1>
          <p className="text-white text-base sm:text-lg max-w-md mx-auto">
            Dedicated Freight Corridor Corporation of India Limited (DFCCIL) is transforming freight transport in India. Join us in building the
            future of railway infrastructure.
          </p>

          {/* Get Started Button */}
          <Button
            className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
