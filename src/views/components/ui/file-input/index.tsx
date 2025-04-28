"use client"

import React, { useRef, useState } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const style = tv({
  slots: {
    base: "flex w-full items-center  gap-2  overflow-hidden rounded-lg border border-slate-200 bg-white font-medium placeholder:font-normal focus:border-indigo-500",
    button:
      "border-r border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-700 active:bg-slate-50 active:text-slate-800",
  },
})

type TFileInput = VariantProps<typeof style>

interface FileInputProps
  extends TFileInput,
    React.ComponentPropsWithRef<"input"> {}

const FileInput: React.FC<FileInputProps> = (props) => {
  const [files, setFiles] = useState<FileList | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={style.slots.base}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.click()
        }}
        className={style.slots.button}>
        Choose file
      </button>
      <input
        {...props}
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => {
          setFiles(e.target.files)
          props.onChange?.(e)
        }}
      />
      {files ? (
        <div>You choose {files?.length} file</div>
      ) : (
        <div>{props?.placeholder}</div>
      )}
    </div>
  )
}

export default FileInput
