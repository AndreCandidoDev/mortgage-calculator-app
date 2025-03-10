"use client"

import styles from "./styles.module.scss"
import { parseForm } from "@/utils/parseForm"
import { formMortgage } from "./form"
import { NumberInput } from "./inputs/numberInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { RadioInput } from "./inputs/radioInput"
import { formDataType } from "@/types/formDataType"
import Image from "next/image"
import { useContext, useEffect } from "react"
import { AppContext } from "@/context"

export const MortgageForm: React.FC = () =>
{
    const reactForm = useForm<formDataType>()

    const { setClear, clear } = useContext(AppContext)

    useEffect(() => 
    {
        reactForm.reset({
            mortgageAmount: "",
            mortgageTerm: "",
            interestRate: "",
            mortgageType: ""
        })
    }, [clear, reactForm])

    const handleForm: SubmitHandler<formDataType> = (data) =>
    {
        reactForm.clearErrors()

        console.log(data)

        // if(!data.mortgageType)
        // {
        //     reactForm.setError("mortgageType", { type: "custom", message: "custom message" })
        // }
    }

    const handleSubmitForm = () =>
    {
        const mortgageType = reactForm.getValues("mortgageType")

        if(!mortgageType)
        {
            reactForm.setError("mortgageType", { type: "custom", message: "This Field Is Required" })
        }
        else
        {
            reactForm.clearErrors('mortgageType')
        }

        reactForm.handleSubmit(handleForm)()
    }

    return (
        <div className={styles.mortgageForm}>
            <div className={styles.content}>
                <div className={styles.formHeader}>
                    <p>Mortgage Calculator</p>
                    <p onClick={() => setClear(!clear)}>Clear All</p>
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
                        onClick={() => handleSubmitForm()}
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