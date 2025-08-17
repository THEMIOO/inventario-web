"use client"

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
      confirmButtonColor: "#10b981", // Verde (secondary color)
      cancelButtonColor: "#6b7280", // Gris
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

        // Handle image file if present
        if (data.foto && data.foto[0]) {
          
          formData.append("foto", data.foto[0])
        }

        await createItem(formData)

        // Success message
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
        // Error message
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
      <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-heading font-black text-foreground">CREAR PRODUCTO</h1>
          <p className="text-lg text-muted-foreground font-medium">Agrega un nuevo producto al inventario</p>
        </div>

        <ItemForm onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  )
}
