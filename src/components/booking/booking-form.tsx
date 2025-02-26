import React, { forwardRef, useImperativeHandle } from "react";
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
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button";

const FormSchema = z.object({
    name: z.string().min(6, {
        message: "Your name must be at least 6 characters.",
    }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(15, { message: "Phone number cannot exceed 15 digits." })
        .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
    recive_details: z.boolean().optional()
});

// Define the ref's function type
export interface BookingFormRef {
    submitForm: () => void;
}
type Props = {
  selectedSlot: string;
  selectedDate: string;
  handleChangeClick: () => void;

  handleFormSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    recive_details?: boolean;
  }) => void;
  price: number;
  currency: {
    symbol: string;
    code:string
  };
  allSlots: { stime: string; etime: string }[];
};
// Use forwardRef to allow the parent to trigger submission
const BookingForm = forwardRef<BookingFormRef, Props>(
  ({handleChangeClick, handleFormSubmit, selectedSlot, selectedDate, allSlots,price,currency }, ref) => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        recive_details: false,
      },
    });
    const convertDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`; // "YYYY-MM-DD"
    };
    function onSubmit(data: z.infer<typeof FormSchema>) {
      handleFormSubmit(data);
    }

    // Expose the submitForm function to the parent
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        form.handleSubmit(onSubmit)();
      },
    }));
    const formattedDate = convertDate(selectedDate);
    const endTime=allSlots.find((t)=>t.stime===selectedSlot)?.etime
    
    
    return (
      <div className="lg:w-2/5 rounded-[16px] border border-[#E3E6EA] p-5 md:p-[26px]">
        <h3 className="text-lg md:text-2xl/8 font-extrabold">
          Breaking into Product Management ({currency?.symbol?currency?.symbol:"$"}{price})
        </h3>

        <div className="bg-primary-light rounded-[12px] flex flex-col gap-8 md:gap-0 md:flex-row md:items-center justify-between mt-6 p-3.5 md:p-4">
          <div className="flex gap-3 items-center flex-shrink-0">
            <div className="flex flex-shrink-0 flex-col justify-center gap-0.5 rounded-[16px] overflow-hidden border border-[#DEDEDF] bg-[#F6F6F6] font-bold text-sm">
              <p className="px-5 pt-3">
                {" "}
                {new Date(formattedDate).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </p>
              <div className="pb-3 bg-white">
                <p className="text-center">
                  {" "}
                  {new Date(formattedDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-base/6 font-bold">
                {" "}
                {new Date(formattedDate).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                ,{" "}
                {new Date(formattedDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p className="text-[#5C5C5C]">
                {selectedSlot} - {endTime}(GMT +05:30)
              </p>
            </div>
          </div>
          <Button
            className="h-fit border border-foreground text-foreground font-bold"
            variant={"outline"}
            
            onClick={handleChangeClick}
          >
            Change
          </Button>
        </div>

        <Form {...form}>
          <form className="flex flex-col items-start mt-8 w-full">
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
            <FormField
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
            />
            <FormField
              control={form.control}
              name="recive_details"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 w-full mt-4">
                  <FormControl>
                    <Checkbox
                      className="!text-white border-foreground data-[state=checked]:bg-[#008060]"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Receive booking details on phone
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }
);
BookingForm.displayName = "BookingForm";
export default BookingForm;
