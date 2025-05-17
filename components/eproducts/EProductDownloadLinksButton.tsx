import { grabVideoDownloadLinks } from '@/utils/actions'
import React from 'react'
import EProductDownloadLinksDropdown from './EProductDownloadLinksDropdown';

async function EProductDownloadLinksButton({orderId}:{orderId:string}) {
  const downloadLinks = await grabVideoDownloadLinks(orderId)
  console.log(downloadLinks);

    return (
    <div>
      {downloadLinks?.length > 0 && (
        <EProductDownloadLinksDropdown downloadLinks={downloadLinks}/>
      )}
    </div>
  )
}

export default EProductDownloadLinksButton
