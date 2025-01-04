import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const TicketEventCard = () => {
  return (
    <Card>
      <CardHeader>
        <Image src="/noimage.png" alt="" width={510} height={310}/>
      </CardHeader>
      <CardContent className="mb-4">
        <h3 className="text-lg font-bold">公演名</h3>
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex gap-8 items-start mb-4">
            <span className="font-bold">日程</span>
            <div>
              <span className="font-bold block mb-1">2025.01.01（水）</span>
              <div className="flex gap-1 items-center">
                <span className="text-[#6b7280] text-sm font-semibold">開場:16:00</span>
                <span className="text-[#6b7280] text-sm font-semibold">開演:18:00</span>
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <span className="font-bold">会場</span>
            <div>
              <span className="font-bold block mb-1">会場名</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TicketEventCard