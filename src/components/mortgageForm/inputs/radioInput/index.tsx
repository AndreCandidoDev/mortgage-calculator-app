import styles from "./styles.module.scss"
import { FieldValues } from "react-hook-form"
import { InputProps } from "../inputProps.i"

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
            <div className={styles.input}>
                <label>{label}</label>
        
            {/* <input
                type={type}
                placeholder={label}
                {...reactForm.register(name, {
                    required: "Campo Obrigatório",
                })}
            /> */}
            </div>
            {error && <span className={styles.error}>{String(error.message)}</span>}
        </div>
    )
}