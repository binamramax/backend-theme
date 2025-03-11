"use client"

import { useState } from "react"
import { Search, Edit, Trash2, MoreHorizontal, Plus, Download, Filter, Package, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductDialog } from "./product-dialog"
import { DeleteProductDialog } from "./delete-product-dialog"

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    sku: "HDN-100",
    quantity: 45,
    tags: ["Electronics", "Audio"],
    images: ["/placeholder.svg?height=40&width=40"],
    description: "High-quality noise-cancelling headphones with premium sound quality and comfort.",
    shortDescription: "Premium noise-cancelling headphones",
    isActive: true,
    isPublished: true,
    price: "$299.99",
  },
  {
    id: "2",
    name: "Wireless Mouse",
    sku: "WMS-200",
    quantity: 120,
    tags: ["Electronics", "Computer Accessories"],
    images: ["/placeholder.svg?height=40&width=40"],
    description: "Ergonomic wireless mouse with long battery life and precision tracking.",
    shortDescription: "Ergonomic wireless mouse",
    isActive: true,
    isPublished: true,
    price: "$49.99",
  },
  {
    id: "3",
    name: "Smart Watch",
    sku: "SWT-300",
    quantity: 30,
    tags: ["Electronics", "Wearables"],
    images: ["/placeholder.svg?height=40&width=40"],
    description: "Feature-rich smartwatch with health tracking, notifications, and long battery life.",
    shortDescription: "Feature-rich smartwatch",
    isActive: true,
    isPublished: false,
    price: "$199.99",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    sku: "SPK-400",
    quantity: 75,
    tags: ["Electronics", "Audio"],
    images: ["/placeholder.svg?height=40&width=40"],
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    shortDescription: "Portable Bluetooth speaker",
    isActive: false,
    isPublished: false,
    price: "$79.99",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    sku: "KBD-500",
    quantity: 60,
    tags: ["Electronics", "Computer Accessories"],
    images: ["/placeholder.svg?height=40&width=40"],
    description: "Mechanical keyboard with customizable RGB lighting and tactile switches.",
    shortDescription: "RGB mechanical keyboard",
    isActive: true,
    isPublished: true,
    price: "$129.99",
  },
]

export function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof initialProducts)[0] | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleCreateProduct = (productData: any) => {
    const newProduct = {
      id: (products.length + 1).toString(),
      ...productData,
      price: "$0.00", // Default price for new products
    }
    setProducts([...products, newProduct])
    setIsCreateDialogOpen(false)
  }

  const handleEditProduct = (productData: any) => {
    if (!selectedProduct) return
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? { ...product, ...productData } : product,
    )
    setProducts(updatedProducts)
    setIsEditDialogOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = () => {
    if (!selectedProduct) return
    const updatedProducts = products.filter((product) => product.id !== selectedProduct.id)
    setProducts(updatedProducts)
    setIsDeleteDialogOpen(false)
    setSelectedProduct(null)
  }

  const openEditDialog = (product: (typeof initialProducts)[0]) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: (typeof initialProducts)[0]) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const toggleProductStatus = (productId: string, field: "isActive" | "isPublished") => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, [field]: !product[field] } : product,
    )
    setProducts(updatedProducts)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.isActive).length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.isPublished).length}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter((p) => p.quantity === 0).length}</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-900">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-zinc-900">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-zinc-800">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.shortDescription}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    <span className={product.quantity === 0 ? "text-red-400" : ""}>{product.quantity}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="px-1 py-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className={
                          product.isActive
                            ? "border-green-600 bg-green-900/20 text-green-400"
                            : "border-red-600 bg-red-900/20 text-red-400"
                        }
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          product.isPublished
                            ? "border-green-600 bg-green-900/20 text-green-400"
                            : "border-yellow-600 bg-yellow-900/20 text-yellow-400"
                        }
                      >
                        {product.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleProductStatus(product.id, "isActive")}>
                          {product.isActive ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleProductStatus(product.id, "isPublished")}>
                          {product.isPublished ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(product)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProduct}
        title="Add Product"
        description="Add a new product to your catalog."
        submitLabel="Create"
      />

      <ProductDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditProduct}
        title="Edit Product"
        description="Edit product details and settings."
        submitLabel="Save changes"
        defaultValues={selectedProduct || undefined}
      />

      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteProduct}
        productName={selectedProduct?.name || ""}
      />
    </div>
  )
}

