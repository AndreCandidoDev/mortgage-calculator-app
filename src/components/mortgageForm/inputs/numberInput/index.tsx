import styles from "./styles.module.scss"
import { FieldValues } from "react-hook-form"
import { InputProps } from "../inputProps.i"
import { useRef, useState } from "react"

export const NumberInput = <T extends FieldValues>({ 
    reactForm, 
    type, 
    name, 
    label,
    subtype 
}: InputProps<T>) =>
{
    const error = reactForm.formState.errors[name as keyof T]

    const inputDivRef = useRef<HTMLInputElement>(null)
    
    const inputRef = useRef<HTMLInputElement>(null)

    const [isFocused, setIsFocused] = useState(false)

    const handleInputClick = () => 
    {
        if (inputDivRef.current)
        {
            setIsFocused(true)
        }
    }

    const handleBlur = () => 
    {
        setIsFocused(false) 
    }

    const getIcon = () =>
    {
        if(subtype === 'currency')
        {
            return "$"
        }
        else if(subtype === "year")
        {
            return "years"
        }
        else if(subtype === "percentage")
        {
            return "%"
        }

        return ""
    }

    const inputClassName = () =>
    {
        if(subtype === 'currency')
        {
            return styles.inputIconLeft   
        }

        return styles.input
    }

    return (
        <div className={styles.inputItem}>
            <div className={styles.label}>
                <label>{label}</label>
            </div>
            <div 
                ref={inputDivRef}
                className={`${inputClassName()} ${isFocused ? styles.focused : ''}`}
                tabIndex={-1}
                onClick={handleInputClick}
            >
                <input
                    type={type}
                    {...reactForm.register(name, {
                        required: "Campo Obrigatório",
                    })}
                    ref={inputRef}
                    onBlur={handleBlur}
                />
                <div className={styles.icon}>
                    {getIcon()}
                </div>
            </div>
            {error && <span className={styles.error}>{String(error.message)}</span>}
        </div>
    )
}