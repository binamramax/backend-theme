import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CreditCard, DollarSign, Users, Package } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        customer: "John Smith",
                        email: "john.smith@example.com",
                        product: "Premium Plan",
                        status: "Success",
                        amount: "$250.00",
                      },
                      {
                        customer: "Jane Cooper",
                        email: "jane.cooper@example.com",
                        product: "Basic Plan",
                        status: "Pending",
                        amount: "$125.00",
                      },
                      {
                        customer: "Olivia Martin",
                        email: "olivia.martin@example.com",
                        product: "Enterprise Plan",
                        status: "Success",
                        amount: "$450.00",
                      },
                      {
                        customer: "Jackson Lee",
                        email: "jackson.lee@example.com",
                        product: "Premium Plan",
                        status: "Failed",
                        amount: "$250.00",
                      },
                      {
                        customer: "Sofia Davis",
                        email: "sofia.davis@example.com",
                        product: "Basic Plan",
                        status: "Success",
                        amount: "$125.00",
                      },
                    ].map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{sale.customer}</div>
                          <div className="text-sm text-muted-foreground">{sale.email}</div>
                        </TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              sale.status === "Success"
                                ? "bg-green-900 text-green-300"
                                : sale.status === "Pending"
                                  ? "bg-yellow-900 text-yellow-300"
                                  : "bg-red-900 text-red-300",
                            )}
                          >
                            {sale.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{sale.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    {
                      icon: <ArrowUpIcon className="h-4 w-4 text-green-400" />,
                      title: "New subscription",
                      description: "John Smith subscribed to Premium Plan",
                      timestamp: "2 minutes ago",
                    },
                    {
                      icon: <ArrowRightIcon className="h-4 w-4 text-blue-400" />,
                      title: "Account updated",
                      description: "Jane Cooper updated her profile information",
                      timestamp: "45 minutes ago",
                    },
                    {
                      icon: <ArrowDownIcon className="h-4 w-4 text-red-400" />,
                      title: "Subscription canceled",
                      description: "Jackson Lee canceled their subscription",
                      timestamp: "3 hours ago",
                    },
                    {
                      icon: <ArrowUpIcon className="h-4 w-4 text-green-400" />,
                      title: "New subscription",
                      description: "Sofia Davis subscribed to Basic Plan",
                      timestamp: "5 hours ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800">
                        {activity.icon}
                      </div>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

