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
        let result = encodeText(passEncode).concat(encodeText(planeText))

        //Se le muestra al usuario el resultado
        console.log(result)// *** DELETE *** 
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

// Esta funcion retorna un numero aleatorio del @min al @max indicado al momento de invocarla
function getRandomNumber(min, max)
{
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

// Esta funcion retorna verdadero(1) si el numero proporcionado es impar, de lo contrrario retorna falso (0)
function isOdd(number)
{
    return (number%2)
}

// Esta funcion se encarga de cifrar determinado texto plano
function encodeText(planeText)
{
    // String en texto plano = planeText
    console.log(planeText) // *** DELETE ***
    // Invertir el String
        // Obtener el String caracter por caracter .split() devuelve un Array
        let planeTextCharacters = planeText.split("")
        // Invertir la posicion de cada caracter para obtener el resultado
        let planeTextReverseCh = planeTextCharacters.reverse()
    console.log(planeTextReverseCh) // *** DELETE ***
    // Obtener los numeros ASCCI de cada caracter del String (invertido)
    let ascciTxtReverse = new Array()
        planeTextReverseCh.forEach( character => 
        {
            ascciTxtReverse.push(character.codePointAt(0))
        })
    console.log(ascciTxtReverse) // *** DELETE ***
    // Calcular N = la longitud del string
    let lengthPlaneText = planeText.length;
    
    // Calcular N numeros random del 0 al 9
    const randomNumbers = new Array(lengthPlaneText).fill(null).map(()=>getRandomNumber(0, 9))
    // Explicacion Codigo anterior
        /*  - se crea el array de longitud N
            - se llena el array con nulos
            - se mapea el array y se le setean numeros random del cero al nueve
        */    
    console.log(randomNumbers) // *** DELETE ***
    // Evaluar numeros random generados y aplicar la operacion pertinente
    let newAscciTxtReverse = new Array()
         randomNumbers.forEach((number,index) => 
         {
            if(isOdd(number)) // Si es impar se hace una resta
            { 
                newAscciTxtReverse.push(ascciTxtReverse[index] - number)
            }else // De lo contrario si es par, se hace una suma
            {
                newAscciTxtReverse.push(ascciTxtReverse[index] + number)
            }
         })
    console.log(newAscciTxtReverse) // *** DELETE ***
    // Convertir los Codigos ASCCI  obtenidos a los respectivos caracteres
    let newPlaneText = new Array()
        newAscciTxtReverse.forEach( number =>
         {
            newPlaneText.push(String.fromCodePoint(number))
         })
    console.log(newPlaneText) // *** DELETE ***
    // Despues de cada uno de los caracteres, colocar el numero random respectivo.
    let arrayEncodeText = new Array()
        newAscciTxtReverse.forEach( (element, index) =>
        {
            arrayEncodeText.push(newPlaneText[index])
            arrayEncodeText.push(randomNumbers[index])
        })
    console.log(arrayEncodeText) // *** DELETE ***

    // Se retorna la union de cada uno de los elementos del array anterior: A E I = AEI
    return arrayEncodeText.join("")

}