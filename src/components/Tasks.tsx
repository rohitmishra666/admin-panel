'use client'
import React, { useState } from 'react'
import { ListFilter, Edit, Trash, TicketCheckIcon, Linkedin, CheckCheckIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
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
import { v4 as uuidv4 } from 'uuid'
import { tasks as taskData } from '../../public/data'

function Tasks() {
    const [tasks, setTasks] = useState(taskData)
    const [newTask, setNewTask] = useState('')
    const [newDate, setNewDate] = useState('')
    const [filter, setFilter] = useState('All')
    const [editTaskId, setEditTaskId] = useState(null)

    const addTask = () => {
        if (newTask && newDate) {
            if (editTaskId) {
                setTasks(tasks.map(task => task.id === editTaskId ? { ...task, task: newTask, date: newDate } : task))
                setEditTaskId(null)
            } else {
                const newTaskObj = { id: uuidv4(), task: newTask, date: newDate, status: false }
                setTasks([...tasks, newTaskObj])
                taskData.push(newTaskObj)
            }
            setNewTask('')
            setNewDate('')
        }
    }
    const deleteTask = (id: String) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const toggleStatus = (id: String) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: !task.status } : task))
    }

    const startEditTask = (task: any) => {
        setEditTaskId(task.id)
        setNewTask(task.task)
        setNewDate(task.date)
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true
        if (filter === 'Completed') return task.status === true
        if (filter === 'Pending') return task.status === false
        return true
    })

    return (
        <>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle>Tasks</CardTitle>
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
                                <DropdownMenuCheckboxItem checked={filter === 'Completed'} onCheckedChange={() => setFilter('Completed')}>
                                    Completed
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={filter === 'Pending'} onCheckedChange={() => setFilter('Pending')}>
                                    Pending
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <div className="flex flex-row  flex-wrap gap-2">
                        <input
                            type="text"
                            placeholder="New Task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                        />
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded text-gray-800 bg-gray-300"
                        />
                    </div>
                    <Button onClick={addTask} className=" bg-gray-300 w-auto">{editTaskId ? 'Update Task' : 'Add Task'}</Button>
                    {filteredTasks.map((task) => (
                        <div className="flex items-center justify-between gap-4" key={task.id}>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {task.task}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.date}
                                </p>
                            </div>
                            <div className='flex gap-2'>
                            <Button variant="outline" size="sm" onClick={() => toggleStatus(task.id)} className="h-12 w-12">
                                {task.status ? <CheckCheckIcon className='text-green-300' /> : <X className='text-red-500' />}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => startEditTask(task)} className="h-12 w-12">
                                <Edit className="h-7 w-7" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)} className="h-12 w-12">
                                <Trash className="h-7 w-7" />
                            </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default Tasks
