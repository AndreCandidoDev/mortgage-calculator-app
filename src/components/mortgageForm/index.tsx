"use client"

import styles from "./styles.module.scss"
import { parseForm } from "@/utils/parseForm"
import { formMortgage } from "./form"
import { NumberInput } from "./inputs/numberInput"
import { useForm } from "react-hook-form"
import { RadioInput } from "./inputs/radioInput"

export const MortgageForm: React.FC = () =>
{
    const reactForm = useForm()

    return (
        <div className={styles.mortgageForm}>
            <div className={styles.content}>
                {parseForm(formMortgage).map((row, key) => (
                    <div key={key} className={styles.row}>
                        {row.map((input, key2) => (
                            <div key={key2} className={styles.inputRow}>
                                {input.type === 'number' && (
                                    <NumberInput
                                        reactForm={reactForm}
                                        type={input.type}
                                        name={input.name}
                                        label={input.label}
                                    />
                                )}

                                {input.type === 'radio' && (
                                    <RadioInput
                                        reactForm={reactForm}
                                        type={input.type}
                                        name={input.name}
                                        label={input.label}
                                        options={input.options}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}