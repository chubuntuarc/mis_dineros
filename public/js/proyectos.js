$(document).ready(function(){
  inicializar();
  $('#module-form').hide();
  $('#editardata').hide();
  $('.loader-back').hide();
  $('.message').hide();
})

var proyectos
var elementoEditar

function inicializar(){
  proyectos = firebase.database().ref().child('proyectos');
  leerDatos();
}

function enviarDatos(){
  var cliente = $('#cliente').val();
  var fuente = $('#fuente').val();
  var inicio = $('#inicio').val();
  var presupuesto = $('#presupuesto').val();
  var horas = $('#horas').val();
  var deadline = $('#deadline').val();
  var costo_real = $('#costo_real').val();
  var horas_reales = $('#horas_reales').val();
  var ganancia = $('#ganancia').val();
  var entrega = $('#entrega').val();
  var estado = $('#estado').val();
  var notas = $('#notas').val();
  proyectos.push({
    cliente: cliente,
    costo_real: costo_real,
    deadline : deadline,
    entrega : entrega,
    estado : estado,
    fuente : fuente,
    ganancia : ganancia,
    horas : horas,
    horas_reales : horas_reales,
    inicio : inicio,
    notas : notas,
    presupuesto : presupuesto
  });  
  $('#module-form').hide();
  $('#nuevo-proyecto').show();
  M.toast({html: 'Guardado!', classes: 'rounded'});
  leerDatos();
}

function editarDatos(){
  var cliente = $('#cliente').val();
  var fuente = $('#fuente').val();
  var inicio = $('#inicio').val();
  var presupuesto = $('#presupuesto').val();
  var horas = $('#horas').val();
  var deadline = $('#deadline').val();
  var costo_real = $('#costo_real').val();
  var horas_reales = $('#horas_reales').val();
  var ganancia = $('#ganancia').val();
  var entrega = $('#entrega').val();
  var estado = $('#estado').val();
  var notas = $('#notas').val();
  elementoEditar.update({
    cliente: cliente,
    costo_real: costo_real,
    deadline : deadline,
    entrega : entrega,
    estado : estado,
    fuente : fuente,
    ganancia : ganancia,
    horas : horas,
    horas_reales : horas_reales,
    inicio : inicio,
    notas : notas,
    presupuesto : presupuesto
    });
  $('#module-form').hide();
  $('#nuevo-proyecto').show();
  M.toast({html: 'Actualizado!', classes: 'rounded'});
  $('input').val('');
  $('#enviardata').show();
  $('#editardata').hide();
  leerDatos();
}

function leerDatos(){
  $("#proyectos-rows > tr").remove();
  proyectos.on('value',function(snap){
    var datos = snap.val();
    var nuevaFila = '';
    for(var key in datos){
      if(datos[key].estado != 'Terminado'){
        nuevaFila+='<tr>';
          nuevaFila+='<td>'+datos[key].deadline+'</td>';
          nuevaFila+='<td>'+datos[key].cliente+'</td>';
          nuevaFila+='<td>'+datos[key].fuente+'</td>';
          nuevaFila+='<td>'+datos[key].inicio+'</td>';
          nuevaFila+='<td>$'+number_format(datos[key].presupuesto,2)+'</td>';
          nuevaFila+='<td>'+datos[key].horas+'</td>';
          nuevaFila+='<td>$'+number_format(datos[key].costo_real,2)+'</td>';
          nuevaFila+='<td>'+datos[key].horas_reales+'</td>';
          nuevaFila+='<td>'+datos[key].estado+'</td>';
          nuevaFila+='<td><a href="#!" onclick="editar(\''+key+'\');"><i class="material-icons">edit</i></a></td>';
          nuevaFila+='<td><a class="red-text text-lighten-3" href="#!" onclick="borrar(\''+key+'\');"><i class="tiny material-icons">clear</i></a></td>';
          nuevaFila+='</tr>'; 
      }
    }
    $("#proyectos-rows").append(nuevaFila);
    leerDatosTerminados();
  })
}

function leerDatosTerminados(){
  $("#terminados-rows > tr").remove();
  proyectos.on('value',function(snap){
    var datos = snap.val();
    var nuevaFila = '';
    for(var key in datos){
      if(datos[key].estado == 'Terminado'){
        nuevaFila+='<tr>';
          nuevaFila+='<td>'+datos[key].deadline+'</td>';
          nuevaFila+='<td>'+datos[key].cliente+'</td>';
          nuevaFila+='<td>'+datos[key].fuente+'</td>';
          nuevaFila+='<td>'+datos[key].inicio+'</td>';
          nuevaFila+='<td>$'+number_format(datos[key].presupuesto,2)+'</td>';
          nuevaFila+='<td>'+datos[key].horas+'</td>';
          nuevaFila+='<td>$'+number_format(datos[key].costo_real,2)+'</td>';
          nuevaFila+='<td>'+datos[key].horas_reales+'</td>';
          nuevaFila+='<td>'+datos[key].estado+'</td>';
          nuevaFila+='</tr>'; 
      }
    }
    $("#terminados-rows").append(nuevaFila);
    datatable();
  })
}

function borrar(key){
  var checkstr =  confirm('Deseas eliminar el proyecto?');
    if(checkstr === true){
      var elementoABorrar = proyectos.child(key);
      elementoABorrar.remove();
    }else{
    return false;
    }
}

function editar(key){
  $('#module-form').show();
  $('#nuevo-proyecto').hide();
  var elementoAEditar = proyectos.child(key);
  elementoAEditar.once('value', function(snap){
    var datos = snap.val();
    elementoEditar = elementoAEditar;
    $('#cliente').val(datos.cliente);
    $('#fuente').val(datos.fuente);
    $('#inicio').val(datos.inicio);
    $('#presupuesto').val(datos.presupuesto);
    $('#horas').val(datos.horas);
    $('#deadline').val(datos.deadline);
    $('#costo_real').val(datos.costo_real);
    $('#horas_reales').val(datos.horas_reales);
    $('#ganancia').val(datos.ganancia);
    $('#entrega').val(datos.entrega);
    $('#estado').val(datos.estado);
    $('#notas').val(datos.notas);
  });
  $('#enviardata').hide();
  M.updateTextFields();
  $('#editardata').show();
}

//Check offline
setInterval(function() {
    if(!navigator.onLine)
{
  $('.message').show();
  $('.message').text('Modo sin conexión | Revisa tu conectividad');
  $('.message').css('background-color', '#f44336');
}else{
  $('.message').hide();
}
  }, 5000)
  
  function datatable(){
  $('.table').DataTable({
    retrieve: true,
      "language": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
    });
  $("select").val('10');
  //$('select').addClass("browser-default");
  $('select').formSelect();
}


//Convertir a moneda
function number_format(amount, decimals) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
    decimals = decimals || 0; // por si la variable no fue fue pasada
    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);
    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
}