import { MapPinHouse, Clock4 } from 'lucide-react';

const TicketItem = () => {
  return (
    <div className="bg-white px-4 py-4 rounded-2xl cursor-pointer shadow-lg">
      <div className="mb-2">
        <h3 className="text-2xl font-bold">公演名</h3>
      </div>
      <div className="mb-1">
        <h4 className="text-xl font-bold">2025.01.01</h4>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <Clock4 width={20} className="text-[#6b7280]"/>
        <div className="flex gap-3 items-center">
          <span className="text-[#6b7280] text-sm font-semibold">開場:16:00</span>
          <span className="text-[#6b7280] text-sm font-semibold">開演:18:00</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MapPinHouse width={20} />
        <span className="text-base font-semibold">公演場所</span>
      </div>
    </div>
  )
}

export default TicketItem