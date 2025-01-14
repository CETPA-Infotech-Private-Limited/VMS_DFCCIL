import React from 'react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '../ui/label';
import { ArrowRight } from 'lucide-react';

interface OtpFormProps {
  onFormSubmit: (otp: string) => void;
}

const FormSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: 'Your one-time password must be 4 characters.',
    })
    .regex(/^\d{4}$/, {
      message: 'One-time password must be a valid 4-digit number.',
    }),
});

const OtpForm: React.FC<OtpFormProps> = ({ onFormSubmit }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const {
    formState: { errors },
  } = form;
  const onSubmit = (value: { otp: string }) => {
    onFormSubmit(value.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="text-left">
              <Label>
                One-Time Password <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <InputOTP maxLength={4} {...field} className="w-full">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  {/* <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup> */}
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="sm:w-1/4 w-full" disabled={Object.keys(errors).length > 0}>
          Submit Now <ArrowRight />
        </Button>
      </form>
    </Form>
  );
};

export default OtpForm;
