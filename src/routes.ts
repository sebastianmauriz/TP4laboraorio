import {Router} from 'express';
import {getEmpleados, getCrearEmpleado, getEmpleadoXId,eliminarEmpleado, updateEmpleado} from './controller/controller';

const ruta = Router();

ruta.get('/test', (request, response)=>response.send('Respuesta exitosa'));

ruta.get('/empleados', getEmpleados);
ruta.get('/empleado/:id', getEmpleadoXId);
ruta.get('/insertar', getCrearEmpleado);
ruta.get('/actualizar', updateEmpleado);
ruta.get('/eliminar/:id', eliminarEmpleado);


export default ruta;