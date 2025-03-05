export const formMortgage = [
    {
        type: 'number',
        label: 'Mortgage Amount',
        subtype: 'currency',
        name: 'mortgageAmount',
        row: 0,
        col: 0,
    },
    {
        type: 'number',
        label: 'Mortgage Term',
        subtype: 'year',
        name: 'mortgageTerm',
        row: 1,
        col: 0,
    },
    {
        type: 'number',
        label: 'Interest Rate',
        subtype: 'percentage',
        name: 'interestRate',
        row: 1,
        col: 1,
    },
    {
        type: 'radio',
        label: 'Mortgage Type',
        name: 'mortgageType',
        row: 2,
        col: 0,
        options: [
            {
                label: "Repayment",
                value: "repayment"
            },
            {
                label: "Interest Only",
                value: "interestOnly"
            }
        ]
    }
]