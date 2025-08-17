

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemForm from "../components/ItemForm"
import { createItem } from "../api/items"
import Swal from "sweetalert2"

export default function ItemCreate() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    

    const result = await Swal.fire({
      title: "¿Crear producto?",
      text: `¿Deseas crear el producto "${data.nombre}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280", 
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      focusCancel: true,
    })

    if (result.isConfirmed) {
      setSubmitting(true)
      try {
        
        const formData = new FormData()
        formData.append("codigo", data.codigo)
        formData.append("nombre", data.nombre)
        formData.append("descripcion", data.descripcion || "")
        formData.append("cantidad", data.cantidad.toString())
        formData.append("precio", data.precio.toString())

        
        if (data.foto && data.foto[0]) {
          
          formData.append("foto", data.foto[0])
        }

        await createItem(formData)

        
        await Swal.fire({
          title: "¡Producto creado!",
          text: `"${data.nombre}" ha sido creado exitosamente.`,
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 2000,
          showConfirmButton: false,
        })

        
        navigate("/")
      } catch (error) {
        console.log(" Error creating item:", error)
        
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el producto. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonColor: "#10b981",
        })
      } finally {
        setSubmitting(false)
      }
    }
  }

  return (
    <div className="space-y-8">

        <ItemForm onSubmit={handleSubmit} submitting={submitting} />

    </div>
  )
}
