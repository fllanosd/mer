function mostrarFormularioModal() {
  var html = HtmlService.createHtmlOutputFromFile('formulario')
      .setWidth(500)
      .setHeight(460);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'INGRESO DATOS CÁLCULO');
}

function agregarDatos(formulario) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.appendRow([formulario.entrada1, formulario.entrada2, formulario.entrada3, formulario.entrada4, formulario.entrada5]);
}

function calcularDatos(formulario) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var tipotarifa;
  var pagoconductora = formulario.kilometros * formulario.tipotarifa;
  var retencion;
  var gananciamer;
  var pagopasajera;

  //Para registrar el tipo de tarifa
  if(formulario.tipotarifa=="750"){
  	tipotarifa = "Diurna";
  } else if (formulario.tipotarifa=="900") {
	  tipotarifa = "Nocturna";
  } else {
	  tipotarifa = "Concierto";
  }

  retencion = pagoconductora * (17/100); //Cobro de un 17% por retención
  gananciamer = pagoconductora * (3/100); //Cobro de un 3% por ganancias de mujeres en ruta
  pagopasajera = retencion + gananciamer + pagoconductora;

  //Para guardar en excel el registro de la persona
  sheet.appendRow([formulario.kilometros, tipotarifa,formulario.tipotarifa,retencion,gananciamer,pagoconductora,pagopasajera]);
}
