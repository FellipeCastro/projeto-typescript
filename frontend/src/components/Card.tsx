import React from "react"
import { customerProps } from "../Types"
import { FiTrash, FiEdit } from "react-icons/fi"

interface CardProps {
    customer: customerProps
    handleEdit: (id: string) => void
    handleDelete: (id: string) => void
}

const Card: React.FC<CardProps> = ({ customer, handleEdit, handleDelete }) => {
    return (
        <div key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
            <p><span className="font-medium">Nome:</span> {customer.name}</p>
            <p><span className="font-medium">E-mail:</span> {customer.email}</p>
            <p><span className="font-medium">Status:</span> {customer.status ? "Ativo" : "Inativo"}</p>

            <button className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-6 -top-2 hover:bg-blue-400" onClick={() => handleEdit(customer.id)}>
            <FiEdit size={18} color="#fff" />
            </button>
            <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-2 -top-2 hover:bg-red-400" onClick={() => handleDelete(customer.id)}>
            <FiTrash size={18} color="#fff" />
            </button>
        </div>        
    )
}

export default Card
