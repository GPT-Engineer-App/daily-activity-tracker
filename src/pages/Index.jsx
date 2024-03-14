import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, HStack, IconButton, Spacer, Image, Progress, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [time, setTime] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.trim() !== "") {
      setActivities([...activities, { activity, time, screenshot, progress, notes }]);
      setActivity("");
      setTime("");
      setScreenshot("");
      setProgress(0);
      setNotes("");
      toast({
        title: "Activity added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    toast({
      title: "Activity deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Daily Activities Diary
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="activity" isRequired>
            <FormLabel>Activity</FormLabel>
            <Input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
          </FormControl>
          <FormControl id="time">
            <FormLabel>Time</FormLabel>
            <Input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
          </FormControl>
          <FormControl id="screenshot">
            <FormLabel>Screenshot</FormLabel>
            <Input type="text" value={screenshot} onChange={(e) => setScreenshot(e.target.value)} placeholder="Enter image URL" />
          </FormControl>
          <FormControl id="progress">
            <FormLabel>Progress</FormLabel>
            <Progress value={progress} colorScheme="blue" hasStripe mb={2} />
            <Input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(parseInt(e.target.value))} />
          </FormControl>
          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" leftIcon={<FaPlus />}>
            Add Activity
          </Button>
        </VStack>
      </form>
      <VStack spacing={4} mt={8}>
        {activities.map((activity, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="md" width="100%">
            <HStack>
              <Heading as="h3" size="md">
                {activity.activity}
              </Heading>
              <Spacer />
              <IconButton icon={<FaTrash />} onClick={() => handleDelete(index)} variant="ghost" colorScheme="red" size="sm" />
            </HStack>
            <Box mt={2}>
              <strong>Time:</strong> {activity.time}
            </Box>
            {activity.screenshot && <Image src={activity.screenshot} alt="Screenshot" mt={2} maxHeight="200px" />}
            <Progress value={activity.progress} colorScheme="blue" hasStripe mt={2} />
            <Box mt={2}>{activity.notes}</Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
