import React from 'react';
import GeneralCard from '../general_card/General_Card';
import GeneralButton from '../generalButton/GeneralButton';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { cardFalse, cardTrue } from '@/state/reducers/transformingButtonSlice';

interface TransformingButtonProps {
  card_children: React.ReactNode;
  button_children: React.ReactNode;
  className?: string;
}
const TransformingButton: React.FC<TransformingButtonProps> = ({
  card_children,
  button_children,
  className,
}) => {
  // const [isCard, setIsCard] = useState(false);
const cardState = useAppSelector((state) => state.isCard.value);
  const dispatch = useAppDispatch();
  return (
    <>
      {cardState && (
        <>
          <div
            onClick={() => {
             dispatch(cardFalse()); 
            }}
            className={`opacity-10 fixed z-30 w-full h-screen flex justify-end  bg-black`}
          ></div>
          <div className="absolute m-2">
            <GeneralCard className={`z-50 ${className ?? ''}`}>
              {card_children}
            </GeneralCard>
          </div>
        </>
      )}
      <GeneralButton className="m-4" onClick={() => dispatch(cardTrue())}>
        {button_children}
      </GeneralButton>
    </>
  );
};
export default TransformingButton;
