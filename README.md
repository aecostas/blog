
 * Comparar tiempos de añadir elementos a un array conforme va creciendo
 * [DONE] Algoritmo. Suma dos elementos
 * Refactor con profiling en nodejs
 * qué caracteriza a un algoritmo. Tiempo de ejecucación, memoria, etc
 * cómo funciona la gestión de dependencias en npm
 * if vs and

    if (imageData[i] == 0 && 
        imageData[i + 1] == 255 && 
        imageData[i + 2] == 0 &&
        imageData[i + 3] >= 255 * sensibility) {
     
        setBit(buffer, parseInt(currentByte), bitPositionFromRight, 1);
      }

/*
    if (imageData[i] == 0 && imageData[i + 1] == 255 && imageData[i + 2] == 0) {
      // write '1'
      if (imageData[i + 3] < 255 * sensibility) {
        setBit(buffer, parseInt(currentByte), bitPositionFromRight, 0);
      } else {
        setBit(buffer, parseInt(currentByte), bitPositionFromRight, 1);
      }

    } else {
      // write '0'
      setBit(buffer, parseInt(currentByte), bitPositionFromRight, 0);
    }
  }
*/


 * declarar una constante fuera o dentro

 decimalToNmea = (coord, type) => {
    const sufixes = {
        lat: {
            true: 'N',
            false: 'S'
        },
        lon: {
            true: 'E',
            false: 'W'
        }
    }

    const intPart = Math.abs(parseInt(coord));
    const decimalPart = Math.abs(coord) - intPart;

    return `${intPart}${decimalPart * 60}, ${sufixes[type][coord>0]}`;
}


* variables const en objetos.
* explicar el proceso de instalar nginx y las variables que usa para la seguridad