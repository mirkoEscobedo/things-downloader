import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
interface ConvertSelectorProps {
  selectText: string;
}
const ConvertSelector: React.FC<ConvertSelectorProps> = ({ selectText }) => {
  return (
    <Select>
      <SelectTrigger className="w-[280px] bg-neutral-900">
        <SelectValue className="" placeholder={selectText} />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 text-white">
        <SelectGroup>
          <SelectLabel>Video MP4</SelectLabel>
          <SelectItem value="1080p">1080p</SelectItem>
          <SelectItem value="720p">720p</SelectItem>
          <SelectItem value="420p">420p</SelectItem>
          <SelectItem value="320p">320p</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Audio MP3</SelectLabel>
          <SelectItem value="320kbps">320kbps</SelectItem>
          <SelectItem value="192kbps">192kbps</SelectItem>
          <SelectItem value="128kbps">128kbps</SelectItem>
          <SelectItem value="64kbps">64kbps</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ConvertSelector;
