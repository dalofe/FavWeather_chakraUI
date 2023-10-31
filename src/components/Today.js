import { memo } from 'react';
import {
  Image,
  Box,
  Grid,
  GridItem,
  Heading,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MinMaxTemp } from './MinMaxTemp';

const Today = ({ current, forecast }) => {
  const themeValue = useColorModeValue('light', 'dark');
  const boxBackgroundColor = themeValue === 'light' ? '#61CFFF' : '#305A6D';

  return (
    <Box backgroundColor={boxBackgroundColor} p="1rem">
      <Container>
        <Grid templateColumns={{ sm: 'repeat(3, 1fr)' }}>
          <GridItem display="flex" justifyContent="center">
            <Image src={current.condition.icon} alt={current.condition.text} />
          </GridItem>
          <GridItem
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size="2xl">{Math.round(current.temp_c)}º</Heading>
            <Box>Feels like {Math.round(current.feelslike_c)}º</Box>
          </GridItem>
          <GridItem
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size="md">{current.condition.text}</Heading>
            <MinMaxTemp
              minValue={forecast.forecastday[0].day.mintemp_c}
              maxValue={forecast.forecastday[0].day.maxtemp_c}
            />
            <Text fontSize="sm">
              Wind: {current.wind_dir} {Math.round(current.wind_kph)}km/h
            </Text>
            <Text fontSize="sm">Humidity: {current.humidity}%</Text>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export const TodayMemoized = memo(Today);
