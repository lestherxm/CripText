document.getElementById('decode').addEventListener('click',()=>
{
    //Si hay texto en los inputs, proseguir con el algoritmo
    if(validateInputs())
    {
        // Obtener el texto cifrado y la clave de cifrado, enviarlas a la funcion @getPlainText
        // Para obtener el resultado, el cual se almacena en una variable para posteriormente mostrarla al usuario.
        let plainText = getPlainText($('#encodeText').val(), $('#encryptionKey').val())
        $('#plainText').val(plainText)
    }
    //De lo contrario, se muestra la ventana modal.
    else
    {
        $('#myModalWindow').modal('show')
    }
})

// Este metodo devuelve verdadero si no se ha ingresado NADA en alguno de los 2 campos.
function validateInputs()
{
    //Se evalua si la longitud de la cadena es cero en ambos inputs
    if (($('#encodeText').val().length == 0) || ($('#encryptionKey').val().length == 0))
    {
      return false
    }
    //else
    return true
  
}

// Esta funcion retorna verdadero(1) si el numero proporcionado es impar, de lo contrrario retorna falso (0)
function isOdd(number)
{
    return number%2
}

function getPlainText(encodeText, encryptionKey){
    // String del Texto Cifrado = encodeText
    // String de la Clave de Cifrado = encryptionKey
    // Calcular la longitud de la clave de cifrado
    let lengthEncryptionKey = encryptionKey.length
    console.log(`Longitud del Pass Code ${lengthEncryptionKey}`) // ** DELETE ** 
    // Con base en la longitud, calcular los caracteres a tomar del texto cifrado (length * 2)
    let charactersToTake = lengthEncryptionKey*2
    console.log(`Caracteres a tomar: ${charactersToTake}`) // ** DELETE **
    // Obtener caracter por caracter el texto cifrado
    let arrayEncodeText = encodeText.split("")
    console.log(`Array codificado: ${arrayEncodeText}`) 
    
    //Si la clave de cifraco coincide con la clave de cifrado del texto cifrado, seguir descifrando el mensaje
    if(isTheEncryptionKey(encodeText, encryptionKey, charactersToTake))
    {
        console.log(`${encryptionKey} si es la clave de cifrado, continuar`)
        return decode(encodeText,charactersToTake,encodeText.length)
    }//de lo contrario, el texto plano a mostrar es el de abajo.
    return "Clave de cifrado incorrecta."
}

// Este metodo valida si la clave de cifrado proporcionada por el usuario es correcta.
function isTheEncryptionKey(encodeText,encryptionKey,charactersToTake){
    let plainTextKey = decode(encodeText,0,charactersToTake)
    console.log(`La clave de cifrado en texto plano -> ${plainTextKey}`)
        if(plainTextKey == encryptionKey){
            console.log(`${plainTextKey} es igual a ${encryptionKey}`)
            return true
        }
    return false
}

// Esta funcion se encarga de descifrar determinado texto cifrado, recibe dicho texto cifrado
// y la posicion de inicio a fin para hacer el recorrido del array proporcionado
// estas ultimas dos variables son necesarias para validar la clave de cifrado y usar el mismo
// metodo para obtener el texto plano en caso de que dicha clave sea valida.
function decode(encodeText,start,end)
{
    //Se obtienen los numeros del texto cifrado con base en el inicio y fin especificado
    let numbers = getNumbers(encodeText,start,end)
    console.log(`numeros de un texto codificado ${numbers}`)
    //Se obtienen los strings del texto cifrado con base en el inicio y fin especificados
    let strings = getStrings(encodeText,start,end)
    console.log(`letras de un texto codificado ${strings}`)
    //Se obtiene el equivalente ASCII de los strings del texto cifrado
    const asciiOfTheStrings = getAscii(strings)
    console.log(`codigos ascii del texto cifrado ${asciiOfTheStrings}`)
    //Se validan el array de numeros y se hace el respectivo ajuste en los codigos ascii de los strings
    let fixedAsciiStrings = getFixedAscii(numbers, asciiOfTheStrings)
    console.log(`codigos ascii ARREGLADOS ${fixedAsciiStrings}`)
    //Ahora que se tienen nuevos valores ascii, se obtienen los equivalentes en string
    let reversPlainText = fromAsciiToString(fixedAsciiStrings)
    //Ahora se tiene texto plano, sin embargo esta a la inversa, por lo que hay que voltearlo
    //el restulado seria un string, por ende se puede retornar porque es el resultado como tal.
    return reversPlainText.reverse().join("")
}

//Este metodo retonrta un array que contiene los numeros del texto cifrado; toma los numeros
//que estan en las posiciones imp artes, es por eso que me ayudo del metodo @isOdd()
function getNumbers(encodeText,start,end)
{  
    let numbers = new Array()
    for(let i=start; i<end; i++)
    {
        if(isOdd(i))
        {
             numbers.push(encodeText[i])
        }
    }
    return numbers
}

// Este metodo devuelve un array que contiene los strings del texto cifrado; toma los strings
// que estan en las posiciones pares, es por eso que me ayudo del metodo @isOdd()
function getStrings(encodeText,start,end)
{
    let strings = new Array()
    for(let i=start;i<end;i++)
    {
        if(!isOdd(i))
        {
             strings.push(encodeText[i])
        }
    }
    return strings
}

// Este metodo devuelve los caracteres ascci con base en un array de strings proporcionado.
function getAscii(strings){
    let ascci = new Array()
    strings.forEach(character => 
        {
             ascci.push(character.codePointAt(0))
        })
    return ascci
}

function getFixedAscii(numbers, asciiStrings){
    let ascii = new Array()
    let aux = 0
        numbers.forEach((number,index) => 
        {
            if(isOdd(number)) // Si es impar se hace una suma
            { 
                aux = Number(asciiStrings[index]) + Number(number)
                    ascii.push(aux)
            }else // De lo contrario si es par, se hace una resta
            {
                aux = Number(asciiStrings[index]) - Number(number)
                    ascii.push(aux)
            }
        })
    return ascii
}

//Este metodo devuelve los equivalentes en string de determinados codigos ascii 
function fromAsciiToString(asciiCodes){
    let strings = new Array()
    asciiCodes.forEach(code => 
        {
            strings.push(String.fromCodePoint(code))
        })
    return strings
}