import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spaceButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-95 hover:scale-105 duration-300",
  {
    variants: {
      variant: {
        primary: "space-button-primary",
        secondary: "space-button-secondary", 
        accent: "space-button-accent",
        cosmic: "bg-nebula text-primary-foreground shadow-lg hover:shadow-xl",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground border border-border/50",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface SpaceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof spaceButtonVariants> {
  asChild?: boolean;
}

const SpaceButton = React.forwardRef<HTMLButtonElement, SpaceButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(spaceButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {variant !== "ghost" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
        )}
      </Comp>
    );
  }
);
SpaceButton.displayName = "SpaceButton";

export { SpaceButton, spaceButtonVariants };