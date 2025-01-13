import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { IndiaFlag, LoginIllustration } from '@/assets/image/images'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { updateContactNumber } from '@/features/visitor/personalDetailsSlice'
import { RootState } from '@/app/store'
import { Edit } from 'lucide-react'
import OtpForm from './OtpForm'
import { useNavigate } from 'react-router'
import { POSTData } from '@/api/httpClient'

const loginFormSchema = z.object({
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must not exceed 10 digits')
    .regex(/^\d+$/, 'Mobile number must contain only digits'),
  terms: z.boolean().refine((val) => val, 'You must accept the terms and conditions')
})

type LoginFormValues = z.infer<typeof loginFormSchema>

const LoginForm: React.FC = () => {
  const [isPending, startTransition] = useTransition()
  const dispatch = useDispatch()
  const personalDetails = useSelector((state: RootState) => state.personalDetails)
  const [timeLeft, setTimeLeft] = useState(120)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      mobile: '',
      terms: false
    }
  })

  const handleVerify = (otp: string) => {
    startTransition(() => {
      dispatch(updateContactNumber({ contactNumber: personalDetails.contactNumber, otp }))
      console.log('OTP entered:', otp)
      navigate('/visitor-form')
    })
  }

  const handleResend = () => {
    console.log('Resend OTP')
    setTimeLeft(120)
    alert('OTP resent successfully!')
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const onSubmit = (data: LoginFormValues) => {
    dispatch(updateContactNumber({ contactNumber: data.mobile, otp: '' }))
    setTimeLeft(120)
    setIsOtpSent(true)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 sm:p-10 rounded-lg shadow-md w-full max-w-lg text-center flex-1 pb-20">
        <div className="mb-6">
          <img src={LoginIllustration} alt="Login Illustration" className="mx-auto w-48" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
            <FormField
              name="mobile"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Enter Mobile Number<span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        type="number"
                        prefix={<img src={IndiaFlag} alt="Indian Flag" className="w-6 h-4" />}
                        placeholder="Enter your mobile number"
                        {...field}
                        disabled={isOtpSent}
                        onChange={(e) => {
                          const inputValue = e.target.value
                          const numericValue = inputValue.replace(/\D/g, '').slice(0, 10)
                          field.onChange(numericValue)
                        }}
                      />
                    </FormControl>
                    {isOtpSent && (
                      <Button size="icon" className="px-2 py-1" variant="ghost" onClick={() => setIsOtpSent(false)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isOtpSent && (
              <FormField
                name="terms"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" onCheckedChange={(checked) => field.onChange(!!checked)} checked={field.value} />
                      <Label htmlFor="terms">
                        I accept the
                        <a href="https://dfccil.com/Home/DynemicPages?MenuId=155" target="_blank" className="text-primary hover:underline mx-1">
                          terms and conditions
                        </a>
                        and
                        <a href="https://dfccil.com/Home/DynemicPages?MenuId=154" target="_blank" className="text-primary hover:underline ml-1">
                          privacy policy
                        </a>
                        .
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isOtpSent && (
              <Button type="submit" className="w-full mt-10 " disabled={isPending}>
                {isPending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            )}
          </form>
        </Form>
        {isOtpSent && (
          <div>
            <div className="">
              {/* <div className="h-2 bg-gray-200 rounded-full overflow-hidden" style={{ width: '100%' }}>
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(timeLeft / 120) * 100}%` }}></div>
              </div> */}
              <div className="flex flex-row justify-between  items-center">
                <p className="mt-2 text-sm text-gray-600">
                  You can resend OTP in{' '}
                  <strong>
                    {timeLeft} {timeLeft === 1 || 0 ? 'second' : 'seconds'}
                  </strong>
                  .
                </p>

                <Button variant="link" disabled={timeLeft > 0} onClick={handleResend} className="mt-2 px-0" size="sm">
                  Resend OTP
                </Button>
              </div>
            </div>
            <OtpForm onFormSubmit={handleVerify} />{' '}
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm
