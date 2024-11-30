import {
  Calendar,
  ChartNoAxesCombined,
  Home,
  Inbox,
  Settings,
  Users,
} from "lucide-react";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinFill,
} from "react-icons/ri";
import { SlPicture } from "react-icons/sl";
import { GrServices } from "react-icons/gr";
import { ImNewspaper } from "react-icons/im";
import { CiShoppingTag } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";
import { MdBiotech, MdOutlineContactPhone } from "react-icons/md";

export const PAGE_SIZE = 12;

export const RATINGS = [5, 4, 3, 2, 1];

export const NAV_LINKS = [
  { label: "Home", src: "/", icon: IoHomeOutline },
  { label: "Services", src: "/services", icon: GrServices },
  { label: "Technology", src: "/technology", icon: MdBiotech },
  { label: "Catalog", src: "/catalog", icon: CiShoppingTag },
  { label: "Gallery", src: "/gallery", icon: SlPicture },
  { label: "News", src: "/news", icon: ImNewspaper },
  { label: "Contact", src: "/contact", icon: MdOutlineContactPhone },
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com",
    name: "Instagram",
    icon: RiInstagramLine,
  },
  {
    href: "https://www.facebook.com",
    name: "Facebook",
    icon: RiFacebookLine,
  },
  {
    href: "https://www.linkedin.com/",
    name: "Linkedin",
    icon: RiLinkedinFill,
  },
  {
    href: "https://telegram.org/",
    name: "Telegram",
    icon: LiaTelegramPlane,
  },
];
