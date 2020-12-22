// PLUGINS IMPORTS //
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'

// COMPONENTS IMPORTS //
import { Feedback } from 'components/templates'

// EXTRA IMPORTS //
import { getAllFeedback, getAllSites } from 'lib/db-admin'
import { createFeedback } from 'lib/db-client'
import { useAuth } from 'lib/auth'

import { FeedbackStatus } from 'ts/types.type'
import { IFeedback } from 'ts/types.type'

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  initialFeedback: Array<IFeedback>
}

const SiteFeedbackPage: FC<PropsType> = (props) => {
  const [localState, setLocalState] = useState([])
  const router = useRouter()
  const { user } = useAuth()
  const { siteId } = router.query as any
  const inputRef = useRef(null)
  const toast = useToast()

  const onSubmit = async (e) => {
    const text = inputRef.current.value
    e.preventDefault()
    if (text && text.length > 0) {
      const newFeedback: IFeedback = {
        author: user.name,
        authorId: user.uid,
        siteId,
        text,
        createdAt: new Date().toISOString(),
        provider: user.provider,
        status: FeedbackStatus[FeedbackStatus.PENDING],
        rating: 0,
      }
      inputRef.current.value = ''
      await createFeedback(newFeedback).then(() => {
        setLocalState((prev) => [...prev, newFeedback])
        toast({
          title: 'Success!',
          description: 'Your comment succesfully added',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
    } else {
      toast({
        title: 'Error occured!',
        description: 'Make sure your comment is valid',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      width={'full'}
      maxWidth="700px"
      margin={'0 auto'}
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel>Comment</FormLabel>
          <Input type="comment" ref={inputRef} />
          <Button type={'submit'} mt={4} fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {[...localState, ...props.initialFeedback].map((el) => (
        <Feedback key={el.id} feedback={el} />
      ))}
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { siteId } = ctx.params
  const { data, error } = await getAllFeedback(siteId as string)

  if (data) {
    return { props: { initialFeedback: data }, revalidate: 1 }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites(true)
  if (sites) {
    const paths = sites.map((site) => ({
      params: { siteId: site.id.toString() },
    }))

    return {
      paths,
      fallback: false,
    }
  }
}

export default SiteFeedbackPage
