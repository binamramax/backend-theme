"use client"

import { useState } from "react"
import { Search, Edit, Trash2, MoreHorizontal, UserPlus, Download, Filter, Users } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserDialog } from "./user-dialog"
import { DeleteUserDialog } from "./delete-user-dialog"

// Sample user data
const initialUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "3 days ago",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2 weeks ago",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "5 hours ago",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Viewer",
    status: "Pending",
    lastActive: "Never",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof initialUsers)[0] | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateUser = (userData: any) => {
    const newUser = {
      id: (users.length + 1).toString(),
      ...userData,
      lastActive: "Just now",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    }
    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (userData: any) => {
    if (!selectedUser) return
    const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, ...userData } : user))
    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
    setUsers(updatedUsers)
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const openEditDialog = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "Admin").length}</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">+1 since last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
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
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-900">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-zinc-900">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "Active"
                          ? "border-green-600 bg-green-900/20 text-green-400"
                          : user.status === "Inactive"
                            ? "border-red-600 bg-red-900/20 text-red-400"
                            : "border-yellow-600 bg-yellow-900/20 text-yellow-400"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
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
                        <DropdownMenuItem onClick={() => openEditDialog(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(user)}
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

      <UserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateUser}
        title="Add User"
        description="Add a new user to the system."
        submitLabel="Create"
      />

      <UserDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditUser}
        title="Edit User"
        description="Edit user details and permissions."
        submitLabel="Save changes"
        defaultValues={selectedUser || undefined}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteUser}
        userName={selectedUser?.name || ""}
      />
    </div>
  )
}

