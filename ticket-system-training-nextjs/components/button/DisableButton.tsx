import { Button } from '@/components/ui/button';

interface DisableButtonProps {
  buttonText: string;
  className?: string;
}

const DisableButton = ({ buttonText, className }: DisableButtonProps) => {
  return (
    <Button disabled className={className}>
      {buttonText}
    </Button>
  );
};

export default DisableButton;
