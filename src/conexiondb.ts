import {createPool} from 'mysql'

export const conexion = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados',
    connectionLimit:120
});