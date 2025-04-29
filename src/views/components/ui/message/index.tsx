import React from "react"

interface MessageProps {
  type: "success" | "error"
  message?: string
}

const Message = ({ type, message }: MessageProps) => {
  if (!message) {
    return null
  }

  return <div className={`msg msg-${type}`}>{message}</div>
}

export default Message
