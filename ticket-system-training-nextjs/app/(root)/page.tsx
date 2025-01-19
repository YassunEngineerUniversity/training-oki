import { getTicketViewsMine } from "@/utils/getTicketViewsMine";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserInformation from "@/components/utils/UserInformation";
import Tab from "@/features/ticket-view/components/Tab";
import TabContainer from "@/features/ticket-view/components/TabContainer";
import TicketVeiwList from "@/features/ticket-view/components/TicketViewList";
import { redirect } from "next/navigation";


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentUser = await getCurrentUser();
  let ticketVeiws = null
  const tab = (await searchParams).tab;
  let tabValue = "";

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
      ticketVeiws = await getTicketViewsMine();
      break;
  }

  return (
    <div>
      <UserInformation user={currentUser}/>
      <Tabs defaultValue={tabValue}>
        <TabContainer>
          <Tab tab={tabValue}/>
        </TabContainer>
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