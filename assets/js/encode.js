//Se obtiene el elemento para cifrar el texto plano y se le agrega un add event listener
//para detectar cuando se haga click en él
document.getElementById('encode').addEventListener('click',()=>
{
    //Si hay texto en los inputs, proseguir con el algoritmo
    if(validateInputs())
    {
        //Se obtiene el Texto Plano
        let planeText = $('#planeText').val()

        //Se obtiene la Clave de Cifrado
        let passEncode = $('#passEncode').val()

        //Se obtiene la Cadena Cidfrada a través del método @encodeText
        //Tanto la clave de cifrado como el texto plano constituyen el texto cifrado
        let result = encodeText(passEncode).concat(encodeText(planeText))

        //Se le muestra al usuario el resultado
        $('#encodeText').val(result)

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
    if (($('#planeText').val().length == 0) || ($('#passEncode').val().length == 0))
    {
      return false
    }
    //else
    return true
}

// Este metodo retorna un numero aleatorio del @min al @max indicado
function getRandomNumber(min, max)
{
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

// Este metodo retorna verdadero(1) si el numero proporcionado es impar; falso (0) si es par
function isOdd(number)
{
    return (number%2)
}

// Esta funcion se encarga de cifrar determinado texto plano
function encodeText(planeText)
{
    try {
        // String en texto plano = planeText

        // Invertir el String
            // Primero se obtiene el String caracter por caracter, .split() devuelve un Array
            let planeTextCharacters = planeText.split("")
            // Despues se invierte la posicion de cada caracter para obtener el resultado
            let planeTextReverseCh = planeTextCharacters.reverse()

        // Obtener los numeros ASCII de cada caracter del String (invertido)
        let asciiTxtReverse = getAscii(planeTextReverseCh)

        // Calcular N = la longitud del string
        let lengthPlaneText = planeText.length;
        
        // Calcular N numeros random del 0 al 9
        const randomNumbers = new Array(lengthPlaneText).
                            fill(null).
                            map(()=>
                            getRandomNumber(0, 9))
        // Explicacion Codigo anterior
            /*  - se crea el array de longitud N
                - se llena el array con nulos
                - se mapea el array y se le setean numeros random del cero al nueve
            */    

        // Se Evalua los numeros random generados y aplicar la operacion pertinente
        let newAsciiTxtReverse = getAlterAscii(randomNumbers,asciiTxtReverse)

        // Convertir los Codigos ASCCI  obtenidos a los respectivos caracteres
        let newPlaneText = fromAsciiToString(newAsciiTxtReverse)

        // Finalmente, se obtiene el texto cifrado, el cual es una combinacion de los strings
        // cuyos codigos ascii han sido alterados y los numeros random generados para poder descifrarlos posteriormente.
        // @newAsciiTxtReverse se envia como array auxiliar, no tiene ningun valor añadido en la logica 
        let arrayEncodeText = getEncodeText(newAsciiTxtReverse, newPlaneText,randomNumbers)

        // Se retorna la union de cada uno de los elementos del array anterior: A 3 E 2 I 1 = A3E2I1
        return arrayEncodeText.join("")
    } catch (error) {//No se descartan errores, por eso se coloca este alert.
        alert("Hubo un error al cifrar el texto plano, vuelve a intentarlo otra vez.")
    }
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

// Este metodo se encarga de alterar determinados codigos ascii con base en determinados numeros
function getAlterAscii(numbers, asciiStrings)
{
    let ascii = new Array()
        numbers.forEach((number,index) => 
        {
            if(isOdd(number)) // Si es impar se hace una resta
            { 
                ascii.push(asciiStrings[index] - number)
            }else // De lo contrario si es par, se hace una suma
            {
                ascii.push(asciiStrings[index] + number)
            }
        })
    return ascii // finalmente se retorna el array de codigos asciii alterados.
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

function getEncodeText(aux, strings, numbers){
    let encodeText = new Array()
    aux.forEach( (element, index) =>
    {
        encodeText.push(strings[index])//despues de cada string
        encodeText.push(numbers[index])//va un numero que ayudará para el descifrado posterior.
    })
    return encodeText
}
