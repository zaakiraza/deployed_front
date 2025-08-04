import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Flex
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function CourseDropdown({ value, onSelect, options }) {
  return (
    <>
      <Text mb={2}>Course</Text>
      <Menu>
        <MenuButton
          as={Button}
          bg="white"
          color="#C1C1C1"
          w="100%"
          mb={4}
          textAlign="left"
        >
          <Flex align="center" justify="space-between" w="100%">
            {/* Left: Open Book Icon + Text */}
            <Flex align="center" gap={2}>
              <HiOutlineBookOpen size="20px" />
              <Text>{value || "Select your course"}</Text>
            </Flex>

            {/* Right: Chevron Icon */}
            <ChevronDownIcon boxSize={5} />
          </Flex>
        </MenuButton>
        <MenuList w="100%" p={1} bg="#CED4D3">
          {options.map((course) => (
            <MenuItem
              key={course}
              color="#C1C1C1"
              mb={1}
              onClick={() => onSelect(course)}
            >
              {course}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
