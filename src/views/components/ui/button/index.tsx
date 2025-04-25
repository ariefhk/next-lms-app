import { cn } from "@/views/utils/cn"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const style = tv({
  base: "block w-full rounded-lg border font-semibold shadow-sm shadow-slate-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
  variants: {
    variant: {
      primary:
        "border-indigo-600 bg-indigo-600 text-indigo-50 hover:bg-indigo-500 active:bg-indigo-700 text-indigo-50",
      secondary:
        "border-slate-300 bg-white text-slate-600 hover:text-slate-700 active:bg-slate-50 active:text-slate-800",
      danger:
        "border-rose-500 bg-rose-500 hover:bg-rose-600 hover:bg-rose-700 active:text-rose-50",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-[15px]",
      lg: "px-5 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

type TButton = VariantProps<typeof style>

interface ButtonProps extends TButton, React.ComponentPropsWithRef<"button"> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(style({ ...props }), className)}>
      {children}
    </button>
  )
}

export default Button
