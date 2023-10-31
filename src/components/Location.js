import { memo } from 'react';
import { VStack, Heading, Box } from '@chakra-ui/react';
import { dayName } from '../DateTime';

const Location = ({ location, current }) => {
  return (
    <VStack
      display="flex"
      justifyContent="center"
      paddingBottom={{ base: '0.75rem', md: '0' }}
    >
      <Heading size="lg">{location.name}</Heading>
      <Heading size="md">({location.country})</Heading>
      <Box>
        {`${current.getHours()}:${current.getMinutes()}hs | ${
          dayName[current.getDay()]
        }`}
      </Box>
    </VStack>
  );
};

export const LocationMemoized = memo(Location);
