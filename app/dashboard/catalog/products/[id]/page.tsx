import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// This would normally fetch from an API
const getProduct = (id: string) => {
  // Sample product data
  const products = [
    {
      id: "1",
      name: "Premium Headphones",
      sku: "HDN-100",
      quantity: 45,
      tags: ["Electronics", "Audio"],
      images: ["/placeholder.svg?height=200&width=200"],
      description: "High-quality noise-cancelling headphones with premium sound quality and comfort.",
      shortDescription: "Premium noise-cancelling headphones",
      isActive: true,
      isPublished: true,
      price: "$299.99",
    },
    // More products would be here
  ]

  return products.find((p) => p.id === id)
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/catalog/products">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to products</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-zinc-800">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border border-zinc-800">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p>{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p>{product.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p>{product.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${product.isActive ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"}`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${product.isPublished ? "bg-green-900/20 text-green-400" : "bg-yellow-900/20 text-yellow-400"}`}
                  >
                    {product.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-zinc-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
            <p>{product.description}</p>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <Link href={`/dashboard/catalog/products/${product.id}/edit`}>Edit Product</Link>
            </Button>
            <Button variant="outline">Delete Product</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

