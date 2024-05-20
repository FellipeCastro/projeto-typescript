import { useState, useEffect, useRef, FormEvent } from "react"

import { api } from "./services/api"

import { FiTrash } from "react-icons/fi"

interface customerProps{
  id: string
  name: string
  email: string
  status: boolean
  created_at: string
}

export default function App() {
  const [customers, setCustomers] = useState<customerProps[]>([])

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

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    setCustomers(alCustomers => [...alCustomers, response.data])
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

          <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium hover:bg-green-400" />
        </form>

        <section className="flex flex-col gap-4">

          {customers.map((customer) => {
            return (
              <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                <p><span className="font-medium">Nome:</span> {customer.name}</p>
                <p><span className="font-medium">E-mail:</span> {customer.email}</p>
                <p><span className="font-medium">Status:</span> {customer.status ? "Ativo" : "Inativo"}</p>

                <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -right-2 -top-2 hover:bg-red-400">
                  <FiTrash size={18} color="#fff" />
                </button>
              </article>
            )
          })}

        </section>
      </main>
    </div>
  )
}
