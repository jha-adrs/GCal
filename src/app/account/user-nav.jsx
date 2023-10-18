"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
 
  export function UserNav({name, email, avatar}) {
    const router = useRouter();
    const handleLogout = async () => {
        router.push("/auth/signout");

     }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={avatar} alt={`@${name}`} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name||"Aadarsh Jha"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email||"ajha@example.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  