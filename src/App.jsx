import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Cotizar from "./components/Cotizar";
import Historial from "./components/Historial";
import Estadisticas from "./components/Estadisticas";

export default function App() {
  const [tab, setTab] = useState(0);
  const [cotizaciones, setCotizaciones] = useState([]);

  const guardarCotizacion = (nueva) => {
    setCotizaciones([...cotizaciones, { ...nueva, id: Date.now(), fecha: new Date(), estado: 'Pendiente' }]);
  };

  const actualizarCotizaciones = (listaActualizada) => {
    setCotizaciones(listaActualizada);
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
        <Tab label="Cotizar" />
        <Tab label="Historial" />
        <Tab label="Estadísticas" />
      </Tabs>
      {tab === 0 && <Cotizar onSave={guardarCotizacion} />}
      {tab === 1 && <Historial cotizaciones={cotizaciones} onUpdate={actualizarCotizaciones} />}
      {tab === 2 && <Estadisticas cotizaciones={cotizaciones} />}
    </div>
  );
}