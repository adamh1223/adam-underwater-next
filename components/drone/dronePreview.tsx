// "use client";

// import { useState, useRef, useEffect } from "react";
// import "./dronePreview.css";
// import { set } from "zod";
// import Link from "next/link";
// import { redirect } from "next/dist/server/api-utils";
// import { useRouter } from "next/navigation";

// function DronePreview({ extraClassName }: { extraClassName?: string }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [thumbnailSize, setThumbnailSize] = useState({ width: 0, height: 0 });
//   const imgRef = useRef<HTMLImageElement>(null);
//   const handleVideoLoad = () => {
//     setTimeout(() => {
//       setIsVideoReady(true); // Switch to video only when loaded
//     }, 3000);
//   };

//   useEffect(() => {
//     if (imgRef.current) {
//       setThumbnailSize({
//         width: imgRef.current.clientWidth,
//         height: imgRef.current.clientHeight,
//       });
//     }
//   }, [isHovered]);

//   const { thumbnail, videoLink } = droneVideo;
//   const [isVideoReady, setIsVideoReady] = useState(false);

//   useEffect(() => {
//     const iframe = document.querySelector("iframe");
//     if (iframe) {
//       iframe.addEventListener("load", handleVideoLoad);
//     }
//     return () => {
//       if (iframe) {
//         iframe.removeEventListener("load", handleVideoLoad);
//       }
//     };
//   }, [isHovered]);

//   const divStyles = isVideoReady
//     ? "relative w-full h-0 pb-[56.25%]"
//     : "h-0 w-0";
//   const iframeStyles = isVideoReady
//     ? {
//         width: "100%",
//         height: "94%",
//         position: "absolute", // Absolute positioning to fill the container
//         top: "0",
//         left: "0",
//         objectFit: "cover",
//         objectPosition: "center", // Centers the video within the iframe
//         pointerEvents: "none",
//         cursor: "pointer",
//       }
//     : {
//         height: "0px",
//         width: "0px",
//       };
//   console.log(iframeStyles);
//   let droneType: string;

//   if (isHovered) {
//     droneType = 'inspire'
//   } else{
//     droneType = 'fpv'
//   }

//   const router = useRouter();
//   return (
//     <div
//       className=""
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false);
//         setIsVideoReady(false);
//       }}
//     >
//       <>
//         {thumbnail && thumbnail.length > 0 && (
//           <img
//             ref={imgRef}
//             src={thumbnail}
//             alt="name"
//             sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//             className={`thumbnail-crop ${
//               isVideoReady ? "hidden" : ""
//             } cursor-pointer`}
//             onPointerDown={() => router.push(`/drone#${droneType}`)}
//           />
//         )}
//       </>
//       {isHovered && (
//         <div
//           className={divStyles}
//           onClick={() => router.push(`/drone#${droneType}`)}
//         >
//           {" "}
//           {/* Aspect ratio for 16:9 */}
//           <Link href={"/drone#inspire"} className="cursor-pointer">
//             <iframe
//               src={`https://player.vimeo.com/video/${videoLink}?autoplay=1&muted=1&background=1&badge=0&autopause=0`}
//               allow="autoplay; loop;"
//               // @ts-expect-error ignore for now
//               style={iframeStyles}
//               onLoad={() => console.log("The video is loaded")}
//               className={`droneVideo ${
//                 isVideoReady ? "visible" : "tinyVideo"
//               } cursor-pointer`}
//               onPointerDown={() => router.push(`/drone#${droneType}`)}
//             ></iframe>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DronePreview;
