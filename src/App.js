import React, { useState, useRef, createContext } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Container,
  Grid,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TodayMemoized } from './components/Today';
import { ForecsatListMemoized } from './components/ForecastList';
import { TimeTableList } from './components/TimeTableList';
import { Search } from './components/Search';
import { LocationMemoized } from './components/Location';
import { useFetchData } from './hooks/useFetchData';

const ForecastContext = createContext(undefined);

function App() {
  const localDateRef = useRef();
  const [searchedPlace, setSearchedPlace] = useState('');
  const [fetchedData, setFetchedData] = useState(undefined);
  const [perHourList, setPerHourList] = useState(undefined);
  const [active, setActive] = useState(undefined);

  const submitHandler = useFetchData({
    searchedPlace,
    setFetchedData,
    setActive,
    setPerHourList,
    localDateRef,
  });

  const inputChange = e => {
    setSearchedPlace(e.target.value);
  };

  const clearSearchInput = () => {
    setSearchedPlace('');
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="90vh" p={3}>
        <Box textAlign="right">
          <ColorModeSwitcher />
        </Box>
        <VStack pt="3rem" spacing={8}>
          <Container maxW="container.xl">
            <Search
              searchedPlace={searchedPlace}
              inputChange={inputChange}
              clearSearchInput={clearSearchInput}
              submitHandler={submitHandler}
            />
            {fetchedData && (
              <>
                <Grid templateColumns={{ md: '1fr 2fr' }} mt="1rem">
                  <LocationMemoized
                    current={localDateRef.current}
                    location={fetchedData.location}
                  />
                  <TodayMemoized
                    current={fetchedData.current}
                    forecast={fetchedData.forecast}
                  />
                </Grid>
                <ForecastContext.Provider
                  value={{
                    setPerHourList: setPerHourList,
                    setActive: setActive,
                    active: active,
                  }}
                >
                  <ForecsatListMemoized
                    list={fetchedData.forecast.forecastday}
                  />
                </ForecastContext.Provider>
                <TimeTableList
                  list={perHourList}
                  localDateNow={localDateRef.current}
                />
              </>
            )}
          </Container>
        </VStack>
      </Box>
      <Box textAlign="center" padding="2rem 0 1rem">
        Powered by{' '}
        <Link href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </Link>
      </Box>
    </ChakraProvider>
  );
}

export default App;
export { ForecastContext };
