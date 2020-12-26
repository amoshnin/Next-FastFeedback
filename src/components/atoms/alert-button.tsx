// PLUGINS IMPORTS //
import { useRef, useState, FC } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onAccept?: () => void
  modal: {
    title: string
    text: string
    acceptButtonText: string
    cancelButtonText: string
  }
}

const AlertButton: FC<PropsType> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  return (
    <>
      <Button colorssssScheme="red" onClick={() => setIsOpen(true)}>
        {props.children}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.modal.title}
            </AlertDialogHeader>

            <AlertDialogBody>{props.modal.text}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {props.modal.cancelButtonText}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose()
                  props.onAccept && props.onAccept()
                }}
                ml={3}
              >
                {props.modal.acceptButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AlertButton
