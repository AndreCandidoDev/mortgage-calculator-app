"use client"

import styles from "./styles.module.scss"
import { parseForm } from "@/utils/parseForm"
import { formMortgage } from "./form"
import { NumberInput } from "./inputs/numberInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { RadioInput } from "./inputs/radioInput"
import { formDataType } from "@/types/formDataType"

export const MortgageForm: React.FC = () =>
{
    const reactForm = useForm<formDataType>()

    const handleForm: SubmitHandler<formDataType> = (data) =>
    {
        console.log(data)
    }

    return (
        <div className={styles.mortgageForm}>
            <div className={styles.content}>
                <div className={styles.formHeader}>
                    <p>Mortgage Calculator</p>
                    <p>Clear All</p>
                </div>
                <div className={styles.form}>
                    {parseForm(formMortgage).map((row, key) => (
                        <div key={key} className={styles.row}>
                            {row.map((input, key2) => (
                                <div key={key2} className={styles.inputRow}>
                                    {input.type === 'number' && (
                                        <NumberInput
                                            reactForm={reactForm}
                                            type={input.type}
                                            name={input.name as keyof formDataType}
                                            label={input.label}
                                        />
                                    )}

                                    {input.type === 'radio' && (
                                        <RadioInput
                                            reactForm={reactForm}
                                            type={input.type}
                                            name={input.name as keyof formDataType}
                                            label={input.label}
                                            options={input.options}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={reactForm.handleSubmit(handleForm)}>Calculate Repayments</button>
            </div>
        </div>
    )
}