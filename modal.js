const Modal = {
     open(){                    //Abrir modal / Ative ao modal/
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){                    // Fechar modal, remover a class active moddal/ 
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

