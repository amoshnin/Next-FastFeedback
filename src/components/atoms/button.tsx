// PLUGINS IMPORTS //
import { Button, ButtonProps } from '@chakra-ui/react'
import { FC } from 'react'

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType extends ButtonProps {
  onClick?: () => void
}

const ButtonComponent: FC<PropsType> = (props) => {
  return (
    <Button
      backgroundColor="gray.900"
      onClick={props.onClick}
      borderRadius={6}
      color="white"
      fontWeight="medium"
      _hover={{ bg: 'gray.700' }}
      _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default ButtonComponent
