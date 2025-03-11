"use client"

import { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import Image from "next/image"
import { AppContext } from "@/context"

export const ResultComponent: React.FC = () =>
{
    const { data, clear } = useContext(AppContext)

    const [calculated, setCalculated] = useState<boolean>(false)

    const [payments, setPayments] = useState({ monthly: 0 || "", repay: 0 || "" })

    const getResults = () =>
    {
        const mortgageType = data.mortgageType
        
        const mortgageAmount = Number(data.mortgageAmount)
        const mortgageTerm = Number(data.mortgageTerm) * 12
        const interestRate = (Number(data.interestRate) / 100) / 12

        let monthly = 0
        let repay = 0

        if(mortgageType === 'repayment')
        {
            monthly = mortgageAmount * ((interestRate * ((1 + interestRate) ** mortgageTerm)) / (((1 + interestRate) ** mortgageTerm) - 1))
            repay = monthly * mortgageTerm
        }
        else if(mortgageType === 'interestOnly')
        {
            monthly = mortgageAmount * mortgageTerm
            repay = (monthly * mortgageTerm) + mortgageAmount
        }

        const newPayment = { 
            monthly: new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
            }).format(monthly), 
            repay: new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
            }).format(repay) 
        }

        setPayments({ ...newPayment })
    }

    useEffect(() => 
    {
        if(
            !Number.isNaN(data.interestRate) && 
            !Number.isNaN(data.mortgageAmount) && 
            !Number.isNaN(data.mortgageTerm) &&
            data.mortgageType !== ""
        )
        {
            getResults()
            setCalculated(true)
        }
    }, [data])

    useEffect(() => 
    {
        setCalculated(false)
    }, [clear])

    const resultClassName = () =>
    {
        if(calculated)
        {
            return styles.resultComponent + " " + styles.calculated
        }

        return styles.resultComponent
    }

    return (
        <div className={resultClassName()}>
            {calculated ?
                <div className={styles.contentResult}>
                    <p className={styles.title}>Your results</p>
                    <p className={styles.text}>Your results are shown below based on the information you provided. To adjust the results, edit the form and click &quot;Calculate repayments&quot; again.</p>
                    <div className={styles.results}>
                        <div className={styles.monthly}>
                            <p className={styles.text}>Your monthly repayments</p>
                            <p className={styles.monthlyPayment}>{payments.monthly}</p>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.repayment}>
                            <p className={styles.text}>Total you´ll repay over the term</p>
                            <p className={styles.repay}>{payments.repay}</p>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.contentStarted}>
                    <Image
                        priority    
                        src={"svg/illustration-empty.svg"}
                        fill={true}
                        alt="svg"
                    />
                    <p className={styles.title}>Results shown here</p>
                    <p className={styles.text}>Complete the form and click &quot;Calculate Repayments&quot; to see what your monthly repayments would be.</p>
                </div>
            }
        </div>
    )
}