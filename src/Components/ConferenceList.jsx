import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, IconButton, Flex } from '@chakra-ui/react';
import { AtSignIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

function ConferenceList() {
  const [conferences, setConferences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('https://gdscdev.vercel.app/api')
      .then(response => {
        setConferences(response.data.content.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? conferences.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === conferences.length - 1 ? 0 : currentIndex + 1);
  };

  if (conferences.length === 0) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  const conference = conferences[currentIndex];

  return (
    <Flex justify="center" alignItems="center" height="100vh" bgGradient="linear(to-r, teal.500, blue.500)">
      <Box borderWidth="1px" borderRadius="lg" p={4} bgColor={"blackAlpha.300"} boxShadow="lg" position="relative" maxWidth="400px">
        <IconButton icon={<ChevronLeftIcon />} onClick={handlePrev} position="absolute" top="50%" left={2} transform="translateY(-50%)" size="md" />
        <IconButton icon={<ChevronRightIcon />} onClick={handleNext} position="absolute" top="50%" right={2} transform="translateY(-50%)" size="md" />
        <Heading size="lg" mt={2} color="white" textAlign="center" fontFamily={"Bebas Neue"}>{conference.title}</Heading>
        <Image src={conference.banner_image} alt={conference.title} maxW="100%" borderRadius="md" mt={2} />
        <Flex alignItems="center" mt={2} justifyContent="center">
  <IconButton icon={<CalendarIcon />} bg="gray.300" size="sm" borderRadius="full" />
  <Text ml={2} color="white" fontFamily="Charis SIL" >
    {new Date(conference.date_time).toLocaleDateString()}{' '}
    {new Date(conference.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </Text>
</Flex>
        <Text color="white" mt={2} fontFamily={'Charis SIL'} textAlign="center">{conference.description}</Text>
        <Flex alignItems="center" mt={2} justifyContent="center">
          <Image src={conference.organiser_icon} alt={conference.organiser_name} maxW="10%" borderRadius="full" />
          <Text fontFamily="Charis SIL" ml={2} color="white"> {conference.organiser_name}</Text>
        </Flex>
        <Flex alignItems="center" mt={2} justifyContent="center" fontFamily={"Charis SIL"}>
          <IconButton icon={<AtSignIcon />} bg="gray.300" size="sm" borderRadius="full" />
          <Text ml={2} color="white"> {conference.venue_name}, {conference.venue_city}, {conference.venue_country}</Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default ConferenceList;
