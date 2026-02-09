import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full border border-[#222222] bg-[#090909] px-3 py-2 text-sm text-[#f0f0f0] outline-none",
          "placeholder:text-[#6f6f6f] focus-visible:border-[#10BB35]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
