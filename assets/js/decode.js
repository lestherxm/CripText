//Se obtiene el boton cuyo id es @decode y se le agrega un event listener para detectar cuando se haga click en él
document.getElementById('decode').addEventListener('click',()=>
{
    //Si hay texto en los inputs, proseguir con el algoritmo
    if(validInputs())
    {
        // Se obtiene la clave de cifrado
        let encryptionKey = $('#encryptionKey').val()

        // Se obtiene el texto cifrado
        let encodeText = $('#encodeText').val()

        // Ambas variables se envian a @getPlainText para obtener el string en texto plano.
        let plainText = getPlainText(encodeText, encryptionKey)
        
        // Finalmente se le muestra el resultado al usuario
        $('#plainText').val(plainText)
    }
    //De lo contrario, si los inputs no son correctos se muestra la ventana modal.
    else
    {
        $('#myModalWindow').modal('show')
    }
})

// Este metodo valida si los inputos son validos, devuelve verdadero si hay algo 
function validInputs()
{
    //Se evalua si la longitud de la cadena es cero en ambos inputs
    if (($('#encodeText').val().length == 0) || ($('#encryptionKey').val().length == 0))
    {
      return false //significa que los inputs no son validos
    }
    //else
    return true //significa que los inputs si son validos
  
}

function getPlainText(encodeText, encryptionKey)
{
    // String del Texto Cifrado = encodeText
    // String de la Clave de Cifrado = encryptionKey

    //Calcular la longitud de la clave de cifrado
    let lengthEncryptionKey = encryptionKey.length

    //Con base en la longitud, calcular los caracteres a tomar del texto cifrado
        // Se multiplica por 2 porque, si se tiene una clave de 3 caracteres (por ejemplo)
        // En el texto cifrado dicha clave estaria con caracteres aleatorios y 3 numeros, teniendo
        // que tomar para la validacion 6 (3*2)
    let charactersToTake = lengthEncryptionKey*2

    //El texto cifrado es un string, por ende, se procede a separarlo caracter por caracter
    let arrayEncodeText = encodeText.split("")
    
    // Si la clave proporcionada por el usuario es correcta, se procede a descifrar el mensaje como tal
    if(isTheEncryptionKey(encodeText, encryptionKey, charactersToTake))
    {
        // El metodo @decode recibe un texto cifrado, un criterio de inicio y de fin, respectivamente.
        // En este caso @characterstoTake serian los caracteres despues de la contraseña y el limite seria
        // La logitud del texto cifrado como tal.
        // El metodo @decode devuelve un string en texto plano, el cual es el mensaje descifrado y el que se muestra en el input en la UI
        return decode(encodeText,charactersToTake,encodeText.length)
    }//de lo contrario, si la clave proporcionada no es correcta se retorna el string de abajo.
    return "Clave de cifrado incorrecta."
}

// Este metodo valida si la clave de cifrado proporcionada por el usuario es correcta
// Para ello recibe el texto cifrado, la clave ingresada por el usuario y los caracteres
// a tomar de dicho texto para hacer la validacion; pues la clave de cifrado va incluida en @encodeText
function isTheEncryptionKey(encodeText,encryptionKey,charactersToTake)
{
    // @plainTextKey almacena el string descifrado que se obtiene de descifrar
    // el texto cifrado desde el punto cero a los caracteres a tomar (los cuales constituyen la clave como tla en el texto cifrado)
    let plainTextKey = decode(encodeText,0,charactersToTake)
        //Si la clave descifrada obtenida es igual a la clave de cifrado del texto cifrado
        if(plainTextKey == encryptionKey)
        {
            return true
        }//De lo contrario, si la clave proporcionada por el usuario no coincide con la clave
        //implicita en el texto cifrado, se retorna falso.
    return false
}

// Esta funcion se encarga de descifrar determinado texto cifrado, recibe dicho texto cifrado (array)
// y la posicion de inicio y fin para hacer el recorrido del array proporcionado
// estas ultimas dos variables son necesarias para validar la clave de cifrado y usar el mismo
// metodo para obtener el texto plano en caso de que dicha clave sea valida.
function decode(encodeText,start,end)
{
    try {
        //Se obtienen los numeros del texto cifrado con base en el inicio y fin especificado
        let numbers = getNumbers(encodeText,start,end)
        
        //Se obtienen los strings del texto cifrado con base en el inicio y fin especificados
        let strings = getStrings(encodeText,start,end)

        //Se obtiene el equivalente ASCII de los strings del texto cifrado
        const asciiOfTheStrings = getAscii(strings)
    
        //Se valida el array de numeros y se hace el respectivo ajuste en los codigos ascii de los strings
        let fixedAsciiStrings = getFixedAscii(numbers, asciiOfTheStrings)

        //Ahora que se tienen nuevos valores ascii, se obtienen los equivalentes en string
        let reversPlainText = fromAsciiToString(fixedAsciiStrings)

        //Finalmente, @reversPlainText es un array que contiene strings, eso constituiría el texto plano
        //descifrado, sin embargo, está a la inversa, por lo que se retorna la inversa del array y se juntan
        //cada uno de los items de dicho array
        return reversPlainText.reverse().join("")

    } catch (error) {//No se descartan errores, por eso se coloca este alert.
        alert('Error, validar: \n 1. Que ambos campos sean correctos \n 2. Que el texto cifrado haya sido protegido con esta herramienta.')
    }
}

//Este metodo retorna un array que contiene los numeros de un texto cifrado; toma las posiciones
//impares que es donde se encuentran los numeros.
function getNumbers(encodeText,start,end)
{  
    let numbers = new Array()
    for(let i=start; i<end; i++) //se usa un for tradicional debido a que forEach no me permite especificar eso.
    {
        if(isOdd(i))//si la posicion es impar significa que es un numero
        {
             numbers.push(encodeText[i])// por ende se agrega al array de numeros.
        }
    }
    return numbers //finalmente se retornan los N numeros.
}

// Esta funcion retorna verdadero(1) si el numero proporcionado es impar; si es par retorna falso (0)
function isOdd(number)
{
    return number%2
}

//Este metodo retorna un array que contiene los strings de un texto cifrado; toma las posiciones
//pares que es donde se encuentran los strings.
function getStrings(encodeText,start,end)
{
    let strings = new Array()
    for(let i=start;i<end;i++)
    {
        if(!isOdd(i))//si la posicion NO es impar significa que es un string
        {
             strings.push(encodeText[i]) // por ende se agrega al array de strings.
        }
    }
    return strings // finalmente se retornan los strings.
}

// este metodo devuelve un array de codigos ascci pertenecientes a un array de strings proporcionado
function getAscii(strings)
{
    let ascci = new Array()
    strings.forEach(character =>  //se recorre el array de strings.
        {
             ascci.push(character.codePointAt(0)) //a cada caracter se le obtiene su numero ascii equivalente
        })
    return ascci //finalmente se retorna el array de codigos ascii
}

// Este metodo se encarga de "arreglar" determinados codigos ascii con base en determinados
// numeros proporcionados en el texto cifrado
function getFixedAscii(numbers, asciiStrings)
{
    let ascii = new Array()
    let aux = 0
        numbers.forEach((number,index) => //se recorre el array de numeros
        {
            if(isOdd(number)) // Si el numero es impar se hace una suma
            { 
                aux = Number(asciiStrings[index]) + Number(number)
                    ascii.push(aux) //se agrega al array de codigos ascii "arreglados"
            }else // De lo contrario si es par, se hace una resta
            {
                aux = Number(asciiStrings[index]) - Number(number)
                    ascii.push(aux) //se agrega al array de codigos ascii "arreglados"
            }
        })
    return ascii // finalmente se retorna el array de codigos asciii "arreglados"
}

//Este metodo devuelve los equivalentes en string de determinados codigos ascii 
function fromAsciiToString(asciiCodes)
{
    let strings = new Array()
    asciiCodes.forEach(code => //se da le ctura al array de codigos ascii
        {
            strings.push(String.fromCodePoint(code)) //por cada item se obtiene el equivalente en string
        })
    return strings //finalmente se retorna el array de strings equivalente de los codigos ascii
}