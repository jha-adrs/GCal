"use client"
import { FaGoogle } from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import config from "../../config/config"
import * as React from "react"

export function UserAuthForm({ className, ...props }) {
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = React.useState(false)
    const handleGoogleSignin = async () => {
      setIsLoading(true)
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        
        options:{
          scopes:config.GOOGLE_SCOPES,
          redirectTo: `${config.HOST_URI}/auth/callback`
        }
  
    })
    if(error){console.log(error); 
      //TODO: Show Alert

      setIsLoading(false)}

    }
    
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    supabase.auth.signInWithOtp({
      email: event.currentTarget.email.value,
      options:{
        redirectTo: `${config.HOST_URI}/auth/callback`
      }
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action="" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">
              Email
            </Label>
            <Input id="email"
            placeholder="xyz@example.com"
            type="email"
            required
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            />
          </div>
          <Button variant="gradientred" disabled={isLoading} >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in with Magic Link
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="gradientredoutline" type="button" disabled={isLoading} onClick={handleGoogleSignin}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>

    </div>
  )
}