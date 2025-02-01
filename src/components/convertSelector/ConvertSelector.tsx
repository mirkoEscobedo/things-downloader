import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setFormat } from '@/state/reducers/selectFormatSlice';
import React from 'react';
interface ConvertSelectorProps {
  selectText: string;
  name: string;
}
const ConvertSelector: React.FC<ConvertSelectorProps> = ({
  selectText,
  name,
}) => {
  const dispatch = useAppDispatch();
  const format = useAppSelector((state) => state.selectFormat.format);
  const handleOnFormatChange = (value: string) => {
    dispatch(setFormat(value));
    console.log(format);
  };

  return (
    <Select name={name} onValueChange={handleOnFormatChange}>
      <SelectTrigger className="w-[280px] bg-neutral-900 text-white">
        <SelectValue className="text-white" placeholder={selectText} />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 text-white">
        <SelectGroup>
          <SelectItem value="default">Do Not Convert</SelectItem>
          <SelectLabel>Video Formats</SelectLabel>
          <SelectItem value="mp4">MP4</SelectItem>
          <SelectItem value="webm">WEBM</SelectItem>
          <SelectItem value="avi">AVI</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Audio Formats</SelectLabel>
          <SelectItem value="mp3">MP3</SelectItem>
          <SelectItem value="acc">ACC</SelectItem>
          <SelectItem value="wav">WAV</SelectItem>
          <SelectItem value="ogg">OGG</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ConvertSelector;
