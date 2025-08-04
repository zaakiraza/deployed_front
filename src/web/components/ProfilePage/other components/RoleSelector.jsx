import { Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";

export default function RoleSelector({ value, onChange }) {
  return (
    <>
      <Text mb={2}>You are:</Text>
      <RadioGroup value={value} onChange={onChange} mb={6}>
        <Stack direction="row">
          <Radio value="Student">Student</Radio>
          <Radio value="Professional">Professional</Radio>
          <Radio value="Other">Other</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
