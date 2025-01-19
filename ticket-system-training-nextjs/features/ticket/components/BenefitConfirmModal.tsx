'use client';

import { updateBenefitUsage } from '@/actions/benefit/updateBenefitUsage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Benefit } from '@/types/benefit/types';
import updateUsage from '@/utils/updateUsage';

interface BenefitConfirmModalProps {
  benefit: Benefit;
  updateUsageState: () => void;
}

const BenefitConfirmModal = ({
  benefit,
  updateUsageState,
}: BenefitConfirmModalProps) => {
  const handleUpdateUsage = updateBenefitUsage.bind(
    null,
    benefit.id.toString(),
  );
  const handleUsage = async () => {
    await updateUsage(handleUpdateUsage, updateUsageState);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center m-auto">
          <Button className=" text-white rounded-full bg-blue-500 border border-blue-500 hover:opacity-70 hover:bg-blue-500">
            特典を受け取る
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="">
              <h3 className="text-center">{benefit.name}を受け取りますか？</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={handleUsage} className="flex justify-center gap-4 mt-4">
          <div>
            <DialogClose asChild>
              <Button
                type="button"
                className=" text-white rounded-full bg-gray-300 border border-gray-300 hover:opacity-70 hover:bg-gray-300"
              >
                いいえ
              </Button>
            </DialogClose>
          </div>
          <div>
            <Button
              type="submit"
              className=" text-white rounded-full bg-blue-500 border border-blue-500 hover:opacity-70 hover:bg-blue-500"
            >
              はい
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BenefitConfirmModal;
