"use client"

import { deleteCourseSection } from "@/servers/actions/course/delete-course-section.action"
import React, { useActionState } from "react"
import Button from "../../ui/button"
import Input from "../../ui/input"
import Message from "../../ui/message"

interface DeleteCourseSectionProps {
  courseSectionId: string
}

const DeleteCourseSection: React.FC<DeleteCourseSectionProps> = ({
  courseSectionId,
}) => {
  const [state, formAction, isPending] = useActionState(
    deleteCourseSection,
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

export default DeleteCourseSection
