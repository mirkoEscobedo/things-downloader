import ShineBorder from '@/components/ui/shine-border';
import { useEffect, useRef, useState } from 'react';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
interface SearchBoxProps {
  className?: string;
  onClick?: () => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ className, onClick }) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div
        className={`flex justify-center mt-20 w-full max-w-full md:max-w-xl lg:max-w-2xl mx-auto px-4 ${className}`}
      >
        <ShineBorder
          className="flex p-0 w-full"
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          borderWidth={2}
        >
          <input
            ref={inputRef}
            className="z-10 flex-1 px-4 py-2 text-lg outline-none bg-transparent"
            type="text"
            placeholder="Enter a thread/playlist/video Link 🔗"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <GeneralButton onClick={onClick} className="text-lg px-4 py-2 mr-2">
            Start
          </GeneralButton>
        </ShineBorder>
      </div>
    </>
  );
};

export default SearchBox;
