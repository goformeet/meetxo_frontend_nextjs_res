import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";


import PhoneForm from "./phoneForm";
import { OtpForm } from "./otpForm";
import DetailsForm from "./detailsForm";


interface ChildProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  step: "phone" | "otp" | "details";
  phone:string;
  handlePhoneSubmit: (phone: string) => void;
  handleOtpSubmit: (otp: string) => void;
  handleDetailsSubmit: (details: { userName: string; email: string }) => void;
}
export default function LoginModal({
  open,
  setOpen,
  step,
  phone,
  handlePhoneSubmit,
  handleOtpSubmit,
  handleDetailsSubmit,
}: ChildProps) {
  const renderForm = (step: string) => {
    switch (step) {
      case "phone":
        return <PhoneForm handleSubmit={handlePhoneSubmit} />;
      case "otp":
        return <OtpForm handleSubmit={handleOtpSubmit} />;
      case "details":
        return <DetailsForm handleSubmit={handleDetailsSubmit} />;
      default:
        return <PhoneForm handleSubmit={handlePhoneSubmit} />;
    }
  };
   const maskPhoneNumber = (phone: string): string => {
     if (phone.length < 3) return phone;

     return phone[0] + phone[1] + phone[2] + "****" + phone.slice(-3);
   };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>LOG IN</DialogTitle>
          <DialogDescription>Hi, Welcome to MeetXO!</DialogDescription>
        </DialogHeader>
        {/* <h2 className="hidden md:block text-2xl md:text-[40px] font-bold leading-10"></h2> */}
        <p className="md:mt-6 text-2xl/[130%] font-bold ">
          {step !== "details"
            ? "Login to your account"
            : "Please Fill Below Details"}
        </p>

        {step === "otp" && (
          <p className="text-center text-muted-foreground my-7 font-plus-jakarta-sans text-sm font-medium leading-[22px] tracking-[0.07px]">
            We have just sent you 6 digit code via your Mobile{" "}
            {maskPhoneNumber(phone ? phone : "")}
          </p>
        )}
        {renderForm(step)}
        {/* <Button
              disabled={isButtonDisabled}
              className={cn(
                "bg-primary text-white w-full mt-7 md:mt-8 px-6 py-6 font-plus-jakarta-sans text-base font-bold leading-[150%] tracking-[0.3px]",
                { "opacity-50 cursor-not-allowed": isButtonDisabled }
              )}
            >
              Continue
            </Button> */}
      </DialogContent>
    </Dialog>
  );
}
