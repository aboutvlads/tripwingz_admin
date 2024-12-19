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

interface EditDealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deal: z.infer<typeof formSchema> & { id: string }
  onSave: (id: string, data: z.infer<typeof formSchema>) => void
}

export function EditDealDialog({ open, onOpenChange, deal, onSave }: EditDealDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: deal.destination,
      imageUrl: deal.imageUrl,
      price: deal.price,
      originalPrice: deal.originalPrice,
      travelDate: deal.travelDate,
      stops: deal.stops,
      from: deal.from,
      class: deal.class,
      airline: deal.airline,
      departureTime: deal.departureTime,
      arrivalTime: deal.arrivalTime,
      duration: deal.duration,
      baggage: deal.baggage,
      hotDeal: deal.hotDeal,
      hashtags: deal.hashtags,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(deal.id, values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain unchanged */}
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

