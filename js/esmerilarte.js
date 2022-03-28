

window.onload = function(){ mostrarInterfazMetroLineal(); metroLineal(); verificar_boton() }

function mostrarValores( ){ 
    if( !cambiar_a_m2 ){
        metroLineal();
    } else {
        metroCuadrado();
    }
}
/* ---------------------- SWITCH  -------------------------- */
var cambiar_a_m2 = false;
var tipo_medida = "";
var material_seleccionado = "";

function cambiarM2(){
    cambiar_a_m2 = !cambiar_a_m2;
    cambiarInterfaz();
}

function cambiarInterfaz(){
    

    if( !cambiar_a_m2 ){
        borrarElementosAgregados();
        mostrarInterfazMetroLineal();
        metroLineal();
        
    } else {
        mostrarInterfazMetroCuadrado();
        metroCuadrado();
    }
}

function mostrarInterfazMetroLineal(){
    tipo_medida = "Metro Lineal";
    material_seleccionado = "Vinilo Esmerilado"
    
    let interfaz = '<div class="row"><div class="col-12" style="font-size: 6px;">\
                        <h6><span id="vinilo" class="badge badge-light text-dark">Vinilo recomendado: <span class="text-primary">60cm</span></span> </h6>\
                        <blockquote class="blockquote">\
                            <h2 id="precio" value="">$</h2>\
                            <footer class="blockquote-footer" id="metro_l" >Ocupas <cite title="Source Title">0.00 metros lineales</cite></footer>\
                        </blockquote>\
                    </div></div>';

    document.getElementById('text-ml').innerHTML = '<h5><span id="unidad_medida" class="badge badge-secondary"><b>metro lineal</b></span> </h5>';
    document.getElementById('text-m2').innerHTML = "";
    document.getElementById('interfaces').innerHTML = interfaz;
    
}
function mostrarInterfazMetroCuadrado(){
    
    let div_padre = document.getElementById('inputs');
    let div_anterior = document.getElementById('interfaces');

    //Creamos y le damos atributos al nuevo <div>
    let new_div = document.createElement("div");
    new_div.id = 'contenedor_selected';
    new_div.setAttribute( "class", "col-12 p-0 mb-3");
    
    //Creamos y le damos atributos al nuevo <select>
    let new_select = document.createElement("select");
    new_select.id = "productos";
    new_select.setAttribute("onchange", "mostrarValores()");
    new_select.setAttribute("class", "js-example-basic-single")
    new_select.setAttribute("name", "state")
    new_select.style.width = '100%';

    //Creamos y le damos atributos al los <option>
    for( i in lista_materiales ){
        let new_option = document.createElement("option"); //Creamos elemento option
        new_option.setAttribute("value", i ); //Le agregamos un value al elemento option

        let add_text = document.createTextNode( lista_materiales[i][0] ); // Creamos el texto que va en el option

        new_option.appendChild( add_text ); //Agregamos el texto al option
        new_select.appendChild( new_option  ); //Agregamos el option al select
    }

    new_div.appendChild( new_select ); //Agregamos el select al div
    div_padre.insertBefore( new_div, div_anterior ) // Agregamos el nuevo div antes del div del input ANCHO

    
    $('.js-example-basic-single').select2();//Iniciamos select2


    /*---- interfaz parte inferior ---- */
    let interfaz = `<div class="row"><div class="col-12" style="font-size: 6px;">\
                        <blockquote class="blockquote">\
                            <h2 id="precio">$</h2>\
                            <footer class="blockquote-footer">Ocupas <cite id="metro_2" title="Source Title">0.00 metro&sup2;</cite></footer>\
                        </blockquote>\
                    </div></div>`;

    document.getElementById('text-m2').innerHTML = '<h5><span id="unidad_medida" class="badge badge-secondary"><b>metro&sup2;</b></span> </h5>';
    document.getElementById('text-ml').innerHTML = "";
    document.getElementById('interfaces').innerHTML = interfaz;
}

function borrarElementosAgregados(){
    let div_padre = document.getElementById('inputs');
    let div_borrar = document.getElementById('contenedor_selected');

    div_padre.removeChild( div_borrar );
}
/* ---------------------- FIN SWITCH  -------------------------- */



/* ---------------------- METRO LINEAL -------------------------- */

var precio_metro_lineal = 0.00; //Variable que determina el precio del metro lineal, dependiendo el ancho proporcionado
var precio_final = 0.00; //Variable que determina el precio final dependiendo las medidas proporcionadas
var vinilo_recomendado = ""; //Variable que determina, que vinlo es el recomendado, dependiendo el ancho proporcionado
var largo_minimo = 50; //Variable que determina el largo minimo que se puede comprar
var total_metro_l = 0; //Variable que determina el total de los metros lineales que ocupa, dependiendo el largo proporcionado
var ancho = 5; //Variable que almancena el ancho que ingreso el usuario
var largo = 5;//Variable que almancena el largo que ingreso el usuario

var precio_ml_sescm_proveedor = 235;
var precio_ml_cinveicm_proveedor = 333;
var precio_ml_cincinc_proveedor = 395;
var precio_envio = 500;
var ganancia_multiplicada = 2; 
var colocacion = 600;

function metroLineal(){

    //Obtenemos los valores de los inputs
    ancho = document.getElementById('ancho').value;
    largo = document.getElementById('largo').value;
    //Comparamos datos proporcionados y damos valores a las variables
    if( ancho <= 58 ){
        vinilo_recomendado = `Vinilo recomendado: <span class="text-primary">60cm</span>`;
        precio_metro_lineal = precio_ml_sescm_proveedor*ganancia_multiplicada;
    }
    if( ancho > 58 ){
        vinilo_recomendado = 'Vinilo recomendado: <span class="text-primary">122cm</span>';
        precio_metro_lineal = precio_ml_cinveicm_proveedor*ganancia_multiplicada;
    }
    if( ancho > 120 ){
        vinilo_recomendado = 'Vinilo recomendado: <span class="text-primary">154cm</span>';
        precio_metro_lineal = precio_ml_cincinc_proveedor*ganancia_multiplicada;
    }
    if( ancho > 150 ){
        var cantidad_de_panios = 1;
        let vueltas = 2;

        //Este while me devuelve en cuantos paños debo dividir el vinilo
        do{
            if( ancho/vueltas < 150 ){
                cantidad_de_panios = vueltas;
            }

            vueltas++;
        }
        while( ancho/cantidad_de_panios > 150)
        
        vinilo_recomendado = 'No hay material tan grande';
        precio_metro_lineal = 0.00;

    }

    //Este bucle determina el precio final dependiendo cuantos metros de largo proporciona
    //Y determina el total de los metros lineales ocupados


    let i = 0;
    do{
        i++;
        precio_final = (precio_metro_lineal*i) + colocacion_y_envio( ancho, largo ); // Entonces el precio final será = el precio del metro lineal multiplicado por ( 1, 2, 3 ...)
        total_metro_l = (largo_minimo*i) / 100; // y tambien el total del metro lineal será = al largo largo minimo multiplicado por (1, 2, 3 ...)

        
    }while( largo > ( largo_minimo*i) );
    

    //Mostramos todo en el HTML
    document.getElementById('vinilo').innerHTML = vinilo_recomendado;
    document.getElementById('precio').innerHTML = "$"+precio_final.toFixed(2);
    if( ancho > 150 ){
        document.getElementById('metro_l').innerHTML = `Divide el vinilo en ${cantidad_de_panios} paños de ${(ancho/cantidad_de_panios).toFixed(2)}cm`;
    } else {
        document.getElementById('metro_l').innerHTML = "Ocupas "+(total_metro_l).toFixed(2) + ((total_metro_l).toFixed(2) == 1.00 ? " metro lineal":" metros lineales");
    }
    

}
/* ---------------------- FIN METRO LINEAL -------------------------- */

/* ----------------------S SUELTOS -------------------------- */

function colocacion_y_envio( ancho, largo ){
    return ((ancho/100)*(largo/100)*colocacion) + precio_envio;
}

function sumar(){
    let suma = 0;
    for( i in lista_panios ){
        suma += lista_panios[i][1];
    }
    
    total = suma;
    
    return total;
    
}

function notificacion( mensaje, tipo ){ // 0 = error, 1 = success
    if( !tipo ){
        document.getElementById("notificacion").innerHTML = `<span class='text-danger'>${mensaje}</span>`;
    } else {
        document.getElementById("notificacion").innerHTML = `<span class='text-success'>${mensaje}</span>`;
    }
    
    setTimeout( function(){
        document.getElementById("notificacion").innerHTML = "";
    }, 2000);
    
}


/* ----------------------S SUELTOS -------------------------- */




/* ---------------------- METRO CUADRADO -------------------------- */
const ident = {
    MATERIAL : 0,
    PRECIO_PROV : 1
    
}

var lista_materiales = [
    ["Vinilo Brillante", 23.00 ],
    ["Vinilo Micro", 500.00 ]
];

function metroCuadrado(){
    tipo_medida = "Metro&sup2";
    
    ancho = document.getElementById('ancho').value;
    largo = document.getElementById('largo').value;
    let id_material = $('#productos').select2('val');
    
    

    material_seleccionado = lista_materiales[ id_material ][ ident.MATERIAL ];
    let precio_material_m2 = lista_materiales[ id_material ][ ident.PRECIO_PROV ];
    
    
    precio_final = (((ancho/100)*(largo/100)*precio_material_m2)*ganancia_multiplicada) + colocacion_y_envio( ancho, largo) ;
    let m2_utilizado = (ancho/100 * largo/100).toFixed(3);
    
    document.getElementById( "precio" ).innerHTML = "$"+precio_final.toFixed(2);
    document.getElementById( "metro_2" ).innerHTML = m2_utilizado + " m&sup2";
    
}
/* ---------------------- FIN METRO CUADRADO -------------------------- */


/* ---------------------- BOTON AGREGAR -------------------------- */
var lista_panios = [];
var total = 0;
function btn_add_panio(){
    if( ancho <= 0 && largo <= 0){
        notificacion("Debes proporcionar un valor", 0)
        
    } else {
        notificacion("Agregado con éxito", 1);
        lista_panios.push( [`${ancho}x${largo}cm`, precio_final, tipo_medida, material_seleccionado] );
        parseFloat( precio_metro_lineal );
        verificar_boton();
        addPaniosATabla();
    }

    
}

function addPaniosATabla(){
    let crear_tabla = '';
    let td_total = `
        <tr>
            <th scope="row">Total: </th>
            <td colspan="5" id="total">$0.0</td>
        </tr>
    `;
    for( let i = 0; i < lista_panios.length ;i++ ){
        let btn = `
            <button class="btn btn-danger btn-sm" type="Button" onclick="btn_eliminar(${i})")>
                X
            </button>
        `;
        crear_tabla += `
                <tr>
                    <th scope="row">${(parseInt(i+1))}</th>
                    <td>${lista_panios[i][0]}</td>
                    <td>$${lista_panios[i][1].toFixed(2)}</td>
                    <td>${lista_panios[i][2]}</td>
                    <td>${lista_panios[i][3]}</td>
                    <td>${btn}</td>
                </tr>
                `;
    }

    total = sumar();
    document.getElementById('info_panios').innerHTML = crear_tabla + td_total;
    document.getElementById('total').innerHTML = "$"+total.toFixed(2);
}
/* ----------------------  FIN BOTON AGREGAR -------------------------- */

/* ---------------------- BOTON ELIMINAR -------------------------- */

function btn_eliminar( id ){
    lista_panios.splice( id, 1 );
    
    total = sumar();
    addPaniosATabla();
    verificar_boton();
    
}

/* ---------------------- BOTON PRESUPUESTO -------------------------- */

function verificar_boton(){
    let btn = document.getElementById('presupuesto');
    
    if( lista_panios.length <= 0 ){
        btn.setAttribute('disabled', '');
    } else {
        btn.removeAttribute('disabled', '');
    }
}
/* ---------------------- FIN BOTON PRESUPUESTO -------------------------- */

/* ---------------------- PDF jspdf.js -------------------------- */
var nombre;

function btn_ver_presupuesto(){
    nombre = document.getElementById('nombre').value;
    crearPDF();

}


function crearPDF(){
    let pdf = new jsPDF();
    let image = img;
    
    pdf.setFont("helvetica", "bold");
    pdf.setDrawColor(245, 222, 77); // draw red lines
    
    pdf.setTextColor(245, 222, 77);
    pdf.addImage( image, "JPEG", 120, 20, 90, 30 );
    pdf.setFontSize(22);
    pdf.text( "Presupuesto", 30, 25);
    
    pdf.setLineWidth(1);
    pdf.line(10, 30, 100, 30);
    
    pdf.setTextColor(100);
    
    let date = new Date();
    let date_expira = new Date();
    let iMes = date.getMonth();
    
    let sFecha = date.toLocaleDateString();
    let sHora = date.toLocaleTimeString()
    
    let expira_fecha = date_expira.setMonth( iMes + 1);
    let sFechaExpira = date_expira.toLocaleDateString();
    
    pdf.setFontSize(11);
    pdf.text( 10, 40, `Generado el: ${sFecha} a las ${sHora}` );
    pdf.text( 10, 45, `Expira el: ${sFechaExpira}` );
    
    let header = [
        ['Paño', 'Medida', 'Tipo','Material','Colocación', 'Valor']
    ]
    
    let cuerpo = [];
    
    for( let i = 0; i < lista_panios.length ;i++ ){
        let panio = parseInt( i +1 );
        cuerpo.push( [ panio, lista_panios[i][0], lista_panios[i][2], lista_panios[i][3],'Incluida', "$"+lista_panios[i][1].toFixed(2)  ]);
        
        if( i == lista_panios.length - 1 ){
            cuerpo.push( [] );
            cuerpo.push( ["","","","", "Total:", "$"+total.toFixed(2)] );
        }
        
    }
    
    
    
    pdf.autoTable({
        theme: 'plain',
        headStyles: { halign: 'center'}, // Cells in first column centered and green
        bodyStyles: { halign: 'center'},
        margin: {top: 70},
        head:header, 
        body:cuerpo
    });
    
    pdf.save(`Presupuesto para ${nombre}.pdf`);
    
}
/* ---------------------- FIN PDF jspdf.js -------------------------- */