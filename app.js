const cards = document.getElementById("cards"); 

const modals = document.getElementById('modals')

fetch("https://6243ad813da3ac772b053c05.mockapi.io/trabajo")
  .then((Response) => Response.json())
  .then((data) => {
    console.log('infoCards::',data);
    const tachoUrl = 'https://s3-alpha-sig.figma.com/img/b07c/c187/777d5cb5039fac40876a5adf2689846a?Expires=1649635200&Signature=C4V-sDbHOn1VQKgOrFMS5HSzLnpI2CNuuQDka1oQE-m5OlP1SkySpAOz~5Y7h4OqYbrfJ8UyYE4VE4MRrxzvvjb4R2ad5Dk6Q~TPUKeUgYDmU2F3JuEqA5uC~JyIplr9lBPaNKBPq7oX-9Q0J3zf~JiwdaUOZlLHp6AA2QFrPX--XFJ9WPhzlrcFLUPEokxYcsg3x9l-u09KWOoGOQWjIJoz-RmBAQTCxvhxQUroIT5rqsJNo8OQiFha3zS6D0v-K6jJOUyNYe4J-e54WgKjIehc1K4z8PiG4bL4ozijBM60RohjREf9qUxb4~48tJjC7cLAhgZoH9d0NT8rh~Z6-w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    const lapizUrl = 'https://s3-alpha-sig.figma.com/img/0632/12dc/3626e9c80db62b23ab89a857c0c45e7a?Expires=1649635200&Signature=MKysCO4WGpFPX3aMnbigA7PBsaY2gAfVZWZ~TK9RUhCsom8sy31R-A5Wb8Pc2dzOGJHHoTtaDKMtaF1a0903EDIXNd1CzYnpXTHWslf~ELC-i-yy2r1XX07ZEolr1A6BqtVnd7SDcpnXqNuhq8zxfi2imFIa6aMC3RBtCCQzy0vWmNMOuMQFdQwo6znfktomrgj-TKsveazYXBr6BVdqmHD01885BtX1kbEfgzdF90YXjtt7UccwfxdaFA-iKCG4m-tEXNX0Bfo3shF2yCFVPz5B2LwUVCGFenpu0mTZo08xEss3CaGMPaRlDUnTQ~UA1Z6y0lcDqIALJ6l5wadViA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    const infoCards = data;
    
    // for (const [index, cardInfo] of infoCards.entries()) {
      infoCards.forEach((cardInfo, index) => {

      // Crea un div por cada elemento y le asigna un ID 
      const cardDiv = document.createElement('div')
      cardDiv.setAttribute('id', `card_${index}`)

      // Crea el titulo y los parrafos
      const titulo = document.createElement('h5')
      const texto_1 = document.createElement('p')
      const texto_2 = document.createElement('p')
      const texto_3 = document.createElement('p')
     
      // A cada elemento le agrega el valor que le corresponde según la propiedad de cada objeto card
      texto_1.innerText = `${cardInfo.Empresa}`
      texto_2.innerText = `${cardInfo.Fecha}`
      texto_3.innerText = `${cardInfo.Tags}`
      titulo.innerText = `${cardInfo.Puesto}`
      
      // Crea el botón Editar y escucha el evento click que llama a la función abroModalEditar
      const boton_editar = document.createElement('button')
      boton_editar.innerText = 'Editar'
      boton_editar.addEventListener('click',()=>{
        abroModalEditar(cardInfo, index)
      })

      // Crea el botón Borrar y escucha el evento click que llama a la función abroModalBorrar
      const boton_borrar = document.createElement('button')
      boton_borrar.innerText = `Borrar`
     
      boton_borrar.addEventListener('click',()=>{
        abroModalBorrar(index)
      })
     
      // Agrega elementos hijos al div del card (cardDiv)
      cardDiv.appendChild(titulo)
      cardDiv.appendChild(texto_1)
      cardDiv.appendChild(texto_2)
      cardDiv.appendChild(texto_3)

      cardDiv.appendChild(boton_editar)
      cardDiv.appendChild(boton_borrar)
      
      // Agrega al div cards cada uno de los cardDiv
      cards.appendChild(cardDiv)
    })
  
    // Función para botón Borrar
    function abroModalBorrar(index){
      
      // Crea el div
      const modal = document.createElement('div')
      // Agrega un p
      const pregunta_confirmacion = document.createElement('p')
      // Escribe el texto
      pregunta_confirmacion.innerText = '¿Desea eliminar esta oferta de trabajo?'
      // Crea un botón de Eliminar
      const boton_confirma = document.createElement('button')
      boton_confirma.innerText = 'Eliminar'
      // Escucha el evento click del botón Eliminar
      boton_confirma.addEventListener('click',()=>{
        // Splice borra el elemento del array que le indiques según la posición
        infoCards.splice(index,1)
        const removed_card = document.getElementById(`card_${index}`)
        // Remueve los elementos de los div padre
        cards.removeChild(removed_card)
        modals.removeChild(modal)
      })
      // Agrega elementos al padre
      modal.appendChild(pregunta_confirmacion)
      modal.appendChild(boton_confirma)
      modals.appendChild(modal)
    }

    // Función para botón Editar
    function abroModalEditar(info, index){
      const modalEditar = document.createElement('div')
      modals.appendChild(modalEditar)
      console.log(info)
      const input_A = document.createElement('input')
      input_A.value = `${info.Puesto}`
      modalEditar.appendChild(input_A)
      const input_B = document.createElement('input')
      input_B.value = `${info.Empresa}`
      modalEditar.appendChild(input_B)
      const input_C = document.createElement('input')
      input_C.value = `${info.Tags}`
      modalEditar.appendChild(input_C)

      const boton_guardar = document.createElement('button')
      boton_guardar.innerText = 'Guardar'
      modalEditar.appendChild(boton_guardar)

      boton_guardar.onclick = ()=>{
        const edited_card = document.getElementById(`card_${index}`)
        const newInfo = {
          Puesto: input_A.value,
          Empresa: input_B.value,
          Tags: input_C.value,
          Fecha: info.Fecha,
          id: info.id
        }
        infoCards[index] = newInfo
      
        edited_card.children[1].innerText = input_A.value
        edited_card.children[2].innerText = input_B.value
        edited_card.children[3].innerText = input_C.value
      
       
        modals.removeChild(modalEditar)
      }
    }
  });

 