// PLUGINS IMPORTS //
import { useRef, FC } from 'react'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { Formik, Form, useFormik } from 'formik'
import * as yup from 'yup'

// COMPONENTS IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  title: string
  content: {
    fields: Array<{ title: string; placeholder: string }>
    validation?: any
  }
  returnData?: (data) => void

  config: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
  buttons?: {
    save?: string
    cancel?: string
  }
}

const ModalOrganism: FC<PropsType> = (props) => {
  const initialRef = useRef()
  const { config, content } = props
  const { isOpen, onOpen, onClose } = config

  const fields = content.fields.reduce(
    (acc, cur) => ({ ...acc, [cur.title]: '' }),
    {}
  )

  const ValidationSchema = yup.object().shape(content.validation)

  const {
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    touched
  } = useFormik({
    initialValues: fields,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log(values, 'injje')
    }
  })

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            {content.fields.map((item, index) => (
              <FormControl mt={index > 0 && 4}>
                <FormLabel>{item.title}</FormLabel>
                <Input
                  ref={initialRef}
                  name={item.title}
                  placeholder={item.placeholder}
                  value={values[item.title]}
                  onChange={handleChange}
                  onBlur={handleBlur[item.title]}
                />
                {errors[item.title] && touched[item.title] && (
                  <div>{errors[item.title]}</div>
                )}
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit as any}>
              {props.buttons.save || 'Save'}
            </Button>
            <Button onClick={onClose}>
              {props.buttons.cancel || 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalOrganism
