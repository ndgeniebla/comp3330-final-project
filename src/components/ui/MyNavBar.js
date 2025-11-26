import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { auth0 } from "@/lib/auth0"

export default async function MyNavBar() {
  const session = await auth0.getSession();
   return (
   <div className="flex justify-center bg-zinc-50 sticky top-0 font-sans dark:bg-black">
   <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
       {session ? 
        <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-zinc-50">Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink href="/projects">List</NavigationMenuLink>
                <NavigationMenuLink href="/projects/new">New</NavigationMenuLink>
            </NavigationMenuContent>
        </NavigationMenuItem>
        :
        <NavigationMenuItem>
            <NavigationMenuLink href="/projects">Projects</NavigationMenuLink>
        </NavigationMenuItem>}
       <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-zinc-50">Resume</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink href="/projects">PDF</NavigationMenuLink>
                <NavigationMenuLink href="/projects">LaTeX</NavigationMenuLink>
            </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href="/contact-me">Contact</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            {session ? <NavigationMenuLink href="/auth/logout">Logout</NavigationMenuLink> : <NavigationMenuLink href="/auth/login">Login</NavigationMenuLink>}
        </NavigationMenuItem>
        {session && 
        <NavigationMenuItem>
            <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        }
      </NavigationMenuList>
    </NavigationMenu>
  </div>
)
}
// NavigationMenu
// NavigationMenuList
// NavigationMenuItem
// NavigationMenuLink
// add to page.js