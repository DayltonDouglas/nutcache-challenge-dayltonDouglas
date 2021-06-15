import React, { useEffect, useState } from 'react';
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const FormularioCadastro  = (props) =>{
    const dadosiniciais={
        nome: '',
        aniversario: '',
        genero: '',
        email: '',
        cpf: '',
        datadeinicio: '',
        time: ''
    }
    let [values, setValues] = useState(dadosiniciais)
    useEffect(()=>{
        if(props.idAtual ==''){
            setValues({
                ...dadosiniciais
            })
        }else{
            setValues({
                ...props.dadosFuncionarios[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosFuncionarios])
    function handleChange(e){
        let {name, value} = e.target
        setValues({
            ...values,
            [name]: values
        })
    }
        
    
    
    const[selectedDate, setSelectedDate] = useState(null)
    
    const formEnvio = e =>{
        e.preventDefault()
        props.addEdit(values)
    }

    

    return(
        <form autoComplete="off" onSubmit={formEnvio}>
            <div class="mb-3">
                <i class="fa fa-user"></i>
                <label for="formGroupExampleInput" class="form-label">Nome Completo*</label>
                <input className="form-control" id="formGroupExampleInput" name="nome" value={values.nome} placeholder="Nome Completo"  required  onChange={handleChange} ></input>
            
            </div>
            <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">Data de Aniversario*</label>
                <div className='App' value={values.aniversario}>
                    <Datepicker
                        required
                        placeholderText="Escolha sua data de aniversário"
                        selected={selectedDate}
                        onChange={date=> setSelectedDate(date)}
                        dateFormat='dd/mm/aaaa'
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                    />
                </div>
            </div>

            <div class="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" name="email" data-bs-toggle="dropdown" aria-expanded="false" onChange={handleChange} value={values.genero}>Gênero
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Masculino</a></li>
                    <li><a class="dropdown-item" href="#">Feminino</a></li>
                    <li><a class="dropdown-item" href="#">Não quero informar</a></li>
                </ul>
            </div> 
            
            <div class="mb-3">
            <i className="fas fa-envelope"></i>
                <label for="inputEmail4" class="form-label">Email*</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" required onChange={handleChange} value={values.email}></input>
            </div>  
            
            <div class="dropdown">
                
                <ul class="dropdownmenu" value={values.time}>
                    <li><span class="dropdown-item-text">Time a ingressar:</span></li>
                    <li><a class="dropdown-item" href="#">Mobile</a></li>
                    <li><a class="dropdown-item" href="#">Front-End</a></li>
                    <li><a class="dropdown-item" href="#">Back-End</a></li>
                </ul>
            </div>
            
            <div class="form-group">
                <button type="submit" value={props.idAtual == '' ? 'salvar' : 'atualizar'} class="btn btn-primary">Salvar</button>
            </div>
        </form>
    )
}

export default FormularioCadastro 