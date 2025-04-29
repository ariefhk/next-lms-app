"use client"

import { createCourseSection } from "@/servers/actions/course/create-course-section.action"
import React, { useActionState } from "react"
import Button from "../../ui/button"
import Input from "../../ui/input"
import Message from "../../ui/message"

interface CreateCourseSectionProps {
  courseId: string
}

const CreateCourseSection: React.FC<CreateCourseSectionProps> = ({
  courseId,
}) => {
  const [state, formAction, isPending] = useActionState(
    createCourseSection,
    null,
  )

  return (
    <form action={formAction}>
      <Input name="courseId" type="hidden" value={courseId} required />
      <Button type="submit" variant="secondary" size="sm" disabled={isPending}>
        {isPending ? "Creating..." : "Create Section"}
      </Button>
      <Message type="error" message={state?.message} />
    </form>
  )
}

export default CreateCourseSection
