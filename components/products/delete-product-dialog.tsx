"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  productName: string
}

export function DeleteProductDialog({ open, onOpenChange, onDelete, productName }: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      onDelete()
      setIsDeleting(false)
    }, 500)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the product <span className="font-medium">{productName}</span> and remove it
            from your catalog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

