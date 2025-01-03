import { getCurrentUser } from "@/actions/user/getCurrentUser";
import TabTickets from "@/components/tickets/TabTickets";
import TabTicketsContainer from "@/components/tickets/TabTicketsContainer";
import TicketsList from "@/components/tickets/TicketsList";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserInformation from "@/components/utils/UserInformation";
import { redirect } from "next/navigation";



const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentUser = await getCurrentUser();
  const tab = (await searchParams).tab;
  let tabValue = '';

  if(!currentUser) {
    redirect("/login")
  }

  // パラメータによってタブ種類を変更
  switch (tab) {
    case "tranfer":
      tabValue = "tranfer";
      break;
    default:
      tabValue = "mine";
      break;
  }

  return (
    <div>
      <UserInformation/>
      <Tabs defaultValue={tabValue}>
        <TabTicketsContainer>
          <TabTickets />
        </TabTicketsContainer>
        <TabsContent value={"mine"} className="bg-[#f1f3f5] mt-0 min-h-[60vh]">
          <TicketsList/>
        </TabsContent>
        <TabsContent value={"transfer"} className="bg-[#f1f3f5] mt-0 min-h-[60vh]">
          <TicketsList/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HomePage