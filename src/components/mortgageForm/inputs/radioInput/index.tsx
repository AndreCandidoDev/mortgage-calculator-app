import styles from "./styles.module.scss"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"
import { InputProps } from "../inputProps.i"
import { useEffect, useState } from "react"

interface optionProps<T extends FieldValues> {
    option: { label: string, value: string }
    reactForm: UseFormReturn<T>
    name: Path<T>
    stateRadio: { [key: string]: boolean }
    setStateRadio: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>> 
}

const Option = <T extends FieldValues>({ 
    option, 
    reactForm, 
    name,
    stateRadio,
    setStateRadio, 
    setSelectedOption
}: optionProps<T>) =>
{
    const error = reactForm.formState.errors[name as keyof T]

    const handleChange = () =>
    {        
        const data = stateRadio

        const keys = Object.keys(data)

        for(let i = 0; i < keys.length; i++)
        {
            data[keys[i]] = false
        }
        
        data[option.value] = true

        setStateRadio({ ...data })

        setSelectedOption(option.value)
    }

    return (
        <div className={styles.option} onClick={() => handleChange()}>
            {Object.keys(stateRadio).length > 0 && (
                <input
                    checked={stateRadio[option.value]} 
                    type="radio" 
                />
            )}
            <p>{option.label}</p>
            {error && <span className={styles.error}>{String(error.message)}</span>}
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

    const [stateRadio, setStateRadio] = useState<{[key: string]: boolean}>({})
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    useEffect(() => 
    {
        const data: {[key: string]: boolean} = {}

        options?.forEach((item) => 
        {
            data[item.value] = false
        })

        setStateRadio({ ...data })
    }, [options])

    useEffect(() => 
    {
        reactForm.setValue(name, selectedOption as PathValue<T, Path<T>>)
    }, [selectedOption, reactForm, name])

    return (
        <div className={styles.inputItem}>
            <label>{label}</label>
            <div className={styles.options}>
                {options?.map((option, key) => (
                    <Option 
                        key={key}
                        option={option} 
                        reactForm={reactForm} 
                        name={name} 
                        stateRadio={stateRadio}
                        setStateRadio={setStateRadio}
                        setSelectedOption={setSelectedOption}
                    />
                ))}
            </div>
            {error && <span className={styles.error}>{String(error.message)}</span>}
        </div>
    )
}