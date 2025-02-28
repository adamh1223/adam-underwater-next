'use client'

import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import './EProductsDropdown.css'

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
          <p className="drop-subheader">{downloadLink.name}</p>
          <img src={downloadLink.thumbnail} />
          <div className="flex justify-center mt-3">
          <Button key={downloadLink.downloadLink} variant="ghost" onClick={() => handleDownloadClick(downloadLink.downloadLink)}>

          <a href={downloadLink.downloadLink}>Download</a>
        </Button>
          </div>
        </>)
        
        })}
      </HoverCardContent>
    </HoverCard>
      )
    }

export default EProductDownloadLinksDropdown