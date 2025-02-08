import { SVGProps } from 'react';

export type ElementCardType = {
  title?: string;
  thumbnail?: string | null;
  extraClasses?: string;
  icon?: string;
  onClick?: () => void;
  url: string;
  ext: string;
};

export interface logoProps extends SVGProps<SVGSVGElement> {
  itemWidth?: string;
  itemHeight?: string;
}

export type Language = 'en' | 'it';

export interface MediaItem {
  filename: string;
  url: string;
  board: string;
  tim: number;
  thumbnail: string | null;
  ext: string;
}

export type ProcessedFiles = {
  blob: Blob;
  fileName: string;
  mimeType: string;
};

export type DownloadResponse = {
  video: Blob;
  title: string | undefined;
  ext: string;
};
