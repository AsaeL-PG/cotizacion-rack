import React, { useState } from "react";
import {
  Paper, Typography, List, ListItem, ListItemText,
  IconButton, Menu, MenuItem, Divider, Chip
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Historial({ cotizaciones, onUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const marcar = (estado) => {
    const actualizadas = cotizaciones.map((c) =>
      c.id === selectedId ? { ...c, estado } : c
    );
    onUpdate(actualizadas);
    handleMenuClose();
  };

  const eliminar = () => {
    const filtradas = cotizaciones.filter((c) => c.id !== selectedId);
    onUpdate(filtradas);
    handleMenuClose();
  };

  return (
    <Paper className="p-4 mt-4">
      <Typography variant="h6">Historial de Cotizaciones</Typography>
      <List>
        {cotizaciones.map((cot) => (
          <div key={cot.id}>
            <ListItem
              secondaryAction={
                <IconButton onClick={(e) => handleMenuOpen(e, cot.id)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${cot.cliente.razonSocial} (S/ ${cot.productos.reduce(
                  (t, p) => t + p.precio * p.cantidad, 0
                ).toFixed(2)})`}
                secondary={
                  <>
                    <span>{new Date(cot.fecha).toLocaleDateString()}</span>
                    <Chip
                      label={cot.estado}
                      color={cot.estado === "Aceptada" ? "success" : "warning"}
                      size="small"
                      className="ml-2"
                    />
                  </>
                }
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => marcar("Aceptada")}>Marcar como Aceptada</MenuItem>
        <MenuItem onClick={() => marcar("Pendiente")}>Marcar como Pendiente</MenuItem>
        <MenuItem onClick={eliminar}>Eliminar</MenuItem>
      </Menu>
    </Paper>
  );
}