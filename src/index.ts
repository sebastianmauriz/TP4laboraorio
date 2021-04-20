
import express from "express";
import { getEmpleados } from "./controller/controller";
import routes from './routes';

//import crear from "./view/crear";
const app= express();
//const hbs = require('handlebars');
import hbs from "handlebars";

//transforma los objetos a json
app.use(express.json());
//transformar los datos de un formulario html a objetos json 
app.use(express.urlencoded({extended: false}));
//app.set('view engine','pug');
// app.get('/test', (request, response)=>{
//     response.send('hola mundo');
    
// });
//app.get('/empleados', getEmpleados);
    


 app.get('/test', (request, response)=>{
     response.send('hola mundo');
    
 });
//configuro el motor de plantillas
// app.engine('.hbs', hbs({
//     defaultLayout:'default',
//     extname:'.hbs'
// }))
//app.engine('edicion', require('hbs').renderFile);
//lo seteo
//app.set('view engine', '.hbs')


// app.get('/prueba',(req,res)=>{
//     res.render('edicion')
// })
app.use(routes);
app.listen(3000, ()=> console.log("Servidor en puerto 3000", 3000));



