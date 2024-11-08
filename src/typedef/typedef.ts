import { SVGProps } from 'react';

export type ElementCardType = {
  title?: string;
  thumbnail?: string;
  extraClasses?: string;
  icon?: string;
  onClick?: () => void;
};

export interface logoProps extends SVGProps<SVGSVGElement> {
  itemWidth?: string;
  itemHeight?: string;
}
