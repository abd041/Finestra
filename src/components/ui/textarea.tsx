import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "type-field flex field-sizing-content min-h-16 w-full rounded-[50px] border-0 bg-white px-5 py-[14px] text-[var(--paragraph)] transition-colors outline-none",
        "placeholder:text-[var(--paragraph)]/60",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-2 aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
