import { cn } from "@/views/utils/cn"
import React, { SVGProps } from "react"

type DragIconProps = SVGProps<SVGSVGElement>

const DragIcon: React.FC<DragIconProps> = ({ className, ...props }) => {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="#000000"
      fill="none">
      <path
        d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DragIcon
