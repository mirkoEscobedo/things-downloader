import ShineBorder from "@/components/ui/shine-border";
import { useEffect, useRef, useState } from "react";
import GeneralButton from "@/shared/components/generalButton/GeneralButton";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { fetchData, fetchMedia } from "@/services/fetchService";

interface SearchBoxProps {
  className?: string;
  onSearch: (data: any) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ className, onSearch }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // const data = await fetchData(search);
      const data = await fetchMedia(search);
      onSearch(data);
    } catch (_) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`z-20 flex justify-center mt-20 w-full max-w-full md:max-w-xl lg:max-w-2xl mx-auto px-4 ${className}`}
      >
        <ShineBorder
          className="flex p-0 w-full"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderWidth={2}
        >
          <input
            ref={inputRef}
            className="z-10 flex-1 px-4 py-2 text-lg outline-none bg-transparent"
            type="url"
            placeholder="Enter a thread/playlist/video Link 🔗"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <GeneralButton
            onClick={handleSearch}
            className="z-30 text-lg px-4 py-2 mr-2"
          >
            {!loading ? (
              <ArrowRight></ArrowRight>
            ) : (
              <LoaderCircle className="spin"></LoaderCircle>
            )}
          </GeneralButton>
        </ShineBorder>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
};

export default SearchBox;

// export const elementToRender: ElementCardType[] = [
//   { title: 'kitti cat', icon: 'youtube' },
//   { title: 'kitti cat', icon: 'youtube' },
// ];
