import React from "react";
import FormDialog from "./dialog/Dialog"

export default function Card(props) {
    const [open, setOpen] =  React.useState(false);

    const handleClickCard = () => {
        setOpen(true)
    }

    return(
        <>
        <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
        <div className="container border-2 my-2 p-2 hover:bg-slate-800 transition-colors"
             onClick={() => handleClickCard()}>
            <h1 className="text-slate-200 font-black py-2 text-2xl">{props.name}</h1>
            <p className="text-slate-400 text-lg font-medium">{props.category}</p>
            <p className="text-slate-300 font-semibold text-xl">R$ {props.cost}</p>
        </div>
        </>
        
    )
} 