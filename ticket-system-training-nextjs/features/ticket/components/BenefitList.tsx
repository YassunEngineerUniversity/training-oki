import BenefitItem from '@/features/ticket/components/BenefitItem';
import { Benefit } from '@/types/benefit/types';

interface BenefitListProps {
  benefits: Benefit[];
}

const BenefitList = ({ benefits }: BenefitListProps) => {
  return (
    <div className="mt-4 space-y-5">
      {benefits?.map((benefit) => (
        <BenefitItem benefit={benefit} key={benefit.id} />
      ))}
    </div>
  );
};

export default BenefitList;
