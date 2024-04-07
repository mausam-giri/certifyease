import React from "react";
import { IconType } from "react-icons";
import {
  MdChevronRight,
  MdSave,
  MdEdit,
  MdImage,
  MdOutlineSquare,
  MdLink,
  MdOutlineQrCodeScanner,
  MdFormatItalic,
  MdFormatBold,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
} from "react-icons/md";
import { PiIdentificationBadge } from "react-icons/pi";
import { HiMiniEyeDropper } from "react-icons/hi2";
import { FiType } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoBanOutline } from "react-icons/io5";

interface CustomIconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}
const StrokeIcon: IconType = (props: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <line
        x2="24"
        y1="50%"
        y2="50%"
        stroke="currentColor"
        strokeWidth="2"
      ></line>
    </svg>
  );
};

const Dash2Icon: IconType = (props: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <line
        x1="-1"
        x2="25"
        y1="50%"
        y2="50%"
        stroke="currentColor"
        strokeDasharray="12 2"
        strokeWidth="2"
      ></line>
    </svg>
  );
};

const Dash3Icon: IconType = (props: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <line
        x1="1"
        x2="23"
        y1="50%"
        y2="50%"
        stroke="currentColor"
        strokeDasharray="6 2"
        strokeWidth="2"
      ></line>
    </svg>
  );
};

const DashSmallIcon: IconType = (props: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <line
        x1="1"
        x2="23"
        y1="50%"
        y2="50%"
        stroke="currentColor"
        strokeDasharray="2 2"
        strokeWidth="2"
      ></line>
    </svg>
  );
};

export {
  MdSave as SaveIcon,
  MdChevronRight as RightIcon,
  MdEdit as EditIcon,
  MdOutlineSquare as SquareIcon,
  MdImage as ImageIcon,
  MdLink as LinkIcon,
  MdFormatBold as BoldIcon,
  MdFormatItalic as ItalicIcon,
  MdFormatUnderlined as UnderlinedIcon,
  MdFormatStrikethrough as StrikeThroughIcon,
  MdOutlineQrCodeScanner as QrCodeIcon,
  PiIdentificationBadge as IdentificationIcon,
  FiType as TextIcon,
  FaRegCircle as CircleIcon,
  HiMiniEyeDropper as DropperIcon,
  FiMinus as MinusIcon,
  FiPlus as PlusIcon,
  MdFormatAlignLeft as LeftAlignIcon,
  MdFormatAlignRight as RightAlignIcon,
  MdFormatAlignCenter as CenterAlignIcon,
  MdFormatAlignJustify as JustifyAlignIcon,
  IoBanOutline as NoOutlineIcon,
  StrokeIcon,
  Dash2Icon,
  Dash3Icon,
  DashSmallIcon,
};
