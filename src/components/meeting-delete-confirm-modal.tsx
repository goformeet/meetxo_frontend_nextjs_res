"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {useForm} from "react-hook-form";

export default function MeetingDeleteConfirmModal(){
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Create a form instance with react-hook-form
    const form = useForm({
        defaultValues: {
            reason: ""
        }
    });

    const handleConfirmDelete = () => {
        // Get the reason from the form
        const reason = form.getValues().reason;

        setDeleteLoading(true);

        // Simulate API call
        setTimeout(() => {
            setDeleteLoading(false);
            setDeleteModalOpen(false);
            form.reset();
            // Here you would typically call your API to delete the meeting
            console.log("Session cancelled with reason:", reason);
        }, 2000);
    }

    return (
        <>
            <Button
                onClick={()=>setDeleteModalOpen(true)}
                variant="outline"
                className="text-[#F2583E] hover:text-[#F2583E] w-full md:w-fit text-sm text-center font-semibold px-4 py-2 border-[#F2583E]"
            >
                Cancel Meeting
            </Button>

            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="mb-2">Cancel Session</DialogTitle>
                        <DialogDescription className="text-foreground font-medium">
                            Provide reason to cancel the meeting
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem className="bg-muted">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Reason"
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                    <DialogFooter className="sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteModalOpen(false)}
                            disabled={deleteLoading}
                            className="border-primary text-primary hover:text-primary"
                        >
                            Go back
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            disabled={deleteLoading}
                            variant="outline"
                            className="text-[#F2583E] hover:text-[#F2583E] text-sm text-center font-semibold px-4 py-2 border-[#F2583E]"
                        >
                            {deleteLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Cancelling...
                                </>
                            ) : (
                                "Confirm Cancellation"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}