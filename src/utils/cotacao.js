const request = require('request')

const api_token='340a6a97e6e5faddd172007db646afde'

const cotacao =(symbol,callback)=>{

    const url=`http://api.marketstack.com/v1/intraday/latest?access_key=${api_token}&symbols=${symbol}`

    request({url:url, json:true}, (err,response)=>{
        if(err){        
            callback({
                mensage:`Something went wrong:${err}`,
                code:500
            },undefined)
        }
        
        if(response.body===undefined || response.body.data===undefined){
            callback({
                mensage:'No data found',
                code:404,
                },undefined)
        }else{
        const parsedJSON=response.body.data[0]

        const {symbol,date,open,last,low,high,close}=parsedJSON

        callback(undefined,{symbol,date,open,last,low,high,close})
    }

    })

}
module.exports=cotacao
