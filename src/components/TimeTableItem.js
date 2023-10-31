import { Grid, Image, VStack, Text, Box, Flex } from '@chakra-ui/react';

export const TimeTableItem = ({ timeData, hours }) => {
  const time = `${hours}:00`;

  const mapUvIndex = value => {
    if (value < 2) {
      return 'Low';
    } else if (value >= 2 && value <= 5) {
      return 'Moderate';
    } else if (value > 5 && value <= 7) {
      return 'High';
    } else if (value > 8 && value <= 10) {
      return 'Very High';
    } else {
      return 'Extreme';
    }
  };

  return (
    <Grid
      templateColumns="1fr 2fr 2fr 2fr 1fr"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex align="center" justify="center">
        {time}
      </Flex>
      <Box align="center">
        <Image src={timeData.condition.icon} alt={timeData.condition.text} />
      </Box>
      <VStack gap={0} justify="center">
        <Text fontWeight="bold">{timeData.condition.text}</Text>
        <Text>Feels like: {Math.round(timeData.feelslike_c)}º</Text>
      </VStack>
      <Flex align="center" justify="center">
        {timeData.wind_dir} {Math.round(timeData.wind_kph)}km/h
      </Flex>
      <VStack gap={0} justify="center">
        <Text>UV: {timeData.uv}</Text>
        <Text>{mapUvIndex(timeData.uv)}</Text>
      </VStack>
    </Grid>
  );
};
