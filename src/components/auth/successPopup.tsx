import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image";

export default function SucessPopup({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void}) {
  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="bg-background/80 px-24 py-14">
              <AlertDialogHeader className="flex flex-col gap-5">
                  <AlertDialogTitle className="flex justify-center items-center">
                      <Image priority src={'/images/success-image.png'} alt="success-image" width={265} height={140} />
                  </AlertDialogTitle>
                  <AlertDialogTitle className="text-center font-plus-jakarta-sans text-base md:text-2xl font-bold leading-[130%]">
                      Successfully Logged in
                  </AlertDialogTitle>
              </AlertDialogHeader>
          </AlertDialogContent>
      </AlertDialog>
  )
}
