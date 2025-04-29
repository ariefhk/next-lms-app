"use client"

import { createCourseSectionLesson } from "@/servers/actions/course/create-course-section-lesson.action"
import React, { useActionState } from "react"
import Button from "../../ui/button"
import Input from "../../ui/input"
import Message from "../../ui/message"

interface CreateCourseSectionLessonProps {
  courseSectionId: string
}

const CreateCourseSectionLesson: React.FC<CreateCourseSectionLessonProps> = ({
  courseSectionId,
}) => {
  const [state, formAction, isPending] = useActionState(
    createCourseSectionLesson,
    null,
  )

  return (
    <form action={formAction}>
      <Input
        name="courseSectionId"
        type="hidden"
        value={courseSectionId}
        required
      />
      <Button type="submit" size="sm" className="w-fit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Lesson"}
      </Button>
      <Message type="error" message={state?.message} />
    </form>
  )
}

export default CreateCourseSectionLesson
