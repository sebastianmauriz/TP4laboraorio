"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpleado = exports.updateEmpleado = exports.getCrearEmpleado = exports.getEmpleadoXId = exports.getEmpleados = void 0;
const conexiondb_1 = require("../conexiondb");
const getEmpleados = (request, response) => new Promise((resolve, reject) => {
    conexiondb_1.conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        console.log('conexion MySql: ', connection.threadId);
        connection.query('SELECT * FROM empleado', (err, resultado) => {
            if (err) {
                console.error(err);
            }
            response.send(resultado);
        });
    });
});
exports.getEmpleados = getEmpleados;
const getEmpleadoXId = (request, response) => new Promise((resolve, reject) => {
    const idEmpleado = parseInt(request.params.id);
    conexiondb_1.conexion.getConnection((err, connection) => {
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
exports.getEmpleadoXId = getEmpleadoXId;
const getCrearEmpleado = (request, response) => new Promise((resolve, reject) => {
    const { nombre, apellido, puesto } = request.body;
    var valor = [nombre, apellido, puesto];
    conexiondb_1.conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO persona (nombre, apellido, puesto) VALUES (?,?,?)';
            connection.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error(err);
                    response.json({ message: 'ERROR!!, no se puede crear un empleado' });
                }
                else {
                    response.json({ message: 'Empledo creado correctamente!!' });
                }
            });
        }
    });
});
exports.getCrearEmpleado = getCrearEmpleado;
const updateEmpleado = (request, response) => new Promise((resolve, reject) => {
    const { nombre, apellido, puesto } = request.body;
    var valor = [nombre, apellido, puesto];
    conexiondb_1.conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado  SET nombre=?, apellido=?, puesto =? WHERE id =? ';
            connection.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error(err);
                    response.json({ message: 'ERROR!!, no se puede actualizar El empleado' });
                }
                else {
                    response.json({ message: 'Empleado actualizada correctamente!!' });
                }
            });
        }
    });
});
exports.updateEmpleado = updateEmpleado;
const eliminarEmpleado = (request, response) => new Promise((resolve, reject) => {
    const idEmpleado = parseInt(request.params.id);
    conexiondb_1.conexion.getConnection((err, connection) => {
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
                response.json({ message: 'El empleado fue eliminado correctamente' });
            }
        });
    });
});
exports.eliminarEmpleado = eliminarEmpleado;
