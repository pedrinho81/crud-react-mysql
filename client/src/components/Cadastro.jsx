import { useState, useEffect } from 'react'
import Axios from 'axios'
import Card from './Card'


export default function cadastro() {
const [values, setValues] = useState()
const [listGames, setListGames] = useState()

//PEGANDO OS VALORES DOS INPUTS
const handleChangeValues = (value) => {
  setValues(prevValue => ({
    ...prevValue,
    [value.target.name]: value.target.value,
  }))
  console.log(values)
}
//ENVIANDO OS DADOS PARA O DB
const handleClickButton = () => {
  try {
    Axios.post("http://localhost:3001/register", {
    name: values.name,
    cost: values.cost,
    category: values.category,
    url: values.url
  })
  console.log("Sucesso!")
  } catch (err) {
    console.log(err)
  } 
  
}
//PEGANDO DADOS
useEffect(() => {
  try {
    Axios.get("http://localhost:3001/getCards")
    .then((response) => {
      setListGames(response.data)
    });
  } catch (error) {
    console.log(error)
  }
  
}, [listGames])

    return (
    <>
<div className="flex flex-col content-center gap-3 border-2 items-center ">
       <h1 className="text-2xl text-slate-300 mt-3">Cadastro de produtos</h1>
       <input type="text"
              name='name'
              placeholder='Nome'
              className='w-64  p-2 border-2 rounded border-slate-300 placeholder:pl-1'
              onChange={handleChangeValues} />
       <input type="text"
              name='cost'
              placeholder='Preço'
              className='w-64 p-2 border-2 rounded border-slate-300 placeholder:pl-2'
              onChange={handleChangeValues}  />
       <input type="text"
              name='category'
              placeholder='Categoria'
              className='w-64 p-2 border-2 rounded border-slate-300 placeholder:pl-2'
              onChange={handleChangeValues}  />
       <input type="text"
       name='url'
       placeholder= 'Url da imagem'
       className='w-64 p-2 border-2 rounded border-slate-300 placeholder:pl-2'
       onChange={handleChangeValues}  />
       <button className='p-2 my-2 text-slate-600 bg-slate-300 font-semibold rounded-lg hover:bg-slate-100 transition-colors'
               onClick={() => handleClickButton()}>Cadastrar</button>
     </div>

         <div className="flex flex-col items-center gap-1">
     
             {typeof listGames !== "undefined" &&
     listGames.map((game) => {
       return <Card key={game.id}
                    listCard={listGames}
                    setListCard={setListGames}
                    id={game.id}
                    name={game.name}
                    cost={game.cost}
                    category={game.category}
                    url={game.url}>
                    </Card>
     })}
     
           
   </div>
    </>
    
    )
}