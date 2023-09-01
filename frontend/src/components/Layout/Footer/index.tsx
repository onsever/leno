import { Link } from "react-router-dom";
import RefundSvg from "../../../assets/refund.svg";
import SafePaymentSvg from "../../../assets/safe-payment.svg";
import SupportSvg from "../../../assets/support.svg";
import FacebookSvg from "../../../assets/facebook.svg";
import LinkedInSvg from "../../../assets/linkedin.svg";
import InstagramSvg from "../../../assets/instagram.svg";
import GooglePlaySvg from "../../../assets/google-play.svg";
import AppStoreSvg from "../../../assets/app-store.svg";
import VisaSvg from "../../../assets/visa.svg";
import MasterCardSvg from "../../../assets/mastercard.svg";
import { FiGlobe } from "react-icons/fi";
import { footerLinks, FooterLink, FooterPath } from "./footer-links.ts";

export default function Footer() {
  return (
    <footer className="flex flex-col">
      {/* Footer Information */}
      <section className="mx-auto w-[1120px] pb-14 pt-8">
        <section className="flex justify-around items-center">
          <div className="flex flex-col items-center space-y-3">
            <img src={RefundSvg} alt="Refund" />
            <h5>Refund policy</h5>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <img src={SafePaymentSvg} alt="Refund" />
            <h5>Safe payments</h5>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <img src={SupportSvg} alt="Refund" />
            <h5>24/7 support</h5>
          </div>
        </section>
      </section>
      {/* Social Media Icons */}
      <section className="bg-[#F8F9FA]">
        <section className="flex justify-between items-center py-6 mx-auto w-[1120px]">
          <div className="flex items-center justify-center space-x-3">
            <Link to={"/"}>
              <img src={FacebookSvg} alt="Facebook" />
            </Link>
            <Link to={"/"}>
              <img src={LinkedInSvg} alt="LinkedIn" />
            </Link>
            <Link to={"/"}>
              <img src={InstagramSvg} alt="Instagram" />
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Link to={"/"}>
              <img src={AppStoreSvg} alt="App Store" className="h-9" />
            </Link>
            <Link to={"/"}>
              <img src={GooglePlaySvg} alt="Google Play" className="h-9" />
            </Link>
          </div>
        </section>
      </section>
      {/* Footer Links */}
      <section className="flex items-start justify-between mx-auto w-[1120px] py-14 text-md">
        {footerLinks.map((footerLink: FooterLink, index: number) => (
          <div
            className="flex flex-col space-y-2"
            key={`${footerLink.title}-${index}`}
          >
            <h5 className="font-medium">{footerLink.title}</h5>
            {footerLink.links.map((path: FooterPath, index: number) => (
              <Link
                to={path.path}
                className="text-[#6E6E6E] hover:text-primary"
                key={`${path.link}-${index}`}
              >
                {path.link}
              </Link>
            ))}
          </div>
        ))}
      </section>
      {/* Footer Bottom */}
      <section className="flex items-center justify-between mx-auto w-[1120px] pb-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={VisaSvg} alt="Visa" />
            <img src={MasterCardSvg} alt="MasterCard" />
          </div>
        </div>
        <span className="text-[#6E6E6E] text-sm">
          &copy; 2023 Leno - All rights reserved
        </span>
        <div className="flex items-center space-x-3 hover:bg-gray-200 p-2 cursor-pointer">
          <label className="hover:bg-gray-200 cursor-pointer">
            <FiGlobe className="inline-block mr-1 text-[#6E6E6E] w-5 h-5" />
            <select className="h-7 text-md font-medium rounded-md outline-none hover:bg-gray-200 cursor-pointer">
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </label>
        </div>
      </section>
    </footer>
  );
}
