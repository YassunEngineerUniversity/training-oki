import { getTicketsMine } from "@/actions/ticket/getTicketsMine";
import { getTicketViewsMine } from "@/actions/ticketview/getTicketViewsMine";
import { getCurrentUser } from "@/actions/user/getCurrentUser";
import TabTickets from "@/components/tickets/TabTickets";
import TabTicketsContainer from "@/components/tickets/TabTicketsContainer";
import TicketVeiwList from "@/components/tickets/TicketVeiwList";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserInformation from "@/components/utils/UserInformation";
import { redirect } from "next/navigation";


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentUser = await getCurrentUser();
  let ticketVeiws = null
  const tab = (await searchParams).tab;
  let tabValue = '';

  if(!currentUser) {
    redirect("/login")
  }

  // パラメータによってタブ種類を変更
  switch (tab) {
    case "sending":
      tabValue = "sending";
      ticketVeiws = await getTicketViewsMine(tabValue);
      break;
    case "receive":
      tabValue = "receive";
      ticketVeiws = await getTicketViewsMine(tabValue);
      break;
    default:
      tabValue = "mine";
      ticketVeiws = await getTicketViewsMine("not_sending");
      break;
  }

  return (
    <div>
      <UserInformation user={currentUser}/>
      <Tabs defaultValue={tabValue}>
        <TabTicketsContainer>
          <TabTickets tab={tabValue}/>
        </TabTicketsContainer>
        <TabsContent value={"mine"} className="bg-[#f1f3f5] mt-0 min-h-[60vh]">
          <TicketVeiwList tabValue={tabValue} ticketViews={ticketVeiws}/>
        </TabsContent>
        <TabsContent value={"sending"} className="bg-[#f1f3f5] mt-0 min-h-[60vh]">
          <TicketVeiwList tabValue={tabValue} ticketViews={ticketVeiws}/>
        </TabsContent>
        <TabsContent value={"receive"} className="bg-[#f1f3f5] mt-0 min-h-[60vh]">
          <TicketVeiwList tabValue={tabValue} ticketViews={ticketVeiws}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HomePage