import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function Cotizar({ onSave }) {
  const [cliente, setCliente] = useState({
    ruc: "", razonSocial: "", direccion: "", telefono: "", contacto: "", correo: ""
  });

  const [productos, setProductos] = useState([
    { codigo: "", descripcion: "", cantidad: 1, precio: 0 }
  ]);

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...productos];
    nuevos[index][field] = field === "precio" || field === "cantidad" ? Number(value) : value;
    setProductos(nuevos);
  };

  const agregarProducto = () => {
    setProductos([...productos, { codigo: "", descripcion: "", cantidad: 1, precio: 0 }]);
  };

  const guardar = () => {
    const validoCliente = cliente.ruc && cliente.razonSocial && cliente.direccion;
    const productosValidos = productos.every(p => p.codigo && p.descripcion && p.precio > 0 && p.cantidad > 0);
    if (!validoCliente || !productosValidos) {
      alert("Completa correctamente los datos del cliente y productos.");
      return;
    }
    onSave({ cliente, productos });
    setCliente({ ruc: "", razonSocial: "", direccion: "", telefono: "", contacto: "", correo: "" });
    setProductos([{ codigo: "", descripcion: "", cantidad: 1, precio: 0 }]);
    alert("Cotización guardada correctamente");
  };

  return (
    <Paper className="p-4 mt-4">
      <Typography variant="h6">Datos del Cliente</Typography>
      {Object.keys(cliente).map((key) => (
        <TextField
          key={key}
          label={key.toUpperCase()}
          value={cliente[key]}
          onChange={(e) => setCliente({ ...cliente, [key]: e.target.value })}
          fullWidth
          margin="dense"
        />
      ))}
      <Typography variant="h6" className="mt-4">Productos</Typography>
      {productos.map((prod, i) => (
        <div key={i} className="border p-2 mb-2">
          <TextField label="Código" value={prod.codigo} onChange={(e) => handleProductoChange(i, "codigo", e.target.value)} margin="dense" />
          <TextField label="Descripción" value={prod.descripcion} onChange={(e) => handleProductoChange(i, "descripcion", e.target.value)} margin="dense" fullWidth />
          <TextField label="Cantidad" type="number" value={prod.cantidad} onChange={(e) => handleProductoChange(i, "cantidad", e.target.value)} margin="dense" />
          <TextField label="Precio" type="number" value={prod.precio} onChange={(e) => handleProductoChange(i, "precio", e.target.value)} margin="dense" />
        </div>
      ))}
      <Button onClick={agregarProducto} variant="outlined" className="mb-2">+ Agregar Producto</Button>
      <Button onClick={guardar} variant="contained" color="primary">Guardar Cotización</Button>
    </Paper>
  );
}