"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import clsx from "clsx";

const FormSchema = z.object({
  userName: z.string().min(4, {
    message: 'Name must be minimum 4 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

export default function DetailsForm({ handleSubmit }: { handleSubmit: (details: { userName: string;  email: string}) => void }) {
          const form = useForm<z.infer<typeof FormSchema>>({
              resolver: zodResolver(FormSchema),
              defaultValues: {
                userName: '',
                email: '',
              },
          });
  
      function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSubmit(data);
      }
  
  const isButtonDisabled = !form.watch('userName') || !form.watch('email');
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start mt-8 w-full"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full">
              <FormLabel className="text-left text-sm font-plus-jakarta-sans">Name <span className="text-[#E03137]">*</span></FormLabel>
              <FormControl className="w-full">
                <Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start w-full mt-6">
              <FormLabel className="text-left text-sm font-plus-jakarta-sans">Email <span className="text-[#E03137]">*</span></FormLabel>
              <FormControl className="w-full">
                <Input className="py-4 px-5 h-11 md:h-14" placeholder="Enter you email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isButtonDisabled} className={clsx('bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]', { '': isButtonDisabled == true })} type="submit">Continue</Button>
      </form>
    </Form>
  )
}
