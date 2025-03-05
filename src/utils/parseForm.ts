type formType = {
    type: string
    label: string
    subtype?: string
    name: string
    row: number
    col: number
    options?: Array<{ label: string, value: string }>
}

type groupedType = {
    [key: number]: Array<formType>
}

export const parseForm = (form: formType[]) =>
{
    const grouped: groupedType = {}

    for(let i = 0; i < form.length; i++)
    {
        const row = form[i].row

        grouped[row] = []
    }

    const keys = Object.keys(grouped)

    for(let i = 0; i < keys.length; i++)
    {
        for(let j = 0; j < form.length; j++)
        {
            if(form[j].row === Number(keys[i]))
            {
                grouped[Number(keys[i])].push(form[j])
            }            
        }
    }

    const newForm = Object.keys(grouped).map((item) => grouped[Number(item)])

    return newForm
}