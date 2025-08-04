import { Text, Stack, Radio, RadioGroup } from "@chakra-ui/react";
import { Hand } from "lucide-react";
export default function OtherForm({ data, onChange }) {
    return (
        <>
            <Text mb={2}>You are:</Text>
            <RadioGroup value={data.type} onChange={(e)=>{onChange("type",e.target.value)}} mb={6}>
                <Stack direction="row">
                    <Radio value="Layman">Layman</Radio>
                    <Radio value="Housewife">Housewife</Radio>
                    <Radio value="Senior Citizen">Senior Citizen</Radio>
                </Stack>
            </RadioGroup>
        </>
    )
}