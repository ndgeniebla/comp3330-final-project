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

export default function MyNavBar() {
   return (
   <div className="flex justify-center bg-zinc-50 sticky top-0 font-sans dark:bg-black">
   <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href="/projects">Projects</NavigationMenuLink>
        </NavigationMenuItem>
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
            <NavigationMenuLink href="/auth/login">Login</NavigationMenuLink>
        </NavigationMenuItem>
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