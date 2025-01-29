import { SVGProps } from 'react';

export type ElementCardType = {
  title?: string;
  thumbnail?: string | null;
  extraClasses?: string;
  icon?: string;
  onClick?: () => void;
  url: string;
};

export interface logoProps extends SVGProps<SVGSVGElement> {
  itemWidth?: string;
  itemHeight?: string;
}

export type Language = 'en' | 'it';