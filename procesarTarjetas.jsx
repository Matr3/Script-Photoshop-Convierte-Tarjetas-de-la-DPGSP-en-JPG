//FOR DEVELOPER MATR3 - tremari.marce@gmail.com
#target photoshop

// Tamaño A4 en píxeles a 300 DPI
var a4Width = 2480;  // 21 cm
var a4Height = 3508; // 29.7 cm

// Función principal para procesar el archivo PDF
function procesarPDF() {
    // Seleccionar el archivo PDF
    var pdfFile = File.openDialog("Selecciona el archivo PDF con las tarjetas");
    if (!pdfFile) {
        alert("No seleccionaste ningún archivo.");
        return false; // Terminar si no se selecciona un archivo
    }

    // Obtener el nombre del archivo sin la extensión
    var baseName = pdfFile.name.replace(/\.[^\.]+$/, '');

    // Opciones para importar el PDF
    var importOptions = new PDFOpenOptions();
    importOptions.antiAlias = true;
    importOptions.mode = OpenDocumentMode.RGB;
    importOptions.resolution = 300;
    importOptions.page = 1; // Trabajaremos solo con la primera página del PDF

    // Abrir el archivo PDF
    try {
        app.open(pdfFile, importOptions);
    } catch (e) {
        alert("Error al abrir el archivo PDF: " + e.message);
        return false;
    }

    // Documento original abierto
    var originalDoc = app.activeDocument;

    // Dimensiones de las tarjetas (en píxeles a 300 DPI)
    var tarjetaHeight = 560; // Altura de cada tarjeta
    var tarjetaOffset = 200; // Espacio en blanco entre tarjetas

    // Guardar la imagen convertida del PDF
    var pdfImageFile = new File(pdfFile.path + "/" + baseName + "_PDFConvertido.jpg");
    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    originalDoc.saveAs(pdfImageFile, jpgSaveOptions, true);

    // Procesar y guardar las tarjetas
    function procesarTarjeta(cropTop, cropBottom, outputFileName) {
        try {
            // Crear una copia del documento original
            var workingDoc = originalDoc.duplicate();

            // Recortar la tarjeta
            workingDoc.crop([0, cropTop, workingDoc.width, cropBottom]);

            // Crear el nombre del archivo con el sufijo "frente" o "dorso"
            var tarjetaFile = new File(pdfFile.path + "/" + baseName + "_" + outputFileName + ".jpg");

            // Guardar la tarjeta recortada como imagen
            var jpgSaveOptions = new JPEGSaveOptions();
            jpgSaveOptions.quality = 12;
            workingDoc.saveAs(tarjetaFile, jpgSaveOptions, true);

            // Cerrar el documento recortado
            workingDoc.close(SaveOptions.DONOTSAVECHANGES);

            alert("Tarjeta guardada correctamente: " + outputFileName);
        } catch (e) {
            alert("Error al procesar la tarjeta " + outputFileName + ": " + e.message);
        }
    }

    // Procesar la primera tarjeta (frente)
    procesarTarjeta(0, tarjetaHeight, "frente");

    // Procesar la segunda tarjeta (dorso)
    procesarTarjeta(tarjetaHeight + tarjetaOffset, tarjetaHeight * 2 + tarjetaOffset, "dorso");

    // Cerrar el documento original
    try {
        originalDoc.close(SaveOptions.DONOTSAVECHANGES);
    } catch (e) {
        alert("Error al cerrar el documento original: " + e.message);
    }

    alert("Proceso completado. Las tarjetas se guardaron en la misma carpeta que el archivo PDF.");
    return true; // Indicar que el proceso se completó correctamente
}

// Bucle para procesar varios archivos
while (true) {
    var continueProcessing = procesarPDF();

    // Preguntar al usuario si desea continuar con otro archivo
    if (continueProcessing) {
        var userResponse = confirm("¿Deseas continuar con otro PDF?");
        if (!userResponse) {
            alert("Muchas gracias. ¡Hasta luego! - For Matr3 -");
            break; // Salir del bucle si el usuario cancela
        }
    } else {
        alert("Hubo un error. El proceso ha terminado.");
        break; // Salir si ocurre un error en el proceso
    }
}
