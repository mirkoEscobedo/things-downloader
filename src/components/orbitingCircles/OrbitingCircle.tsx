import Chan from "../chan/Chan";
import OrbitingCircles from "../ui/orbiting-circles";
import XformerlyTwitter from "../x/X";
import YouTube from "../youtube_logo/YoutubeLogo";
import YoutubeMusic from "../youtube_music_logo/YoutubeMusic";

const OrbitingCircle: React.FC = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Chan Circles */}
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Chan itemHeight="8em" itemWidth="8em" />
      </OrbitingCircles>

      {/*x icon */}
      <OrbitingCircles
        className="size-[40px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <XformerlyTwitter itemHeight="8em" itemWidth="8em" />
      </OrbitingCircles>

      {/*youtube icon*/}
      <OrbitingCircles
        className="size-[80px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={200}
        reverse
      >
        <YouTube itemWidth="15em" itemHeight="15em" />
      </OrbitingCircles>

      {/*youtubeMusic icon*/}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={200}
        reverse
      >
        <YoutubeMusic itemWidth="10em" itemHeight="10em" />
      </OrbitingCircles>
    </div>
  );
};
export default OrbitingCircle;
