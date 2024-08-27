import React from "react"
import { ButtonDeleteCar } from "./ButtonDeleteCar"

interface IModalTestProps {
    children: React.ReactNode
}

export const ModalTest = ({ children }: IModalTestProps) => {
    return (


        <div className="div_background_modal">
            {children}
        </div>

    )
}