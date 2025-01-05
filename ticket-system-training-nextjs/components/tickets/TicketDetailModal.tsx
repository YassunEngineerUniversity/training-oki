import { SlidingButton } from "@/components/tickets/SlidingButton"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

const TicketDetailModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-center m-auto">
          <Button className="text-white rounded-full px-10 h-[42px] bg-[#1eb98c] border border-[#1eb98c] hover:opacity-70 hover:bg-[#1eb98c]">チケットを表示</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            <div className="">
              <h3 className="text-center">電子チケット</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-[560px] w-full bg-[#66efc8] bg-opacity-20 m-auto py-10 px-10 rounded-sm">
          <div className="max-w-[375px] w-full m-auto">
            <div className="">
              <h4 className="text-xl font-bold">公演名</h4>
              <div>
                <span className="text-[#6b7280]">日程｜</span>
                <span className="text-xl font-bold">2025.01.01</span>
              </div>
              <div>
                <span className="text-[#6b7280]">会場｜</span>
                <span className="font-bold">東京ドーム</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="block mb-2 text-center font-bold text-lg">ユーザネーム</span>
              <span className="block mb-1 text-center font-bold text-lg text-[#6b7280]">席名</span>
              <span className="block text-center font-bold text-lg">席番号</span>
            </div>
            <div className="mt-10">
              <p className="text-lg text-center font-bold text-red-500 mb-4">入場するときにスタッフを見せてください。<br/>スタッフが消し込みを行います。</p>
              <div className="flex justify-center">
                <SlidingButton/>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TicketDetailModal