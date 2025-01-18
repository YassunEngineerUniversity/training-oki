import { Button } from '@/components/ui/button'
import React from 'react'

interface DisableButtonProps {
  buttonText:string
  className?: string
}

const DisableButton = ({buttonText, className}: DisableButtonProps) => {
  return (
    <Button disabled className={className}>
      {buttonText}
    </Button>
  )
}

export default DisableButton