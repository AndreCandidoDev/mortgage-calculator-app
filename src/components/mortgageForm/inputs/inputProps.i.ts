import { UseFormReturn, FieldValues, Path } from "react-hook-form"

type inputTypes = "number" | "radio"

export interface InputProps<T extends FieldValues> {
    reactForm: UseFormReturn<T>
    name: Path<T>
    label: string
    type: inputTypes
    options?: Array<{label: string, value: string}>
}