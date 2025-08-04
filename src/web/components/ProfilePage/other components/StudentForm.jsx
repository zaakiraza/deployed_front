import { Text, RadioGroup, Radio, Stack, Input } from "@chakra-ui/react";

export default function StudentForm({ data, onChange }) {
  return (
    <>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Educational Info
      </Text>

      <Text mb={2}>You are from:</Text>
      <RadioGroup
        value={data.educationLevel}
        onChange={(val) => onChange("educationLevel", val)}
        mb={4}
      >
        <Stack direction="row">
          <Radio value="School">School</Radio>
          <Radio value="College">College</Radio>
          <Radio value="University">University</Radio>
          <Radio value="Other">Other</Radio>
        </Stack>
      </RadioGroup>

      <Text mb={2}>Degree/Program</Text>
      <RadioGroup
        value={data.degree}
        onChange={(val) => onChange("degree", val)}
        mb={4}
      >
        <Stack direction="column">
          <Radio value="Primary">Primary</Radio>
          <Radio value="Secondary">Secondary</Radio>
          <Radio value="Higher Secondary">Higher Secondary</Radio>
          <Radio value="Graduation">Graduation</Radio>
          <Radio value="Post-Graduation">Post-Graduation</Radio>
          <Radio value="Diploma">Diploma</Radio>
        </Stack>
      </RadioGroup>

      <Input
        placeholder="Enter your institute name"
        value={data.instituteName}
        onChange={(e) => onChange("instituteName", e.target.value)}
        mb={4}
        bg="white"
        color="black"
      />
    </>
  );
}
