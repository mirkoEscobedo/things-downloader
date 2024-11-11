import { SVGProps } from 'react';

export type ElementCardType = {
  title?: string;
  thumbnail?: string | null;
  extraClasses?: string;
  icon?: string;
  onClick?: () => void;
};

export interface logoProps extends SVGProps<SVGSVGElement> {
  itemWidth?: string;
  itemHeight?: string;
}
