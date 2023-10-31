import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

export const Search = ({
  searchedPlace,
  inputChange,
  clearSearchInput,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <InputGroup>
        <Input
          placeholder="Search City"
          value={searchedPlace}
          onChange={inputChange}
        />
        <InputRightElement width="5rem">
          <Button h="2rem" mr="0.25rem" onClick={submitHandler}>
            Search
          </Button>
        </InputRightElement>
        {searchedPlace && (
          <Button
            position="absolute"
            right="5rem"
            backgroundColor="transparent"
            padding={0}
            onClick={clearSearchInput}
            zIndex={1}
            _hover={{ backgroundColor: 'transparent' }}
          >
            x
          </Button>
        )}
      </InputGroup>
    </form>
  );
};
