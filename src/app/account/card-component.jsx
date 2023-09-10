import { ChevronDownIcon } from "@radix-ui/react-icons"
import {GrAdd} from "react-icons/gr"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as React from "react"
import config from '../../config/config'
export function PermissionCard() {
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = React.useState(false)
    // Set Calendar_status = 1
  
    const handleGoogleCalendarSignin = async () => {
      setIsLoading(true)
      await handleSupabaseStatus()
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        scopes:[...config.GOOGLE_SCOPES],
        options:{
          redirectTo: `${config.HOST_URI}/auth/callback`
        }
  
    })
    console.log(data)
    if(error){console.log(error); 
      //TODO: Show Alert
      setIsLoading(false)}
    }
    const handleGoogleDriveSignin = async () => {
      setIsLoading(true)
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        scopes:[
          "https://www.googleapis.com/auth/drive.readonly",
          "https://www.googleapis.com/auth/drive.metadata.readonly",
          "https://www.googleapis.com/auth/drive.file",

        ],
        options:{
          redirectTo: `${config.HOST_URI}/auth/callback`
        }
  
    })
    if(error){console.log(error); 
      //TODO: Show Alert
      setIsLoading(false)}
    }
    const handleSupabaseStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const {error} = await supabase.from('profiles')
      .update({calendar_status: 1})
      .eq('id', session.user.id)
    }
  return (
    <Card className="p-2 my-3  bg-green-600">
      <CardHeader>
        <CardTitle>Account Permissions</CardTitle>
        <CardDescription>
          Provide following permissions to see your calendar events and recordings from Google Drive.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className='bg-transparent'>
              <AvatarFallback><Icons.google_calendar className="m-2" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Google Calendar</p>
              <p className="text-sm text-muted-foreground">To Access upcoming calendar events</p>
            </div>
          </div>
          <Button variant="outline" className="ml-auto" onClick={handleGoogleCalendarSignin}>
                Connect
                <Icons.plus className="ml-2 h-6 w-6 text-muted-foreground" />
              </Button>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback aspect="square"><Icons.google_drive className="m-1" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Google Drive</p>
              <p className="text-sm text-muted-foreground">To access old meet recordings</p>
            </div>
          </div>
          <Button variant="outline" className="ml-auto" onClick={handleGoogleDriveSignin}>
                Connect
                <Icons.plus className="ml-2 h-6 w-6 text-white-foreground" />
              </Button>
          
        </div>
      </CardContent>
    </Card>
  )
}
