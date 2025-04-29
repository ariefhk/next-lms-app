"use client"

import { deleteCourseSectionLesson } from "@/servers/actions/course/delete-course-section-lesson.action"
import React, { useActionState } from "react"
import Button from "../../ui/button"
import Input from "../../ui/input"
import Message from "../../ui/message"

interface DeleteCourseSectionLessonProps {
  courseSectionLessonId: string
}

const DeleteCourseSectionLesson: React.FC<DeleteCourseSectionLessonProps> = ({
  courseSectionLessonId,
}) => {
  const [state, formAction, isPending] = useActionState(
    deleteCourseSectionLesson,
    null,
  )

  return (
    <form action={formAction}>
      <Input
        name="courseSectionLessonId"
        type="hidden"
        value={courseSectionLessonId}
        required
      />
      <Button
        type="submit"
        size="sm"
        variant="danger"
        className="w-fit"
        disabled={isPending}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      <Message type="error" message={state?.message} />
    </form>
  )
}

export default DeleteCourseSectionLesson
