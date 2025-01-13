import RootLayout from '@/components/RootLayout'
import WelcomeScreen from '@/components/welcome'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginForm from '@/components/visitor/login-from'
import UserDetailsForm from '@/components/visitor/visitor-multistep-form.tsx'
import VisitorMultiStepForm from '@/components/visitor/visitor-multistep-form.tsx'

const Visitor = () => {
  const [isWelcomeShown, setIsWelcomeShown] = useState(false)

  useEffect(() => {
    const welcomeStatus = localStorage.getItem('isWelcomeShown') === 'true'
    setIsWelcomeShown(welcomeStatus)
  }, [])

  const handleGetStarted = () => {
    localStorage.setItem('isWelcomeShown', 'true')
    setIsWelcomeShown(true)
  }

  return (
    <div className=" flex">
      {!isWelcomeShown ? (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      ) : (
        <RootLayout>
          <LoginForm />
        </RootLayout>
      )}
    </div>
  )
}

export default Visitor
