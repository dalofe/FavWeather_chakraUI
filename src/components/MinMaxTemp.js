import { HStack, Text, Center, Divider } from '@chakra-ui/react';

export const MinMaxTemp = ({
  minValue,
  maxValue,
  size = 'sm',
  weight = 'normal',
}) => {
  return (
    <HStack>
      <Text fontSize={size} fontWeight={weight} color="blue.500">
        {Math.round(minValue)}º
      </Text>
      <Center height="20px">
        <Divider orientation="vertical" />
      </Center>
      <Text fontSize={size} fontWeight={weight} color="red.500">
        {Math.round(maxValue)}º
      </Text>
    </HStack>
  );
};
