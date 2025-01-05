import TicketDetailModal from "@/components/tickets/TicketDetailModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const TicketDetailCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm">
          <div className="mb-6">
            <span className="bg-[#1eb98c] py-1 px-2 text-sm text-white rounded-sm font-semibold">利用可能</span>
          </div>
          <h3 className="text-base font-bold">ユーザ名</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-end">
            <Button className="text-[#1eb98c] rounded-full bg-white border border-[#1eb98c] hover:bg-[#1eb98c] hover:text-white">チケットを渡す</Button>
          </div>
          <div className="mt-8">
            <span className="font-bold block text-base mb-2">エントランス名</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">席名</span>
            <span className="font-bold block text-base">席番号</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TicketDetailModal/>
      </CardFooter>
    </Card>
  )
}

export default TicketDetailCard