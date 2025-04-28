import { cn } from "@/views/utils/cn"
import React from "react"

type AppBrandProps = React.HTMLAttributes<HTMLDivElement>

const AppBrand = ({ className, ...props }: AppBrandProps) => {
  return (
    <div
      className={cn(
        "text-lg font-semibold tracking-tight text-black",
        className,
      )}
      {...props}>
      NextLms.
    </div>
  )
}

export default AppBrand
