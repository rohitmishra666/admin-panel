'use client'
import React, { useState } from 'react'
import { ListFilter, Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { userData as initialUserData } from "../../public/data"
import { v4 as uuidv4 } from 'uuid'

function UsersTable() {
    const [users, setUsers] = useState(initialUserData)
    const [newUser, setNewUser] = useState({ name: '', email: '', gender: '', status: true, date: '', amount: 0 })
    const [editUserId, setEditUserId] = useState(null)
    const [filter, setFilter] = useState('All')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const addUser = () => {
        if (newUser.name && newUser.email && newUser.date) {
            if (editUserId) {
                setUsers(users.map(user => user.id === editUserId ? { ...user, ...newUser } : user))
                setEditUserId(null)
            } else {
                const newUserObj = { ...newUser, id: uuidv4() }
                setUsers([...users, newUserObj])
            }
            setNewUser({ name: '', email: '', gender: '', status: true, date: '', amount: 0 })
            setIsDialogOpen(false)
        }
    }

    const deleteUser = (id: any) => {
        setUsers(users.filter(user => user.id !== id))
    }

    const startEditUser = (user: any) => {
        setEditUserId(user.id)
        setNewUser({ ...user })
        setIsDialogOpen(true)
    }

    const filteredUsers = users.filter(user => {
        if (filter === 'All') return true
        if (filter === 'Active') return user.status === true
        if (filter === 'Inactive') return user.status === false
        return true
    })

    return (
        <>
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                            A list of all users in the system
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex flex-items gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-auto gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked={filter === 'All'} onCheckedChange={() => setFilter('All')}>
                                    All
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={filter === 'Active'} onCheckedChange={() => setFilter('Active')}>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={filter === 'Inactive'} onCheckedChange={() => setFilter('Inactive')}>
                                    Inactive
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={() => setIsDialogOpen(true)} className="h-8 w-auto gap-1 text-sm bg-gray-300">
                            Add User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden xl:table-cell">Gender</TableHead>
                                <TableHead className="hidden xl:table-cell">Status</TableHead>
                                <TableHead className="hidden xl:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount Spend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">{user.email}</div>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">{user.gender}</TableCell>
                                    <TableCell className="hidden xl:table-cell">
                                        <Badge className={`text-xs ${user.status ? "bg-green-600" : "bg-red-600"}`} variant="outline">
                                            {user.status ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-cell">
                                        {new Date(user.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">{user.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => startEditUser(user)} className="h-11 w-11 mr-2">
                                            <Edit className="h-7 w-7" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => deleteUser(user.id)} className="h-11 w-11">
                                            <Trash className="h-7 w-7" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                    <DialogContent className='bg-gray-600/25'>
                        <DialogHeader>
                            <DialogTitle className='text-white'>{editUserId ? 'Edit User' : 'Add User'}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="p-2 border border-gray-300 rounded text-gray-600 bg-gray-300"
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value={newUser.gender}
                                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                                className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                            />
                            <input
                                type="date"
                                value={newUser.date}
                                onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
                                className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                            />
                            <input
                                type="number"
                                placeholder="Amount Spend"
                                value={newUser.amount}
                                onChange={(e) => setNewUser({ ...newUser, amount: parseFloat(e.target.value) })}
                                className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => {
                                setIsDialogOpen(false)
                                setNewUser({ name: '', email: '', gender: '', status: true, date: '', amount: 0 })
                            }}>Cancel</Button>
                            <Button onClick={addUser} className="bg-gray-300">{editUserId ? 'Update User' : 'Add User'}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default UsersTable
