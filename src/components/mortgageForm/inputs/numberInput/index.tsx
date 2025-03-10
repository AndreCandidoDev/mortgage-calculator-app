import styles from "./styles.module.scss"
import { FieldValues, Path, PathValue } from "react-hook-form"
import { InputProps } from "../inputProps.i"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/context"

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

    const { clear } = useContext(AppContext)

    useEffect(() => 
    {
        if(inputRef.current)
        {
            inputRef.current.value = ""
        }
    }, [clear])

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
        let className = styles.input

        if(subtype === 'currency')
        {
            className = styles.inputIconLeft   
        }

        if(isFocused)
        {
            className = className + " " + styles.focused
        }

        if(error)
        {
            className = className + " " + styles.focusedError
        }

        return className
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value
        reactForm.setValue(name, value as PathValue<T, Path<T>>)
    }

    return (
        <div className={styles.inputItem}>
            <div className={styles.label}>
                <label>{label}</label>
            </div>
            <div 
                ref={inputDivRef}
                className={inputClassName()}
                tabIndex={-1}
                onClick={handleInputClick}
            >
                <input
                    {...reactForm.register(name, {
                        required: "This Field Is Required",
                    })}
                    type={type}
                    ref={inputRef}
                    onBlur={handleBlur}
                    onChange={(e) => handleInput(e)}
                />
                <div className={styles.icon}>
                    {getIcon()}
                </div>
            </div>
            {error && <span className={styles.error}>{String(error.message)}</span>}
        </div>
    )
}