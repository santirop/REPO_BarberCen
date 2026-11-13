
USE barberCen;

ALTER TABLE Turno
ADD CONSTRAINT fk_turno_cliente
FOREIGN KEY (id_cliente)
REFERENCES Cliente(id_cliente);

ALTER TABLE Turno
ADD CONSTRAINT fk_turno_barbero
FOREIGN KEY (id_barbero)
REFERENCES Barbero(id_barbero);

ALTER TABLE Turno
ADD CONSTRAINT fk_turno_servicio
FOREIGN KEY (id_servicio)
REFERENCES Servicio(id_servicio);
