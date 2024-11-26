'use strict'
//se enlazan con el block y blockchain
const Block = require('./block.js');
const BlockChain = require('./blockchain.js');

//se agrega la conexion con el html
let http = require('http').createServer(webServer),
	form = require('fs').readFileSync('carnes.html'),
	querystring = require('querystring'),
	util = require('util'),
	dataString = '';
    const { inspect } = require('util');

let contador=0,guia=[];
let comprobacion=0;
let str2='';
let codigocarne = [];//aqui se guarda el codigo en la variable 
//funcion servidor web
function webServer(req, res)
{
    //Los métodos GET y POST se utilizan para enviar los datos al servidor
	if(req.method  == 'GET')
	{
		res.writeHead(200, {'Content-Type' : 'text/html'})
		res.end(form)
	}

	if(req.method == 'POST')
	{
		req.on('data', function (data){
				dataString += data
			})
			req.on('end', function (){
               
				let dataObject = Object.create(null);
                dataObject= JSON.stringify(dataString);
                let dataJSON = util.inspect(dataObject);
				let templateString = dataString;
                
                   
                    function splitStr(str) {                        
                        let string = str.split(/=|&/);                          
                        str='';
                        return string;
                    }
                    // se inicializa string para crear la cadena
                    let str = dataString;  
                        // Function call permite asignar y ser llamada                      
                        str2=splitStr(str); 
                        let a = new Block({ str2 });
                        // se crea el primer bloque genesis
                        let chain = new BlockChain();
                        if(contador==0)//contador de los bloques
                        {
                            chain.addNewBlock(a);//añadir un nuevo bloque
                            guia.push('<tr><td> Lote: '+str2[3]+' Cod.Prod: '+str2[1]+' Sede: '+str2[5]+' Fecha: '+str2[7]+' Info: '+str2[9]+'</td><td>'+JSON.stringify(chain.obtainLatestBlock().hash)+'</td></tr>');                            
                            codigocarne.push(str2[1]);// se guarda el codigo en la variable codigocarne
                            
                        }
                        //se agrega la funcion if con el contador
                        if(contador>=1)
                        {
                            chain.addNewBlock(a);// añade un nuevo bloque con los campos escritos
                                                        
                            if(codigocarne.includes(str2[1]))
                            {
                                console.log(codigocarne.indexOf(str2[1]))
                                guia[codigocarne.indexOf(str2[1])]=guia[codigocarne.indexOf(str2[1])]+'<tr bgcolor= "#98a6a6" border="2"><td> Fecha: '+str2[15]+'Distribuidor: '+str2[13]+' Prod. Vendido: '+JSON.stringify(str2[17])+'</td><td>'+JSON.stringify(chain.obtainLatestBlock().hash)
                                comprobacion=1;
                            }
                            else
                            {                                
                            codigocarne.push(str2[1]);// guardo el codigo en variable codigocarne
                            guia.push('<tr><td> Cod.Prod: '+str2[1]+' Sede: '+str2[3]+'Fecha: '+str2[7]+'Info: '+str2[9]+' </td><td>'+JSON.stringify(chain.obtainLatestBlock().hash)+'</td></tr>');
                            comprobacion=0;
                            }
                        }
                        contador = contador+1; /// aqui va el contador
				
                        

                        // aqui llama el bloque anterior 
                        let c=JSON.stringify(chain.obtainLatestBlock().hash);
                       
                        let d=JSON.stringify(chain.obtainLatestBlock().data);
                       


               function recorrer(){
                   let retorna='';
                for (let i = 0; i < guia.length; i++) {                    
                    //aqui une el bloque en cadena con los demas
                    retorna=retorna+guia[i];
                }
                    
                    return retorna;
               }       
         
               let reco='<tr>'+recorrer()+'</tr>';
             
                if (comprobacion==0)          
				res.end('<table class="default" border="1" WIDTH="80%"><tr><td>GUIA DE SEGUIMIENTO</td><td>HASH</td></tr>'+guia[contador-1]+'</table>Numero de bloques:  '+contador);
                else
                {
                    res.end('<table class="default" border="1" WIDTH="80%"><tr><td>GUIA DE SEGUIMIENTO</td><td>HASH</td></tr>'+guia[codigocarne.indexOf(str2[1])]+'</table>Numero de bloques:  '+contador);
                    comprobacion=1;
                }

			})
            dataString='';
	}
}
// se especifica el servidor localhost en el cual se ejecutara
http.listen(1997)
console.log('Servidor corriendo en http://localhost:1997/')
console.log('str2:', str2); 
console.log('dataString:', dataString);