"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { X, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sku: z.string().min(2, {
    message: "SKU must be at least 2 characters.",
  }),
  quantity: z.coerce.number().min(0, {
    message: "Quantity must be a positive number.",
  }),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  shortDescription: z
    .string()
    .max(200, {
      message: "Short description must be less than 200 characters.",
    })
    .optional(),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
})

type ProductFormValues = z.infer<typeof productFormSchema>

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ProductFormValues) => void
  title: string
  description: string
  submitLabel: string
  defaultValues?: ProductFormValues
}

export function ProductDialog({
  open,
  onOpenChange,
  onSubmit,
  title,
  description,
  submitLabel,
  defaultValues = {
    name: "",
    sku: "",
    quantity: 0,
    tags: [],
    images: [],
    description: "",
    shortDescription: "",
    isActive: true,
    isPublished: false,
  },
}: ProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [imageInput, setImageInput] = useState("")

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  function handleSubmit(values: ProductFormValues) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      onSubmit(values)
      setIsSubmitting(false)
      form.reset()
    }, 500)
  }

  const addTag = () => {
    if (tagInput.trim() !== "") {
      const currentTags = form.getValues("tags") || []
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || []
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    )
  }

  const addImage = () => {
    if (imageInput.trim() !== "") {
      const currentImages = form.getValues("images") || []
      if (!currentImages.includes(imageInput.trim())) {
        form.setValue("images", [...currentImages, imageInput.trim()])
      }
      setImageInput("")
    }
  }

  const removeImage = (image: string) => {
    const currentImages = form.getValues("images") || []
    form.setValue(
      "images",
      currentImages.filter((img) => img !== image),
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU-12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-2 py-1 text-sm">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 p-0"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <FormDescription>Press Enter or click Add to add a tag</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                    {field.value?.map((image) => (
                      <div key={image} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Product"
                          className="h-24 w-full object-cover rounded-md border border-zinc-800"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=96&width=96"
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Image URL"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addImage()
                        }
                      }}
                    />
                    <Button type="button" size="sm" onClick={addImage}>
                      <Upload className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <FormDescription>Enter image URL and press Enter or click Add</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the product" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Maximum 200 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed description of the product" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>Product will be available in store</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>Product will be visible to customers</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

