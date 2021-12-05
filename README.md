# AUTOR 
* Lesther Xitumul Manuel

# ¿CÓMO FUNCIONA?
Se hace uso de los códigos ASCII (enlace de referencia: https://elcodigoascii.com.ar/) para cifrar determinado texto plano. El código está comentado de forma explícita; sin embargo, se proporciona la siguiente información...

# NOTA
La herramienta es capaz de generar N textos cifrados con la misma clave de cifrado y el mismo texto plano, esto es posible debido a que se utilizan números aleatorios durante el procedimiento.

# CIFRAR
Este procedimiento se aplica tanto al texto plano como a la clave de cifrado, el texto cifrado está constituido por la concatenación de la clave de cifrado y el texto plano (cifrados).

### El procedimiento es el siguiente:
* Se obtiene el texto plano (string)
* Se invierte el string
* Se obtiene el equivalente código ASCII de los N caracteres del string.
* Se obtiene N = la longitud del string
* Se generan N números random cuyo rango es del 0 al 9
* Por cada código ASCII hay un número random. Si el número correspondiente es par, se realiza una suma, de lo contrario, una resta (al código ASCII)
* Ahora se tienen otros códigos ASCII, éstos se convierten a string nuevamente.
* Después de cada string generado con los códigos ASCII (el cual puede ser una letra o un número), se superpone el número random respectivo.

# DESCIFRAR
Es básicamente el mismo procedimiento para cifrar el texto plano pero aplicado de forma inversa.

### Primero se valida la clave de cifrado
* Se obtiene la clave de cifrado (proporcionado en texto plano por el usuario)
* Se obtiene el texto cifrado
* Se calcula la longitud de la clave de cifrado
* Se obtiene N = los caracteres a tomar del texto cifrado (longitud * 2)
* Se aplica el método @decode, se obtiene un texto plano
* El texto plano anterior debería de ser la clave de cifrado proporcionado por el usuario, si es así, se procede a aplicar el método @decode al resto del texto cifrado

### El método @decode hace lo siguiente:
* Recibe tres parámetros (array, int, int), el primero corresponde al texto cifrado, el segundo a la posicion de inicio y el tercero a la posicion final para el recorrido del array. Esto es necesario debido a que la clave de cifrado está implícitamente en el texto cifrado.
* Se separa los números de las letras (u otros números, dependiento qué sea el texto plano). Para ello, se toman las posiciones pares e impares.
* Ahora se tiene N caracteres y N números
* Se obtiene el respectivo código ASCII de los caracteres
* Se evalúan los números; si es par, se realiza una resta, de lo contrario se realiza una suma al código ASCII del caracter correspondiente.
* Ahora ya se tiene el código ASCII "arreglado" de cada uno de los caracteres, ésto se convierte a string.
* El string está a la inversa, por lo tanto, se revierte, finalmente se obtiene el texto cifrado en texto plano.



