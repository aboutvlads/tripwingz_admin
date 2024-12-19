"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  price: z.string(),
  originalPrice: z.string(),
  departure: z.string(),
  stops: z.string(),
  date: z.string(),
  status: z.string(),
  vibes: z.array(z.string()).min(1, {
    message: "Please select at least one vibe.",
  }),
})

const vibes = [
  { id: "foodie", label: "Foodie" },
  { id: "rave", label: "Rave" },
  { id: "girlstrip", label: "Girl's Trip" },
  { id: "date", label: "Date" },
  { id: "cartrip", label: "Car Trip" },
  { id: "friends", label: "Friends" },
]

export function DealForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      price: "",
      originalPrice: "",
      departure: "",
      stops: "1 stop",
      date: "",
      status: "",
      vibes: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input placeholder="Paris, France 🇫🇷" {...field} />
              </FormControl>
              <FormDescription>
                Enter the destination with country name and flag emoji
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="€214" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Price</FormLabel>
                <FormControl>
                  <Input placeholder="€389" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure</FormLabel>
                <FormControl>
                  <Input placeholder="CDG, Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stops"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stops</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of stops" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="non-stop">Non-stop</SelectItem>
                    <SelectItem value="1 stop">1 stop</SelectItem>
                    <SelectItem value="2+ stops">2+ stops</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <Input placeholder="May-Jun" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOT">HOT</SelectItem>
                    <SelectItem value="NEW">NEW</SelectItem>
                    <SelectItem value="REGULAR">REGULAR</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="vibes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Vibes</FormLabel>
                <FormDescription>
                  Select the vibes that match this deal
                </FormDescription>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {vibes.map((vibe) => (
                  <FormField
                    key={vibe.id}
                    control={form.control}
                    name="vibes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={vibe.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(vibe.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, vibe.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== vibe.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {vibe.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Deal</Button>
      </form>
    </Form>
  )
}

