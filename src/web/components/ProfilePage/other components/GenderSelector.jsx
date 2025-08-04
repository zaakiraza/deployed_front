import { Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";

export default function GenderSelector({ value, onChange }) {
  return (
    <>
      <Text mb={2}>Gender</Text>
      <RadioGroup value={value} onChange={onChange} mb={4}>
        <Stack direction="row">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
