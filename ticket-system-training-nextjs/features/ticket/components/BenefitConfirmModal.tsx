
"use client"

import { Button } from "@/components/ui/button"
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

const BenefitConfirmModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center m-auto">
          <Button className=" text-white rounded-full bg-blue-500 border border-blue-500 hover:opacity-70 hover:bg-blue-500">特典を受け取る</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            <div className="">
              <h3 className="text-center">特典名を受け取りますか？</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-4 mt-4">
          <div>
            <DialogClose asChild>
              <Button type="button" className=" text-white rounded-full bg-gray-200 border border-gray-200 hover:opacity-70 hover:bg-gray-300">いいえ</Button>
            </DialogClose>
          </div>
          <div>
            <Button className=" text-white rounded-full bg-blue-500 border border-blue-500 hover:opacity-70 hover:bg-blue-500">はい</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BenefitConfirmModal