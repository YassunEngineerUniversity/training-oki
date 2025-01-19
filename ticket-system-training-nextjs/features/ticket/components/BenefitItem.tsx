'use client';

import DisableButton from '@/components/button/DisableButton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import BenefitConfirmModal from '@/features/ticket/components/BenefitConfirmModal';
import { Benefit } from '@/types/benefit/types';
import { useState } from 'react';

interface BenefitItemProps {
  benefit: Benefit;
}

const BenefitItem = ({ benefit }: BenefitItemProps) => {
  const [benefitState, setBenefitState] = useState<Benefit>(benefit);

  // 特典の状態の消し込み
  const handleUpdateBebefitsUsage = () => {
    const now = new Date().toISOString();
    setBenefitState((prev) => ({
      ...prev,
      used_time: now,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="text-lg font-bold">{benefitState.name}</h4>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-7">{benefitState.details}</p>
      </CardContent>
      <CardFooter>
        {benefitState.used_time ? (
          <div className="flex justify-center m-auto">
            <DisableButton
              buttonText={'受け取り済み'}
              className={
                'text-white rounded-full bg-gray-600 border border-gray-bg-gray-600 '
              }
            />
          </div>
        ) : (
          <BenefitConfirmModal
            updateUsageState={handleUpdateBebefitsUsage}
            benefit={benefitState}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default BenefitItem;
