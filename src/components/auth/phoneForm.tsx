'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "../phone-input";
import clsx from "clsx";
import Image from "next/image";

const FormSchema = z.object({
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export default function PhoneForm({ handleSubmit }: { handleSubmit: (phone: string) => void}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleSubmit(data.phone);
    }

    const isButtonDisabled = !form.watch("phone") || !isValidPhoneNumber(form.watch("phone"));

    return (
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start mt-8 w-full"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel className="text-left text-sm font-plus-jakarta-sans">
                    Mobile <span className="text-[#E03137]">*</span>
                  </FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      defaultCountry="IN"
                      className="gap-2"
                      placeholder="Enter a phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isButtonDisabled}
              className={clsx(
                "bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]",
                { "": isButtonDisabled == true }
              )}
              type="submit"
            >
              Send OTP
            </Button>
          </form>
        </Form>
        <div className="w-full">
          <div className="flex gap-4 items-center my-4">
            <div className="bg-gray-200 h-[1px] flex-grow w-full"></div>
            {/* <p className="text-gray-600 font-plus-jakarta-sans text-sm font-medium leading-[160%] text-center text-nowrap">Or login with</p> */}
            <div className="bg-gray-200 h-[1px] flex-grow w-full"></div>
          </div>

          <div className="">
            <h2 className="text-2xl md:text-[20px] font-bold">
              Why a mobile number?
            </h2>
            <p className="text-2xl md:text-[10px] font-bold">
              It's simpler than remembering an email and password, and it also
              helps confirm that you're a real person.
            </p>
          </div>
          <div className="flex gap-4">
            {/* <Button variant="outline" className="bg-white dark:bg-black py-4 px-6 min-h-[56px] w-full">
                        <Image width={22} height={22} src="/images/google.svg" alt="Google" /> <p className="font-plus-jakarta-sans text-base font-medium leading-[150%] tracking-[0.2px]">Google</p>
                    </Button>
                    <Button variant="outline" className="bg-white dark:bg-black py-4 px-6 min-h-[56px] w-full">
                        <Image width={22} height={22} src="/images/linkedIn.svg" alt="Google" /> <p className="font-plus-jakarta-sans text-base font-medium leading-[150%] tracking-[0.2px]">LinkedIn</p>
                    </Button> */}
          </div>
        </div>
      </>
    );
}
