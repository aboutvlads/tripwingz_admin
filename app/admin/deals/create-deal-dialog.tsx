"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  destination: z.string().min(2),
  imageUrl: z.string().url(),
  price: z.string(),
  originalPrice: z.string(),
  travelDate: z.string(),
  stops: z.string(),
  from: z.string(),
  class: z.string(),
  airline: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  duration: z.string(),
  baggage: z.string(),
  hotDeal: z.boolean(),
  hashtags: z.string(),
})

interface CreateDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateDeal: (deal: z.infer<typeof formSchema>) => void
}

export function CreateDealDialog({ open, onOpenChange, onCreateDeal }: CreateDealDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotDeal: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateDeal(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields remain unchanged */}
            <Button type="submit" className="w-full">Create Deal</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

