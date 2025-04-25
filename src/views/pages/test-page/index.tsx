import Button from "@/views/components/ui/button"
import Card from "@/views/components/ui/card"
import FileInput from "@/views/components/ui/file-input"
import Input from "@/views/components/ui/input"
import Textarea from "@/views/components/ui/textarea"
import React from "react"

const TestPage = () => {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter your name" />
      <Card>
        <h1>Hello</h1>
      </Card>
      <FileInput placeholder="Choose a file" />
      <Textarea placeholder="Enter your message" />
    </div>
  )
}

export default TestPage
