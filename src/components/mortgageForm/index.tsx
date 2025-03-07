"use client"

import styles from "./styles.module.scss"
import { parseForm } from "@/utils/parseForm"
import { formMortgage } from "./form"
import { NumberInput } from "./inputs/numberInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { RadioInput } from "./inputs/radioInput"
import { formDataType } from "@/types/formDataType"
import Image from "next/image"

export const MortgageForm: React.FC = () =>
{
    const reactForm = useForm<formDataType>()

    const handleForm: SubmitHandler<formDataType> = (data) =>
    {
        reactForm.clearErrors()

        console.log(data)

        // if(!data.mortgageType)
        // {
        //     reactForm.setError("mortgageType", { type: "custom", message: "custom message" })
        // }
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
                                            subtype={input.subtype}
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
                    <button 
                        onClick={reactForm.handleSubmit(handleForm)}
                    >
                        <Image
                            priority    
                            src={"svg/icon-calculator.svg"}
                            fill={true}
                            alt="svg"
                        />
                        <p>Calculate Repayments</p>
                    </button>
                </div>
            </div>
        </div>
    )
}