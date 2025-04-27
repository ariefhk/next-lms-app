import { googleSosialLoginAction } from "@/servers/actions/auth/google-sosial-login.action"
import Button from "../../ui/button"
import GoogleIcon from "../../ui/icons/google-icon"

const GoogleSocialLogin = () => {
  return (
    <form action={googleSosialLoginAction}>
      <Button
        variant="secondary"
        type="submit"
        className="flex justify-center gap-2">
        Continue with Google
        <GoogleIcon />
      </Button>
    </form>
  )
}

export default GoogleSocialLogin
