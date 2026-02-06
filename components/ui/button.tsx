import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-transparent hover:bg-secondary/40",
  ghost: "bg-transparent hover:bg-secondary/40"
};

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4",
  lg: "h-12 px-6 text-lg"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
