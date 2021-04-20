import { Request, Response } from "express";
import { conexion } from '../conexiondb';

export const getEmpleados = (request: Request, response: Response) => new Promise((resolve, reject) => {
    conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        console.log('conexion MySql: ', connection.threadId);
        connection.query('SELECT * FROM Empleado', (err, resultado) => {
            if (err) {
                console.error(err);
            }
            response.send(resultado);
        });
    });
});

export const getEmpleadoXId = (request: Request, response: Response) => new Promise((resolve, reject) => {
    const idEmpleado = parseInt(request.params.id);
    conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        console.log('conexion MySql: ', connection.threadId);
        connection.query('SELECT * FROM empleado WHERE id =?', [idEmpleado], (err, resultado) => {
            if (err) {
                console.error(err);
            }
            response.send(resultado);
        });
    });

});

export const crearEmpleado = (request: Request, response: Response) => new Promise((resolve, reject) => {
    const {id, apellido, nombre, dni, sector, fecha, activo } = request.body;
    var valor = [id,apellido, nombre, dni, sector, fecha, activo];
    conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql: string = 'INSERT INTO empleado (id,apellido, nombre, dni, sector, fecha, activo) VALUES (?,?,?,?,?,?,?)';
            connection.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error(err);
                    response.json({ message: 'ERROR!!, no se puede crear un empleado' })
                }
                else {
                    response.json({ message: 'Empledo creado correctamente!!' })
                }
            });
        }

    });

});


export const updateEmpleado= (request: Request, response: Response) => new Promise((resolve, reject) => {
    //const idEmpleado = parseInt(request.params.id);
    const {id, apellido, nombre, dni, sector, fecha, activo } = request.body;
    var valor = [apellido, nombre, dni, sector, fecha, activo,id];
    conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql: string = 'UPDATE empleado  SET  apellido=?, nombre=?, dni=?, sector=?, fecha =?, activo =? WHERE id =? ';
            connection.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error(err);
                    response.json({ message: 'ERROR!!, no se puede actualizar El empleado' })
                }
                else {
                    response.json({ message: 'Empleado actualizado correctamente!!' })
                }
            });
        }

    });

});

export const eliminarEmpleado = (request: Request, response: Response) => new Promise((resolve, reject) => {
    const idEmpleado = parseInt(request.params.id);
    conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        connection.query('DELETE FROM empleado WHERE id =?', [idEmpleado], (err, resultado) => {
            if (err) {
                console.error(err);
                response.json({ message: 'ERROR!!!  no se peude eliminar El empleado' });
            }
            else {
                response.json({ message: 'El empleado fue eliminado correctamente' })
            }
        });
    });

});

