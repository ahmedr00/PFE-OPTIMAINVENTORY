import React from "react";
import { cn } from "../components/utils";

const Switch = React.forwardRef(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    // Handle the toggle logic internally
    const handleToggle = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
          checked ? "bg-emerald-600" : "bg-slate-300",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {/* The "Thumb" (the circle that moves) */}
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-1",
          )}
        />

        {/* Hidden checkbox for accessibility */}
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => {}}
          disabled={disabled}
        />
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
