import { Text, Input } from "@chakra-ui/react";

export default function ProfessionalForm({ data, onChange }) {
  return (
    <>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Professional Info
      </Text>

      <Input
        placeholder="Enter your qualification"
        value={data.qualification}
        onChange={(e) => onChange("qualification", e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Enter your designation"
        value={data.designation}
        onChange={(e) => onChange("designation", e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Enter your company name"
        value={data.company}
        onChange={(e) => onChange("company", e.target.value)}
        mb={4}
      />
    </>
  );
}
