import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

export default function Estadisticas({ cotizaciones }) {
  const total = cotizaciones.length;
  const aceptadas = cotizaciones.filter((c) => c.estado === "Aceptada");
  const pendientes = cotizaciones.filter((c) => c.estado === "Pendiente");
  const totalSoles = cotizaciones.reduce(
    (sum, c) => sum + c.productos.reduce((t, p) => t + p.precio * p.cantidad, 0), 0
  );
  const totalAceptadas = aceptadas.reduce(
    (sum, c) => sum + c.productos.reduce((t, p) => t + p.precio * p.cantidad, 0), 0
  );

  return (
    <Paper className="p-4 mt-4">
      <Typography variant="h6">Resumen de Cotizaciones</Typography>
      <Grid container spacing={2} className="mt-2">
        <Grid item xs={4}>
          <Typography variant="subtitle2">Totales</Typography>
          <Typography>{total}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Aceptadas</Typography>
          <Typography color="green">{aceptadas.length}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">Pendientes</Typography>
          <Typography color="orange">{pendientes.length}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={6}>
          <Typography variant="subtitle2">Monto Total Cotizado</Typography>
          <Typography variant="h6">S/ {totalSoles.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Monto Aceptado</Typography>
          <Typography variant="h6" color="green">
            S/ {totalAceptadas.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}