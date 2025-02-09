
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function NavMain({
  items
}) {
  console.log(items)
  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Home</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible Collapsible
            key = { item.title }
            asChild
            defaultOpen = { item.isActive }
            className = "group/collapsible" >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <Link to={item?.url}>{item.title}</Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url}>
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
          </Collapsible>
        ))}
    </SidebarMenu>
    </SidebarGroup >)
  );
}
