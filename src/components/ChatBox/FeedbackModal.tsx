import {
  Box,
  TextField,
  Rating,
  Modal,
  Typography,
  Button
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { endConversation, startConversation } from '../../redux/chatSlice'
import { persistor } from '../../redux/store'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FeedbackModalProps } from 'types'
import { nanoid } from 'nanoid'

const FeedbackModal = ({
  modalOpen,
  setModalOpen,
  currentConversation,
  setCurrentConversation
}: FeedbackModalProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg">
        <Typography variant="h6" gutterBottom>
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
          size="large"
          className="mt-2"
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
      </Box>
    </Modal>
  )
}

export default FeedbackModal
