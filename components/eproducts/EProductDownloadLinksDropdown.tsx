'use client'

import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

interface DownloadLinks {
  downloadLink: string;
  name: string;
  thumbnail: string;
}

function EProductDownloadLinksDropdown({downloadLinks}:{downloadLinks:DownloadLinks[]}) {
const handleDownloadClick = (downloadLink: string) => {}
return (
  <HoverCard>
<HoverCardTrigger>
        <Button variant="link">
          Download Links
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-56">
        {downloadLinks.map(downloadLink => {
          return (<>
          <p>{downloadLink.name}</p>
          <img src={downloadLink.thumbnail} />
          <Button key={downloadLink.downloadLink} variant="ghost" onClick={() => handleDownloadClick(downloadLink.downloadLink)}>
            
          <a href={downloadLink.downloadLink}>Click to Download</a>
        </Button>
        </>)
        
        })}
      </HoverCardContent>
    </HoverCard>
      )
    }

export default EProductDownloadLinksDropdown