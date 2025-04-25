"use client"

import { cn } from "@/views/utils/cn"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const style = tv({
  base: "block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold shadow-md shadow-slate-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed placeholder:font-normal focus:border-indigo-500",
})

type TInput = VariantProps<typeof style>

interface InputProps extends TInput, React.ComponentPropsWithRef<"input"> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input {...props} className={cn(style({ ...props }), className)} />
}

export default Input
