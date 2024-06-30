import { Box, Popover, Typography } from '@mui/material'
import { FeedbackPopoverProps } from 'types'

const FeedbackPopover = ({
  anchorEl,
  open,
  handlePopoverClose,
  currentFeedback
}: FeedbackPopoverProps) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={handlePopoverClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
  >
    <Box className="max-h-[22rem] max-w-[40rem] rounded-lg px-4 py-2">
      <Typography variant="body2">Rating: {currentFeedback?.rating}</Typography>
      {currentFeedback?.comment && (
        <>
          <Typography variant="body2">
            Comment: {currentFeedback.comment}
          </Typography>
        </>
      )}
    </Box>
  </Popover>
)

export default FeedbackPopover
