import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [valor, setValor] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (valor.trim().length > 0) {
      socket.emit("crear-banda", { nombreBanda: valor });
      setValor("");
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre banda"
          value={valor}
          onChange={(ev) => setValor(ev.target.value)}
        />
      </form>
    </>
  );
};
