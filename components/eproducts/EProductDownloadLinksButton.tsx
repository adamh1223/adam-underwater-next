import { grabVideoDownloadLinks } from '@/utils/actions'
import React from 'react'
import { Button } from '../ui/button'

async function EProductDownloadLinksButton({orderId}:{orderId:string}) {
  const downloadLinks = await grabVideoDownloadLinks(orderId)
  return (
    <div>
      {downloadLinks?.length > 0 && <Button>Download</Button>}
    </div>
  )
}

export default EProductDownloadLinksButton
