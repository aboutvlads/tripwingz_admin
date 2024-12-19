import { useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditDealDialog } from "./edit-deal-dialog"

interface Deal {
  id: string
  destination: string
  imageUrl: string
  price: string
  originalPrice: string
  travelDate: string
  stops: string
  from: string
  class: string
  airline: string
  departureTime: string
  arrivalTime: string
  duration: string
  baggage: string
  hotDeal: boolean
  hashtags: string
  addedAt: Date
}

interface DealsTableProps {
  deals: Deal[]
  onDeleteDeal: (id: string) => void
  onEditDeal: (id: string, data: Partial<Deal>) => void
}

export function DealsTable({ deals, onDeleteDeal, onEditDeal }: DealsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dealToDelete, setDealToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [dealToEdit, setDealToEdit] = useState<Deal | null>(null)

  const handleDelete = (id: string) => {
    setDealToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (dealToDelete) {
      onDeleteDeal(dealToDelete)
      setDeleteDialogOpen(false)
      setDealToDelete(null)
    }
  }

  const handleEdit = (deal: Deal) => {
    setDealToEdit(deal)
    setEditDialogOpen(true)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)

    if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.destination}</TableCell>
                <TableCell>{deal.price}</TableCell>
                <TableCell>{deal.airline}</TableCell>
                <TableCell>{deal.travelDate}</TableCell>
                <TableCell>
                  {deal.hotDeal && (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      HOT
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatTimeAgo(deal.addedAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(deal)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(deal.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this deal?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the deal from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {dealToEdit && (
        <EditDealDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          deal={dealToEdit}
          onSave={(id, data) => {
            onEditDeal(id, data)
            setEditDialogOpen(false)
            setDealToEdit(null)
          }}
        />
      )}
    </>
  )
}

