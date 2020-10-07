console.log('Javacript no frontend')
const cotacoesForm=document.querySelector('form')
const mainMensage=document.querySelector('h3')
const open_price=document.querySelector('#open')
const last=document.querySelector('#last')
const low=document.querySelector('#low')
const high=document.querySelector('#high')
const close_price=document.querySelector('#close')


cotacoesForm.addEventListener('submit',(event)=>{
    
    mainMensage.innerText='Buscando cotação...'

    mainMensage.innerText=''
    open_price.innerHTML=''
    last.innerHTML=''
    high.innerHTML=''
    low.innerHTML=''
    close_price.innerHTML=''

    event.preventDefault()
    const ativo=document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText='o ativo deve ser informado'
        return;
    }
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response)=>{

    response.json().then((data)=>{

        if(data.error){
            mainMensage.innerText='Algo deu errado'
            open_price.innerText=`${data.error.mensage} | código ${data.error.code}`
        }else{        
            mainMensage.innerText=data.symbol
            open_price.innerHTML=`Open: ${data.open}`
            last.innerHTML=`Last: ${data.last}`
            high.innerHTML=`High: ${data.high}`
            low.innerHTML=`Low: ${data.low}`
            close_price.innerHTML=`Close: ${data.close}`
        }
    })
})
})

