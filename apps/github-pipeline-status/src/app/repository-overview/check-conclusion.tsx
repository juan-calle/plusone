import { Check, Error, FindReplace } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

import type { CheckConclusionState, CheckSuite } from '@plusone/github-schema'

const CheckConclusionIconMap: Record<CheckConclusionState | 'RUNNING', JSX.Element> = {
  ACTION_REQUIRED: undefined,
  CANCELLED: undefined,
  FAILURE: (
    <Tooltip title={'Pipeline failed'}>
      <Error />
    </Tooltip>
  ),
  NEUTRAL: undefined,
  SKIPPED: undefined,
  STALE: undefined,
  STARTUP_FAILURE: undefined,
  SUCCESS: (
    <Tooltip title={'Pipeline succeeded'}>
      <Check />
    </Tooltip>
  ),
  TIMED_OUT: undefined,
  RUNNING: (
    <Tooltip title={'Pipeline running'}>
      <FindReplace />
    </Tooltip>
  ),
}

interface CheckConclusionProps {
  checkSuite?: CheckSuite
}

export function CheckConclusion({ checkSuite }: CheckConclusionProps) {
  if (!checkSuite) {
    return null
  }

  return (
    <IconButton
      href={checkSuite.resourcePath ? 'https://github.com' + checkSuite.resourcePath : undefined}
      target={'_blank'}
      rel={'noreferrer'}
      onClick={(e) => e.stopPropagation()}
      size={'large'}
    >
      {CheckConclusionIconMap[checkSuite.conclusion ?? 'RUNNING']}
    </IconButton>
  )
}
