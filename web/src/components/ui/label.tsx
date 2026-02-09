import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.08em] text-[#c6c6c6]",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
