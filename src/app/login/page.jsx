import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/app/login/user-auth-form"
import { BsCalendar2Date } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import config from '../../config/config'
export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  
  return (
    <>

<div className={cn(
          "container relative h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0",
          "md:grid sm:flex"
        )}
      >
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className={cn("relative h-full flex-col bg-muted p-10 text-white dark:border-r",
            "sm:flex lg:flex md:hidden"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-yellow-500 via-purple-500 to-blue-500 
          dark:bg-gradient-to-r dark:from-blue-700 dark:via-indigo-700 dark:to-pink-500 ">
            <div className="fixed left-0 bottom-0 p-4">
              <ModeToggle />
            </div>

            <div className=" inset-0 flex justify-center items-center flex-col h-screen">
              <h1 className="mb-4 text-center text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight dark:text-white">
                Meeting <mark className="px-2 text-white bg-red-600 rounded dark:bg-red-600 ">Brilliance</mark> 
              </h1>
              <h2 className="text-center text-white font-bold text-lg sm:text-xl lg:text-2xl tracking-tight dark:text-white">
                Google Meet Recording and AI-Powered Notes
              </h2>
            </div>
          </div>

          <div className="relative z-20 flex items-center text-lg font-medium">

            <BsCalendar2Date className=" h-[2.5rem] w-[2.5rem] mx-4" />
            <span className="text-3xl">GCal</span>

          </div>

          <div className="relative z-20 mt-auto">

          </div>



        </div>
        <div className={cn(
          "p-8",
          "sm:w-full md:w-full sm:px-2 lg:p-8"
          )}>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}