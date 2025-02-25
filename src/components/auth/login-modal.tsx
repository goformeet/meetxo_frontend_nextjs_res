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
  loading:boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  step: "phone" | "otp" | "details";
  phone: string;
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
  loading
}: ChildProps) {
  const renderForm = (step: string) => {
    switch (step) {
      case "phone":
        return <PhoneForm loading={loading}  handleSubmit={handlePhoneSubmit} />;
      case "otp":
        return <OtpForm loading={loading} handleSubmit={handleOtpSubmit} />;
      case "details":
        return <DetailsForm handleSubmit={handleDetailsSubmit} />;
      default:
        return <PhoneForm loading={loading}  handleSubmit={handlePhoneSubmit} />;
    }
  };
   const maskPhoneNumber = (phone: string): string => {
     if (phone.length < 3) return phone;

     return phone[0] + phone[1] + phone[2] + "****" + phone.slice(-3);
   };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)} >
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
      </DialogContent>
    </Dialog>
  );
}
