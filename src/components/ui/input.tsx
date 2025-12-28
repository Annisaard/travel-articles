"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  name: string;
}
function Input({ label, className, type, error, name, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative">
        <input
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "!border-[#BE4848] focus:ring-0 focus:ring-transparent",
            className,
          )}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-800"
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 text-red-500">
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}

export { Input };
