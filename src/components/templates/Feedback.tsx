// PLUGINS IMPORTS //
import { FC } from 'react'
import { IFeedback } from 'ts/types.type'
import { Box } from '@chakra-ui/react'

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  feedback: IFeedback
}

const Feedback: FC<PropsType> = ({ feedback }) => {
  return <Box></Box>
}

export default Feedback
