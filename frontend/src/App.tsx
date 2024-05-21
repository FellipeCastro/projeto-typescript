import { useState, useEffect, useRef, FormEvent } from "react"

import { api } from "./services/api"

import { FiTrash, FiEdit } from "react-icons/fi"

interface customerProps{
  id: string
  name: string
  email: string
  status: boolean
  created_at: string
}

interface CustomerResponse{
  data: customerProps;
}

export default function App() {
  const [customers, setCustomers] = useState<customerProps[]>([])
  const [customerId, setCustomerId] = useState("")

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomer()
  }, [])

  const loadCustomer = async () => {
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!nameRef.current?.value || !emailRef.current?.value) return 

    let response: CustomerResponse

    if (customerId !== "") {      
      response = await api.put(`/customer?id=${customerId}`, {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })

      // Se customer.id for igual a customerId, isso significa que este é o cliente que acabamos de editar, então response.data (os dados atualizados do cliente) será usado.
      // Se customer.id não for igual a customerId, o customer original (sem mudanças) será mantido.
      setCustomers(allCustomers => allCustomers.map(customer => customer.id === customerId ? response.data : customer))
    } else {
      response = await api.post("/customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })
      
      setCustomers(allCustomers => [...allCustomers, response.data])
    }

    setCustomerId("")

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/customer?id=${id}`)

    const allCustomers = customers.filter((customer) => customer.id !== id)
    setCustomers(allCustomers)
  }

  const handleEdit = async (id: string) => {
    const customer = customers.find(customer => customer.id === id)

    if (customer) {
      setCustomerId(id)

      if (nameRef.current) nameRef.current.value = customer.name
      if (emailRef.current) emailRef.current.value = customer.email
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-6">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-medium text-white">Nome:</label>
          <input type="text" name="name" id="name" placeholder="Digite seu nome completo" className="w-full mb-5 p-2 rounded" ref={nameRef} />

          <label htmlFor="email" className="font-medium text-white">E-mail:</label>
          <input type="email" name="email" id="email" placeholder="Digite seu e-mail" className="w-full mb-5 p-2 rounded" ref={emailRef} />

          <button type="submit" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium hover:bg-green-400" >
            {customerId ? "Editar" : "Cadastrar"}
          </button>
        </form>

        <div className="flex flex-col gap-4">

          {customers.map((customer) => {
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
          })}

        </div>
      </main>
    </div>
  )
}
