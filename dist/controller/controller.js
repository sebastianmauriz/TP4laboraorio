"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpleado = exports.updateEmpleado = exports.crearEmpleado = exports.getEmpleadoXId = exports.getEmpleados = void 0;
const conexiondb_1 = require("../conexiondb");
const getEmpleados = (request, response) => new Promise((resolve, reject) => {
    conexiondb_1.conexion.getConnection((err, connection) => {
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
const crearEmpleado = (request, response) => new Promise((resolve, reject) => {
    const { id, apellido, nombre, dni, sector, fecha, activo } = request.body;
    var valor = [id, apellido, nombre, dni, sector, fecha, activo];
    conexiondb_1.conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO empleado (id,apellido, nombre, dni, sector, fecha, activo) VALUES (?,?,?,?,?,?,?)';
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
exports.crearEmpleado = crearEmpleado;
const updateEmpleado = (request, response) => new Promise((resolve, reject) => {
    //const idEmpleado = parseInt(request.params.id);
    const { id, apellido, nombre, dni, sector, fecha, activo } = request.body;
    var valor = [apellido, nombre, dni, sector, fecha, activo, id];
    conexiondb_1.conexion.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado  SET  apellido=?, nombre=?, dni=?, sector=?, fecha =?, activo =? WHERE id =? ';
            connection.query(sql, valor, (err, resultado) => {
                if (err) {
                    console.error(err);
                    response.json({ message: 'ERROR!!, no se puede actualizar El empleado' });
                }
                else {
                    response.json({ message: 'Empleado actualizado correctamente!!' });
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
