import React, { useEffect, useState, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IndiaFlag, LoginIllustration } from '@/assets/image/images';
import { Label } from '../ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { updateContactNumber } from '@/features/visitor/personalDetailsSlice';
import { RootState } from '@/app/store';
import { Edit } from 'lucide-react';
import OtpForm from './OtpForm';
import { useNavigate } from 'react-router';
import axiosInstance from '@/services/axiosInstance';
import toast from 'react-hot-toast';

const loginFormSchema = z.object({
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must not exceed 10 digits')
    .regex(/^\d+$/, 'Mobile number must contain only digits'),
  terms: z.boolean().refine((val) => val, 'You must accept the terms and conditions'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const [state, setState] = useState({ isOtpSent: false, timeLeft: 120 });
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const personalDetails = useSelector((state: RootState) => state.personalDetails);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { mobile: '', terms: false },
  });

  const resetTimer = () => setState((prev) => ({ ...prev, timeLeft: 120 }));

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const numericValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    field.onChange(numericValue);
  }, []);

  const onSubmit = (data: LoginFormValues) => {
    startTransition(() => {
      const generateOTP = async () => {
        const response = await axiosInstance.post('/OTP/generate', JSON.stringify(data.mobile));
        dispatch(updateContactNumber({ contactNumber: data.mobile, otp: '' }));
        setState({ isOtpSent: true, timeLeft: 120 });
      };

      toast.promise(generateOTP(), {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully!',
        error: 'Error generating OTP. Please try again.',
      });
    });
  };

  const handleVerify = (otp: string) => {
    startTransition(() => {
      const verifyOTP = async () => {
        try {
          const response = await axiosInstance.post('/OTP/verify', {
            mobileNumber: personalDetails.contactNumber,
            otp,
          });

          if (response.data.statusCode === 400) {
            toast.error(response.data.errorDetail);
            return;
          }

          // Success flow
          dispatch(updateContactNumber({ mobileNumber: personalDetails.contactNumber, otp }));
          toast.success(response.data.message);
          navigate('/visitor-form');
        } catch (error) {
          console.error('Error verifying OTP:', error);
          toast.error('An error occurred while verifying OTP. Please try again.');
        }
      };
      verifyOTP();
    });
  };

  const handleResend = () => {
    startTransition(() => {
      const resendOTP = async () => {
        const response = await axiosInstance.post('/OTP/generate', JSON.stringify(personalDetails.contactNumber));
        resetTimer();
      };

      toast.promise(resendOTP(), {
        loading: 'Resending OTP...',
        success: 'OTP resent successfully!',
        error: 'Failed to resend OTP. Please try again.',
      });
    });
  };

  useEffect(() => {
    if (state.isOtpSent) {
      const timer = setInterval(() => {
        setState((prev) => ({ ...prev, timeLeft: Math.max(prev.timeLeft - 1, 0) }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.isOtpSent]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 sm:p-10 rounded-lg shadow-md w-full max-w-lg text-center pb-20">
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
                        prefix={<img src={IndiaFlag} alt="India Flag" className="w-6 h-4" />}
                        placeholder="Enter your mobile number"
                        {...field}
                        disabled={state.isOtpSent}
                        onChange={(e) => handleMobileChange(e, field)}
                      />
                    </FormControl>
                    {state.isOtpSent && (
                      <Button
                        size="icon"
                        className="px-2 py-1"
                        variant="ghost"
                        onClick={() => setState({ ...state, isOtpSent: false })}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!state.isOtpSent && (
              <FormField
                name="terms"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <Label htmlFor="terms">
                        I accept the
                        <a
                          href="https://dfccil.com/Home/DynemicPages?MenuId=155"
                          target="_blank"
                          className="text-primary hover:underline mx-1"
                        >
                          terms and conditions
                        </a>
                        and
                        <a
                          href="https://dfccil.com/Home/DynemicPages?MenuId=154"
                          target="_blank"
                          className="text-primary hover:underline ml-1"
                        >
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
            {!state.isOtpSent && (
              <Button type="submit" className="w-full mt-10" disabled={isPending}>
                {isPending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            )}
          </form>
        </Form>
        {state.isOtpSent && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                You can resend OTP in{' '}
                <strong>
                  {state.timeLeft} {state.timeLeft === 1 ? 'second' : 'seconds'}
                </strong>
                .
              </p>
              <Button variant="link" disabled={state.timeLeft > 0} onClick={handleResend} size="sm">
                Resend OTP
              </Button>
            </div>
            <OtpForm onFormSubmit={handleVerify} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
