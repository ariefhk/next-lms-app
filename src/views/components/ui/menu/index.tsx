import React from "react"

export interface MenuProps {
  label: string
  href: string
}

const Menu = (props: MenuProps) => {
  return (
    <div className="px-3 py-1.5 text-[15px] rounded-lg  hover:bg-indigo-600 hover:text-white active:bg-indigo-400 gap-2 items-center flex font-semibold text-slate-700 cursor-pointer transition-all duration-200">
      {props.label}
    </div>
  )
}

export default Menu
