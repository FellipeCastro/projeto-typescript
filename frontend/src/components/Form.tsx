import React, { FormEvent, RefObject } from "react"

interface FormProps {
    handleSubmit: (e: FormEvent) => void
    nameRef: RefObject<HTMLInputElement>
    emailRef: RefObject<HTMLInputElement>
    customerId: string
}

const Form: React.FC<FormProps> = ({ handleSubmit, nameRef, emailRef, customerId }) => {
    return (
        <form className="flex flex-col my-6" autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-medium text-white">Nome:</label>
            <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Digite seu nome completo" 
                className="w-full mb-5 p-2 rounded" 
                ref={nameRef} 
            />

            <label htmlFor="email" className="font-medium text-white">E-mail:</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Digite seu e-mail" 
                className="w-full mb-5 p-2 rounded" 
                ref={emailRef} 
            />

            <button type="submit" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium hover:bg-green-400" >
                {customerId ? "Editar" : "Cadastrar"}
            </button>
        </form>
    )
}

export default Form
