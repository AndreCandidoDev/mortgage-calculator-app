import styles from "./styles.module.scss"

interface optionProps {
    option: { label: string, value: string }
    stateRadio: { [key: string]: boolean }
    setStateRadio: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>> 
}

export const Option: React.FC<optionProps> = ({ 
    option, 
    stateRadio,
    setStateRadio, 
    setSelectedOption
}) =>
{
    const handleChange = () =>
    {        
        const data = stateRadio

        Object.keys(data).forEach((item) => {
            data[item] = false
        })
        
        data[option.value] = true

        setStateRadio({ ...data })

        setSelectedOption(option.value)
    }

    const optionClassName = () =>
    {
        if(stateRadio[option.value])
        {
            return styles.option + " " + styles.optionSelected
        }

        return styles.option
    }

    return (
        <div className={optionClassName()} onClick={() => handleChange()}>
            {Object.keys(stateRadio).length > 0 && (
                <input
                    checked={stateRadio[option.value]} 
                    type="radio" 
                />
            )}
            <p>{option.label}</p>
        </div>
    )
}