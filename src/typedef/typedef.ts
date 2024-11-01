import { SVGProps } from "react";

export type ElementCardType = {
    title?: string,
    thumbnail?: string,
    extraClasses?: string;
  icon?: string;
  onClick?: () => void;
}

export type DownloadCardType = {
  
  elementCardProps: ElementCardType;
  selectText: string;
  onClick?: () => void;
  buttonText: string;
}

export interface logoProps extends SVGProps<SVGSVGElement> {
  itemWidth?: string;
  itemHeight?: string;
}