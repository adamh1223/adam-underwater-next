// Footer.jsx
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import "./Footer.css";
import Logo from "../navbar/Logo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoopingCarousel from "./FooterCarousel";

function Footer() {
  return (
    <>
      {/* Socials */}
      <div className="footer-container">
        <div className="flex items-center justify-center w-full my-8">
          <div className="flex-1 h-px bg-muted" />
          <span className="px-4 text-muted-foreground">
            <div className="social-icons">
              <Link
                href="https://www.instagram.com/adamunderwater/"
                target="_blank"
              >
                <FaInstagram className="social-icon" />
              </Link>
              <Link href="https://facebook.com" target="_blank">
                <FaFacebook className="social-icon" />
              </Link>
              <Link href="https://youtube.com" target="_blank">
                <FaYoutube className="social-icon" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/adam-hussain-2baa31178/"
                target="_blank"
              >
                <FaLinkedin className="social-icon" />
              </Link>
            </div>
          </span>
          <div className="flex-1 h-px bg-muted" />
        </div>
      </div>
      {/* Carousel */}
      <LoopingCarousel />
      {/* Bottom Tabs */}
      <div className="flex justify-evenly w-full pb-[100px] text-muted-foreground">
        <div className="help">
          <div className="footer-title">Help</div>
        </div>
        <div className="policies">
          <div className="footer-title">Policies</div>
        </div>
        <div>hi</div>
        <div>hi</div>
      </div>

      {/* Very Bottom */}
      <div className="flex justify-center ms-[-5px] mb-3">
        <Logo />
      </div>
      <div className="flex justify-center my-5 text-muted-foreground">
        <p>Copyright 2024 Adam Underwater, All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;
