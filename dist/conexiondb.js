"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexion = void 0;
const mysql_1 = require("mysql");
exports.conexion = mysql_1.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados',
    connectionLimit: 120
});
