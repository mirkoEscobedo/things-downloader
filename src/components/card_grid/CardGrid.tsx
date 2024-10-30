import React from 'react';
import ElementCard from '../../shared/components/element_card/ElementCard';

interface CardData {
  icon?: string;
  thumbnail?: string;
  title: string;
}
const CardGrid: React.FC<{ data: CardData[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((item, index) => (
        <ElementCard
          key={index}
          icon={item.icon}
          thumbnail={item.thumbnail}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default CardGrid;

export const sampleData: CardData[] = [
  { icon: 'youtube', title: 'YouTube Video 1' },
  { icon: 'twitter', title: 'Twitter Post' },
  { title: 'Kitty cat video', icon: '4chan' }, // This will use the default thumbnail
  // Add more items as needed
];
