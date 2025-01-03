import { getCurrentUser } from "@/actions/user/getCurrentUser";
import { redirect } from "next/navigation";



const HomePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    redirect("/login")
  }

  return (
    <h1>Home</h1>
  )
}

export default HomePage