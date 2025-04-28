"use client"

import { createCourseAction } from "@/servers/actions/course/create-course.action"
import Button from "@/views/components/ui/button"
import FileInput from "@/views/components/ui/file-input"
import Input from "@/views/components/ui/input"
import Textarea from "@/views/components/ui/textarea"
import Image from "next/image"
import { useActionState, useState } from "react"

const CreateCoursesPage = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(
    createCourseAction,
    null,
  )

  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]

    setPreview(URL.createObjectURL(file))
  }
  return (
    <main className="m-auto max-w-lg space-y-6">
      <section>
        <h3 className="font-semibold">Create new course</h3>
      </section>
      <section>
        <form action={formAction} className="space-y-2">
          {preview ? (
            <Image
              src={preview}
              alt="Course cover"
              width={800}
              height={300}
              className="rounded-lg"
            />
          ) : null}
          <FileInput
            name="coverImage"
            placeholder="Select the course cover image"
            onChange={handlePreviewImageChange}
          />
          <Input name="title" placeholder="Course title" />
          <Textarea name="description" placeholder="Course description" />
          <Input name="price" placeholder="Course price" type="number" />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Draft"}
          </Button>
          {state?.errors?.errorFields?.title ? (
            <div className="msg msg-error">
              {state.errors.errorFields.title}
            </div>
          ) : null}
          {state?.errors?.errorFields?.description ? (
            <div className="msg msg-error">
              {state.errors.errorFields.description}
            </div>
          ) : null}
          {state?.errors?.errorFields?.price ? (
            <div className="msg msg-error">
              {state.errors.errorFields.price}
            </div>
          ) : null}
          {state?.status === "success" ? (
            <div className="msg msg-success">{state.message}</div>
          ) : null}
          {state?.status === "error" ? (
            <div className="msg msg-error">{state.message}</div>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default CreateCoursesPage
