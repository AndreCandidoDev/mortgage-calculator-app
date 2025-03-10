import styles from "./styles.module.scss"
import { Option } from "./option"
import { FieldValues, Path, PathValue } from "react-hook-form"
import { InputProps } from "../inputProps.i"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context"

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

    const { clear } = useContext(AppContext)

    useEffect(() => 
    {
        const data: {[key: string]: boolean} = {}

        options?.forEach((item) => 
        {
            data[item.value] = false
        })

        setStateRadio({ ...data })

        setSelectedOption(null)
    }, [options, clear])

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