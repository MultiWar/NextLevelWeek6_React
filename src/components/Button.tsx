import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonType?: 'outlined' | 'danger' | 'grey'
}

export const Button = ({ buttonType = undefined, ...props }: ButtonProps) => {
    return (
        <button className={`button ${buttonType}`} {...props}>

        </button>
    )
}