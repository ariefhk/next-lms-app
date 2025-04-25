import { cn } from "@/views/utils/cn"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const style = tv({
  base: "space-y-2 rounded-lg border border-slate-200 bg-white p-8 font-semibold shadow-sm shadow-slate-100",
})

type TCard = VariantProps<typeof style>

interface CardProps extends TCard, React.ComponentPropsWithRef<"div"> {}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return <div {...props} className={cn(style({ ...props }), className)} />
}

export default Card
