import AdBanner from './../../assets/310x100.png';

export const FakeAd = () => {
  return (
    <>
      <div className="w-80 h-24 mb-2 rounded-lg overflow-hidden bg-gray-200">
        <img
          // src="https://placehold.jp/310x100.png"
          src={AdBanner}
          alt="Ad Banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </>
  );
};
