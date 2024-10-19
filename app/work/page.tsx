import Sectiontitle from "@/components/global/Sectiontitle";
import React from "react";

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
    </>
  );
}

export default page;
