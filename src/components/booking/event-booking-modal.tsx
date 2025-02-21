import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';


const FormSchema = z.object({
    name: z.string().min(6, {
        message: "Your name must be at least 6 characters.",
    }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    // phone: z
    //     .string()
    //     .min(10, { message: "Phone number must be at least 10 digits." })
    //     .max(15, { message: "Phone number cannot exceed 15 digits." })
    //     .regex(/^\d+$/, { message: "Phone number must contain only digits." })
});

export default function EventBookingModal({
  open,
  setOpen,
  register,
  isProcessing,
}: {
  isProcessing:boolean
  open: boolean;
  setOpen: (open: boolean) => void;
  register: (data:{email:string,name:string}) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      // phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
   register(data)
  }

    const isButtonDisabled = !form.watch("name");
  // const isButtonDisabled = false;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enter Your Details</DialogTitle>
          <DialogDescription>
           Ensure all information is accurate for a smooth experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start mt-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                    Name <span className="text-[#E03137]">*</span>
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      className="py-4 px-5 h-11 md:h-14"
                      placeholder="Enter your name"
                      {...field}
                    />
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
                  <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                    Email <span className="text-[#E03137]">*</span>
                  </FormLabel>
                  <FormControl className="w-full bg-[#FAFAFA]">
                    <Input
                      className="py-4 px-5 h-11 md:h-14"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full mt-6">
                  <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                    Phone <span className="text-[#E03137]">*</span>
                  </FormLabel>
                  <FormControl className="w-full bg-[#FAFAFA]">
                    <Input
                      className="py-4 px-5 h-11 md:h-14"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {isProcessing ? (
              <Button
                disabled={isButtonDisabled}
                className={cn(
                  "bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]",
                  { "opacity-50 cursor-not-allowed": isButtonDisabled }
                )}
              
              >
                Processing...
              </Button>
            ) : (
              <Button
                disabled={isButtonDisabled}
                className={cn(
                  "bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]",
                  { "opacity-50 cursor-not-allowed": isButtonDisabled }
                )}
              
                  type="submit"
              >
                Continue
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
