// Footer.jsx
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import "./Footer.css";
import Logo from "../navbar/Logo";

function Footer() {
  return (
    <>
      {/* Socials */}
      <div className="footer-container">
        <div className="flex items-center justify-center w-full my-8">
          <div className="flex-1 h-px bg-muted" />
          <span className="px-4 text-muted-foreground">
            <div className="social-icons">
              <Link href="https://instagram.com" target="_blank">
                <FaInstagram className="social-icon" />
              </Link>
              <Link href="https://facebook.com" target="_blank">
                <FaFacebook className="social-icon" />
              </Link>
              <Link href="https://youtube.com" target="_blank">
                <FaYoutube className="social-icon" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <FaLinkedin className="social-icon" />
              </Link>
            </div>
          </span>
          <div className="flex-1 h-px bg-muted" />
        </div>
      </div>
      {/* Bottom Tabs */}
      <div className="flex justify-evenly w-full pb-[100px]">
        <div>Policies</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
      {/* Very Bottom */}
      <div className="flex justify-center ms-[-15px]">
        <Logo />
      </div>
    </>
  );
}

export default Footer;
