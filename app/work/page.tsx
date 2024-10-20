import Sectiontitle from "@/components/global/Sectiontitle";
import "./page.css";

function page() {
  return (
    <>
      <div className="flex justify-center pb-5 ps-5">
        <img
          src={"/images/work2.png"}
          style={{ height: "115px" }}
          className="pt-3"
        />
      </div>
      <div>
        <Sectiontitle text="Seaforestation (Trailer)" />
      </div>
      <div className="video-container flex justify-center position-relative p-[50px]">
        <iframe
          className="frame"
          src="https://player.vimeo.com/video/814128392?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          width="900vw"
          height="510vh"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          title="Seaforestation Trailer"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
      {/* <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/814128392?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Seaforestation Trailer"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */}
    </>
  );
}

export default page;
