import { Stack, Input, Text } from "@chakra-ui/react";

export default function DateOfBirthInput({ dob, onChange }) {
  return (
    <>
      <Text mb={2}>Date of Birth</Text>
      <Stack direction="row" spacing={2} mb={4}>
        <Input
          placeholder="DD"
          _placeholder={{ color: "#C1C1C1" }}
          value={dob.dd}
          onChange={(e) => onChange("dd", e.target.value)}
          bg="white"
          color="black"
        />
        <Input
          placeholder="MM"
          _placeholder={{ color: "#C1C1C1" }}
          value={dob.mm}
          onChange={(e) => onChange("mm", e.target.value)}
          bg="white"
          color="black"
        />
        <Input
          placeholder="YYYY"
          _placeholder={{ color: "#C1C1C1" }}
          value={dob.yy}
          onChange={(e) => onChange("yy", e.target.value)}
          bg="white"
          color="black"
        />
      </Stack>
    </>
  );
}
