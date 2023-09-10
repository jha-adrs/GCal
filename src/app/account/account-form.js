'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PermissionCard } from './card-component'
import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"
import { UserNav } from './user-nav'
import { EventsTable } from './events_table'
export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}
export default function AccountForm({ data, calendar_status }) {
  const router = useRouter();
  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/examples/forms",
    },
    {
      title: "Account",
      href: "/examples/forms/account",
    },
    {
      title: "Appearance",
      href: "/examples/forms/appearance",
    },
    {
      title: "Notifications",
      href: "/examples/forms/notifications",
    },
    {
      title: "Display",
      href: "/examples/forms/display",
    },
  ]
  return (
    <div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your events for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1 lg:max-w-2xl">
            {calendar_status === 0 ? <PermissionCard /> : null}
            <div className="fixed left-0 bottom-0 p-4">
              <ModeToggle />
            </div>
            

            <EventsTable data={data}/>
            <Button variant="success" onClick={() => router.push('/account')}>Refresh Data</Button>

            <div>
              <form action="/auth/signout" method="post">
                <Button variant='default'>
                  Sign out
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>



    </div>
  );
}


