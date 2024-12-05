import {
  Calendar,
  ChartNoAxesCombined,
  ImagesIcon,
  Inbox,
  Rss,
  Settings,
  Undo2,
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

export const PAGE_SIZE = 6;

export const PAGE_SIZE_POST = 4;

export const RATINGS = [5, 4, 3, 2, 1];

export const ADMIN_LINKS = [
  { title: "Back to Website", url: "/", icon: Undo2 },
  { title: "Overview", url: "/overview", icon: ChartNoAxesCombined },
  { title: "Products", url: "/products", icon: Inbox },
  { title: "Orders", url: "/orders", icon: Calendar },
  { title: "Users", url: "/users", icon: Users },
  { title: "Blog", url: "/blog", icon: Rss },
  { title: "Gallery", url: "/portfolio", icon: ImagesIcon },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const NAV_LINKS = [
  { label: "Головна", src: "/", icon: IoHomeOutline },
  { label: "Послуги", src: "/services", icon: GrServices },
  { label: "Технологія", src: "/technology", icon: MdBiotech },
  { label: "Каталог", src: "/catalog", icon: CiShoppingTag },
  { label: "Галерея", src: "/gallery", icon: SlPicture },
  { label: "Новини", src: "/news", icon: ImNewspaper },
  { label: "Контакти", src: "/contact", icon: MdOutlineContactPhone },
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
