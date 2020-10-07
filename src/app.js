const path=require('path')
const express=require('express')
const hbs=require('hbs')
const cotacoes=require('./utils/cotacao')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Welcome Digital Engineering ',
        author:'Érico Mendes'
    })

})


app.get('/cotacoes',(req,res)=>{    
    
    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                mensage:'o ativo de ser informado com query parameter',
                code: 400
            }
            
            
        })
    }
    const symbol=req.query.ativo.toUpperCase()

cotacoes(symbol,(err,body)=>{
    if(err){                 
        return res.status(err.code).json({error: {
            mensage:err.mensage,
            code: 400
        }})
    }
    console.log(body)
    res.send(body)
    })
    
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormenseger:'Página não encontrada',
        author: 'Érico Mendes'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})