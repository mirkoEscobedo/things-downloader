import SparklesText from "../ui/sparkles-text";

const Title: React.FC = () => {
  return (
    <h1 className="text-center mt-32 flex flex-wrap justify-center gap-x-3">
      <span className="flex">
        '{<SparklesText text="THINGS" className="text-red-600" />}'
      </span>
      downloader <span> - </span>
      <span>
        {" "}
        cit.{" "}
        <a
          href="https://www.youtube.com/@t3dotgg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Theo</span>
        </a>
      </span>{" "}
      ❤️
    </h1>
  );
};

export default Title;
