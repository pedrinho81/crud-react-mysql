import { useState, useEffect } from 'react'
import Card from './components/Card'
import Axios from 'axios'

function App() {
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
    <div className=" py-5 mx-auto  bg-slate-900 p-2 " >
      <div className="flex flex-col content-center gap-3 border-2 items-center ">
        <h1 className='text-3xl pt-2 font-normal underline text-slate-200'>Game Shop</h1>
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
        <button className='p-2 my-2 text-slate-600 bg-slate-300 font-semibold rounded-lg hover:bg-slate-100 transition-colors'
                onClick={() => handleClickButton()}>Cadastrar</button>
      </div>
      {typeof listGames !== "undefined" &&
      listGames.map((game) => {
        return <Card key={game.idgames}
                     listCard={listGames}
                     setListCard={setListGames}
                     id={game.idgames}
                     name={game.name}
                     cost={game.cost}
                     category={game.category}>
                       
                     
                     </Card>
      })}
    </div>
    
  )
}

export default App
