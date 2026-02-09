import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[#10BB35] text-black hover:bg-[#17d640] focus-visible:outline-[#10BB35]",
  outline:
    "bg-transparent text-[#e9e9e9] hover:bg-[#111111] focus-visible:outline-[#10BB35]",
  ghost:
    "border-transparent bg-transparent text-[#e9e9e9] hover:bg-[#111111] focus-visible:outline-[#10BB35]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-4 text-sm",
  sm: "h-9 px-3 text-xs",
  lg: "h-12 px-6 text-sm",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap border border-[#222222] font-semibold uppercase tracking-[0.08em] transition-all duration-200",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#10BB35]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
