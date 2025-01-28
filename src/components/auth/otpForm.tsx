'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import clsx from 'clsx';


import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import OtpResendTimer from './resendOtp';

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
})

export const OtpForm = ({ handleSubmit }: { handleSubmit: (otp: string) => void}) => {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                otp: '',
            },
        });
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSubmit(data.otp);
    }
    
    const isButtonDisabled = !form.watch('otp');
    
  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                      <FormItem className='flex flex-col items-start w-full'>
                          <FormLabel className='text-left text-sm font-plus-jakarta-sans'>Enter OTP <span className='text-[#E03137]'>*</span></FormLabel>
                          <FormControl>
                              <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} {...field}>
                                  {Array.from({ length: 6 }).map((_, index) => (
                                      <InputOTPGroup  key={index}>
                                          <InputOTPSlot inputMode='numeric' className='py-4 px-5 h-11 md:h-14 w-12 md:w-[68px]' index={index} />
                                      </InputOTPGroup>
                                  ))}
                              </InputOTP>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <OtpResendTimer    />
              <Button disabled={isButtonDisabled} className={clsx('bg-primary text-white w-full px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]', { '': isButtonDisabled == true })} type='submit'>Continue</Button>
          </form>
      </Form>
  )
}
