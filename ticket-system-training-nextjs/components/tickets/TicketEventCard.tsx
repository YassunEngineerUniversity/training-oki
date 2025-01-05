import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Event } from "@/types/event/types"
import { formatDate } from "@/utils/formatDate"
import { formatTime } from "@/utils/formatTime"
import Image from "next/image"

interface TicketEventCardProps {
  event: Event
}

const TicketEventCard = ({event}: TicketEventCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Image src="/noimage.png" alt="" width={510} height={310}/>
      </CardHeader>
      <CardContent className="mb-4">
        <h3 className="text-lg font-bold">{event.name}</h3>
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex gap-8 items-start mb-4">
            <span className="font-bold">日程</span>
            <div>
              <span className="font-bold block mb-1">{formatDate(event.date)}</span>
              <div className="flex gap-1 items-center">
                <span className="text-[#6b7280] text-sm font-semibold">開場:{formatTime(event.open_time)}</span>
                <span className="text-[#6b7280] text-sm font-semibold">開演:{formatTime(event.start_time)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <span className="font-bold">会場</span>
            <div>
              <span className="font-bold block mb-1">{event.venue}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketEventCard