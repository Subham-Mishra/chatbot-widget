import {
  Box,
  TextField,
  Rating,
  Modal,
  Typography,
  Button,
  Stack
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { endConversation, startConversation } from 'redux/slices/chatSlice'
import { saveConversation } from 'redux/thunks/chatThunks'
import { persistor } from 'redux/store'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FeedbackModalProps } from 'types'
import { nanoid } from 'nanoid'
import { theme } from 'constants/theme'

const FeedbackModal = ({
  modalOpen,
  setModalOpen,
  currentConversation,
  setCurrentConversation
}: FeedbackModalProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Handles the submission of feedback for the current conversation.
   *
   * This function performs the following steps:
   * 1. Validates that a star rating has been provided.
   * 2. Validates that a name for the conversation has been provided.
   * 3. Dispatches actions to end the current conversation and save it to the database.
   * 4. Persists the state changes.
   * 5. Navigates to the chat page of the current conversation.
   * 6. Starts a new conversation with a unique ID.
   * 7. Closes the feedback modal.
   *
   * @throws Will display an error toast if a star rating is not provided.
   * @throws Will display an error toast if a name for the conversation is not provided.
   */
  const handleFeedbackSubmit = () => {
    if (
      currentConversation.feedback?.rating === 0 ||
      !currentConversation.feedback?.rating
    ) {
      toast.error('Please provide a star rating.')
      return
    }
    if (currentConversation.name?.trim() === '') {
      toast.error('Please provide a name for the conversation.')
      return
    }
    if (currentConversation) {
      dispatch(endConversation(currentConversation))
      //@ts-expect-error -> TODO: Fix type error
      dispatch(saveConversation(currentConversation))
      persistor.persist()
      navigate(`/chat/${currentConversation.id}`)
    }
    const newConversationId = nanoid(6)
    dispatch(startConversation(newConversationId))
    persistor.persist()
    setModalOpen(false)
  }

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg">
        <Stack spacing={2} width={'26rem'}>
          <Typography
            variant="h6"
            color={theme.feedbackModalTitleColor}
            gutterBottom
          >
            Provide Feedback
          </Typography>
          <TextField
            label="Conversation Name"
            variant="outlined"
            fullWidth
            value={currentConversation.name}
            onChange={(e) =>
              setCurrentConversation({
                ...currentConversation,
                name: e.target.value
              })
            }
            className="mt-2"
          />
          <Rating
            value={currentConversation.feedback?.rating}
            onChange={(e, newValue) =>
              setCurrentConversation({
                ...currentConversation,
                feedback: {
                  ...currentConversation.feedback,
                  rating: newValue ?? 0
                }
              })
            }
            size="medium"
            className="my-4"
          />
          <TextField
            label="Feedback"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            value={currentConversation.feedback?.comment}
            onChange={(e) =>
              setCurrentConversation({
                ...currentConversation,
                feedback: {
                  rating: currentConversation.feedback?.rating ?? 0,
                  comment: e.target.value
                }
              })
            }
            className="mt-2"
          />
          <Box className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFeedbackSubmit}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}

export default FeedbackModal
