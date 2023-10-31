import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { MinMaxTemp } from './MinMaxTemp';
import { useContext } from 'react';
import { ForecastContext } from '../App';
import { dayName, monthName } from '../DateTime';

const ForecastItem = ({ item }) => {
  const forecastContextData = useContext(ForecastContext);
  const date = new Date(item.date);
  const now = new Date(Date.now());
  const dataDay = item.day;
  let dayOfTheWeek;

  if (now.getDay() === date.getDay()) {
    dayOfTheWeek = 'Today';
  } else if (now.getDay() + 1 === date.getDay()) {
    dayOfTheWeek = 'Tomorrow';
  } else {
    dayOfTheWeek = dayName[date.getDay()];
  }
  const dayMonth = `${date.getDate()} ${monthName[date.getMonth()]}`;

  const clickHandler = () => {
    forecastContextData.setActive(item.date);
    forecastContextData.setPerHourList(item);
  };

  let borderValue = '0';
  let backgroundValue = 'transparent';

  const themeValue = useColorModeValue('light', 'dark');
  const activeBackgroundColor = themeValue === 'light' ? '#D3DDE1' : '#000';

  if (forecastContextData.active === item.date) {
    borderValue = '1px';
    backgroundValue = activeBackgroundColor;
  }

  return (
    <Card
      w="9rem"
      minHeight={{ base: '13rem', sm: '16rem' }}
      cursor="pointer"
      border={borderValue}
      backgroundColor={backgroundValue}
      onClick={clickHandler}
      _hover={{ backgroundColor: activeBackgroundColor }}
    >
      <CardHeader align="center" p={{ base: '10px', sm: '20px' }}>
        <Heading size={{ base: 'xs', md: 'md' }}>{dayOfTheWeek}</Heading>
        <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>{dayMonth}</Text>
      </CardHeader>
      <CardBody align="center" p={0}>
        <Image src={dataDay.condition.icon} alt={dataDay.condition.text} />
        {dataDay.daily_will_it_rain === 1 && (
          <VStack fontSize="sm" color="blue.400" gap={0}>
            <Text weight="bold">{`${dataDay.daily_chance_of_rain}%`}</Text>
            <Text>{`${dataDay.totalprecip_mm}mm`}</Text>
          </VStack>
        )}
      </CardBody>
      <CardFooter justify="center" p={{ base: '10px', sm: '20px' }}>
        <MinMaxTemp
          minValue={dataDay.mintemp_c}
          maxValue={dataDay.maxtemp_c}
          size="md"
          weight="bold"
        />
      </CardFooter>
    </Card>
  );
};

export default ForecastItem;
