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
   <NavigationMenu className="" viewport={false}>
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
            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
)
}
// NavigationMenu
// NavigationMenuList
// NavigationMenuItem
// NavigationMenuLink
// add to page.js