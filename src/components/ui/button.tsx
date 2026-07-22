import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/** Bluewake button system: 50px pills, 14px 30px pad, .35s invert hovers */
const buttonVariants = cva(
  "group/button type-button inline-flex shrink-0 items-center justify-center gap-2 border bg-clip-padding whitespace-nowrap transition-all duration-[350ms] ease-in-out outline-none select-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 rounded-[50px]",
  {
    variants: {
      variant: {
        default:
          "border-black bg-black text-white hover:bg-transparent hover:text-black",
        outline:
          "border-black bg-transparent text-black hover:bg-black hover:text-white",
        secondary:
          "border-white bg-white text-black hover:bg-transparent hover:text-white",
        ghost:
          "border-transparent bg-transparent text-black hover:bg-[var(--light-gray)]",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "rounded-none border-transparent text-black underline-offset-4 hover:text-[var(--accent-blue)] hover:underline",
        hero:
          "border-white bg-white text-black hover:bg-transparent hover:text-white",
        soft:
          "border-white bg-transparent text-white hover:bg-white hover:text-black",
      },
      size: {
        default: "px-[30px] py-[14px] h-auto",
        xs: "gap-1 px-3 py-1.5 type-small",
        sm: "px-5 py-2.5 h-auto",
        lg: "px-[30px] py-[14px] h-auto",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
