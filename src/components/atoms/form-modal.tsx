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
  ModalCloseButton,
} from '@chakra-ui/react'
import { useFormik, FormikHelpers, FormikValues } from 'formik'
import * as yup from 'yup'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { capitalize, convertArrayToObject } from 'utils/string.utils'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  title: string
  fields: Array<{ title: string; placeholder: string; validation?: any }>
  returnData?: (
    data: { [key: string]: string },
    actions: FormikHelpers<FormikValues>
  ) => void

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

const FormModal: FC<PropsType> = (props) => {
  const initialRef = useRef()
  const { config, fields } = props
  const { isOpen, onClose } = config

  const fieldsObject = convertArrayToObject(fields, 'title', undefined)
  const validationObject = convertArrayToObject(fields, 'title', 'validation')
  const ValidationSchema = yup.object().shape(validationObject)

  const { handleSubmit, errors, values, handleChange, touched } = useFormik({
    initialValues: fieldsObject,
    validationSchema: ValidationSchema,
    onSubmit: (values, actions) => props.returnData(values, actions),
  })

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          {fields.map((item, index) => (
            <FormControl key={item.title} mt={index > 0 && 4}>
              <FormLabel>{capitalize(item.title)}</FormLabel>
              <Input
                ref={initialRef}
                name={item.title}
                placeholder={item.placeholder}
                value={values[item.title]}
                onChange={handleChange}
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
          <Button onClick={onClose}>{props.buttons.cancel || 'Cancel'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FormModal
