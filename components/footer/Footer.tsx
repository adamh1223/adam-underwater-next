import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaYoutubeSquare
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <hr className="w-[400px]" />
        </div>
        <div>
          <FaInstagram />
        </div>
        <div>
          <hr className="w-[400px]" />
        </div>
      </div>
    </>
  );
}

export default Footer;
