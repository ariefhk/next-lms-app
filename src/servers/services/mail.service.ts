import { SendVerification } from "../models/mail.model"
import { resend } from "../utils/resend"
import { UserService } from "./user.service"

export const MailService = {
  async sendVerification(sendVerification: SendVerification) {
    const user = await UserService.findUser(sendVerification.userId)
    const email = user!.email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "Arief <contact@arief.dev>",
        to: [email],
        subject: "Verify your account of Next LMS",
        html: `
        <p>Click following link to verify your account</p>
        <a href="${baseUrl}/verify?user=${user.id}&code=${sendVerification.code}">Verify your account</a>
        `,
      })

      console.log(data, error)
    }
  },
}
