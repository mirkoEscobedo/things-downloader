import React from 'react';
import ElementCard from '../../shared/components/element_card/ElementCard';
import { ElementCardType } from '@/typedef/typedef';

const CardGrid: React.FC<{ data: ElementCardType[] }> = ({ data }) => {
  return (
    <div className="flex justify-center p-4 z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto z-10">
        {data.map((item, index) => (
          <ElementCard
            key={index}
            icon={item.icon}
            thumbnail={item.thumbnail}
            title={item.title}
            url={item.url}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
