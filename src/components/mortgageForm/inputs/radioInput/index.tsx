import styles from "./styles.module.scss"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { InputProps } from "../inputProps.i"
import { useState } from "react"

interface optionProps<T extends FieldValues> {
    option: { label: string, value: string }
    reactForm: UseFormReturn<T>
    name: string
}

const Option = <T extends FieldValues>({ 
    option, 
    reactForm, 
    name 
}: optionProps<T>) =>
{
    const [checked, setChecked] = useState<boolean>(false)
    console.log(reactForm, name, setChecked)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        console.log(e.target.checked)
    }

    return (
        <div className={styles.option}>
            <input
                checked={checked} 
                type="radio" 
                onChange={(e) => handleChange(e)}
            />
            <p>{option.label}</p>
        </div>
    )
}

export const RadioInput = <T extends FieldValues>({ 
    reactForm, 
    name, 
    label,
    options 
}: InputProps<T>) =>
{
    const error = reactForm.formState.errors[name as keyof T]

    return (
        <div className={styles.inputItem}>
            <label>{label}</label>
            <div className={styles.options}>
                {options?.map((option, key) => (
                    <Option 
                        option={option} 
                        reactForm={reactForm} 
                        name={name} 
                        key={key}
                    />
                ))}
            </div>
            {error && <span className={styles.error}>{String(error.message)}</span>}
        </div>
    )
}