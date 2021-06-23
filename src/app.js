
const express=require('express')
const app=express()
const fetch=require('node-fetch')


async function All(res){
    let compain=await (await fetch('https://testapi.donatekart.com/api/campaign')).json()
    
    compain.sort((a,b)=> {return a.totalAmount<=b.totalAmount && 1 || -1}) //sort using ternary operator

   let total_amount= compain.map(i=> {return {Title:i.title, Total_Amount:i.totalAmount,Backers_Count:i.backersCount,End_Date:i.endDate}})
    //console.log(total_amount)
    return res.json(total_amount)
    
}
//All()


app.get('/closecompain',(req,res)=>{  //thired task filter close compains
     All3(res)
})

app.get('/activecompain',(req,res)=>{  //second task filter active compains
     All2(res)
})

app.get('/compain',(req,res)=>{  //first task sort compains
     All(res)
})
 app.listen(2000)




async function All2(res){
    let enddate=await (await fetch('https://testapi.donatekart.com/api/campaign?type=active')).json()

     let date=new Date()
     let today=date.toISOString() //conversion into given json date formate
  
     activeCompain=enddate.filter(item=> {return (today<=item.endDate) && (parseInt((new Date(today) - new Date(item.created))/(1000*3600*24))<=30)})
    //console.log(activeCompain)
   return res.json(activeCompain)
}
//All2()

async function All3(res){
     let compains=await (await fetch('https://testapi.donatekart.com/api/campaign?type=active')).json()
      let date=new Date()
      let today=date.toISOString()
   
      closeCompain=compains.filter(item=> {return ((new Date(today) > new Date(item.endDate)) || item.totalAmount<=item.procuredAmount)})
       //console.log(closeCompain)
      return res.json(closeCompain)
 }
 //All3()




