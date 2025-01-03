import { getCurrentUser } from "@/actions/user/getCurrentUser";
import UserInformation from "@/components/utils/UserInformation";
import { redirect } from "next/navigation";



const HomePage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    redirect("/login")
  }

  return (
    <div>
      <UserInformation/>
    </div>
  )
}

export default HomePage