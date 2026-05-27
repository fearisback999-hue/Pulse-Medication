import * as React from "react"

import { cn } from "@/lib/utils"

const ShadcnCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
ShadcnCard.displayName = "ShadcnCard"

const ShadcnCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
ShadcnCardHeader.displayName = "ShadcnCardHeader"

const ShadcnCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
ShadcnCardTitle.displayName = "ShadcnCardTitle"

const ShadcnCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
ShadcnCardContent.displayName = "ShadcnCardContent"

export {
  ShadcnCard as Card,
  ShadcnCardHeader as CardHeader,
  ShadcnCardTitle as CardTitle,
  ShadcnCardContent as CardContent,
}
