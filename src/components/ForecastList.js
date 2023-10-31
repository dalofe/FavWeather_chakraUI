import { memo } from 'react';
import ForecastItem from './ForecastItem';
import { HStack } from '@chakra-ui/react';

const ForecastList = ({ list, setPerHourList, active, setActive }) => {
  return (
    <HStack justify="center" margin="1rem 0">
      {list.map(item => (
        <ForecastItem
          key={item.date}
          item={item}
          setPerHourList={setPerHourList}
          active={active}
          setActive={setActive}
        />
      ))}
    </HStack>
  );
};

export const ForecsatListMemoized = memo(ForecastList);
