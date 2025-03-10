"use client"
import { formDataType } from '@/types/formDataType';
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

interface appContextType {
  data: formDataType
  clear: boolean
  setData: React.Dispatch<React.SetStateAction<formDataType>>
  setClear: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultProvider: appContextType = {
  data: {mortgageAmount: "", mortgageTerm: "", interestRate: "", mortgageType: ""},
  setData: () => {},
  clear: false,
  setClear: () => {}
}

const AppContext = createContext<appContextType>(defaultProvider)

const AppProvider = ({ children }: Props) =>
{
    const [data, setData] = useState<formDataType>(defaultProvider.data)
    const [clear, setClear] = useState<boolean>(defaultProvider.clear)

    const values = {
        data,
        setData,
        clear,
        setClear
    }

    return (<AppContext.Provider value={values}>{children}</AppContext.Provider>)
}

export { AppContext, AppProvider };