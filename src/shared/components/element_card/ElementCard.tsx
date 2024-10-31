import defaultImage from "@/assets/default_image.png";
import Chan from "@/components/chan/Chan";
import Twitter from "@/components/twitter/Twitter";
import XformerlyTwitter from "@/components/x/X";
import YouTube from "@/components/youtube_logo/YoutubeLogo";
import YoutubeMusic from "@/components/youtube_music_logo/YoutubeMusic";

interface ElementCardProps {
  icon?: string;
  thumbnail?: string;
  title: string;
  onClick?: () => void;
}
const ElementCard: React.FC<ElementCardProps> = ({
  icon,
  thumbnail,
  title,
}) => {
  const toDisplay = (icon?: string) => {
    switch (icon) {
      case "youtube":
        return <YouTube className="mr-1"></YouTube>;
      case "youtubeMusic":
        return <YoutubeMusic className="mr-1"></YoutubeMusic>;
      case "twitter":
        return <Twitter className="mr-1"></Twitter>;
      case "x":
        return <XformerlyTwitter className="mr-1"></XformerlyTwitter>;
      case "4chan":
        return <Chan></Chan>;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex flex-col items-center m-4 rounded-md hover:shadow-lg transition-shadow max-w-xs">
        <div className="w-full overflow-hidden rounded-mb mb-1 aspect-w-16 aspect-h-9">
          <img
            src={thumbnail ? thumbnail : defaultImage}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          ></img>
        </div>
        <h3 className="flex text-left items-center font-semibold text-lg mb-1">
          {toDisplay(icon)}
          {title}
        </h3>
      </div>
    </>
  );
};
export default ElementCard;
