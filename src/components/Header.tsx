'use client'
import { Bell, CircleUser, TowerControl } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as any);
function Header() {
  const [notifications, setNotifications] = useState([{
    title: '',
    message: '',
    from: ''
  }
  ]);

  const sendNotification = () => {
    const notificationData = {
      title: 'Admin Notification',
      message: 'This is a test notification from the admin dashboard',
      from: 'admin'
    };
    socket.emit('sendNotification', notificationData);
  };

  useEffect(() => {
    socket.on('receiveNotificationFromUser', (data) => {
      setNotifications((prev) => [data, ...prev]);
    })
  }, []);

  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-black bg-opacity-100 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <TowerControl className="h-6 w-6 text-white" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
      </nav>
      <div className="ml-auto flex gap-4 md:mr-0 md:gap-2 lg:gap-4">
        <Button
          variant="default"
          size="sm"
          onClick={sendNotification}
          className="md:hidden"
        >
          Send Notification
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              {notifications.length > 1 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs">
                  {notifications.length - 1}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {
              notifications.map((notification) => (
                <DropdownMenuItem key={uuidv4()}>
                  <DropdownMenuLabel>{notification.title}</DropdownMenuLabel>
                  <DropdownMenuLabel>{notification.message}</DropdownMenuLabel>
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden md:block ml-4">
        <Button
          variant="default"
          size="sm"
          onClick={sendNotification}
        >
          Send Notification
        </Button>
      </div>
    </header>
  )
}

export default Header
