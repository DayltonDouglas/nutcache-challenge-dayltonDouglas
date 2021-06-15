import React from 'react'
import FormularioCadastro from './FormularioCadastro'
import fireDb from '../firebase'
import { useState,useEffect } from 'react'

const Cadastro = () =>{

    let [dadosFuncionarios, setDadosFuncionarios] = useState({})
    let [idAtual, setIdAtual] = useState('')

    useEffect(() =>{
        fireDb.child('funcionarios').on('value', dbPhoto =>{
            if(dbPhoto.val()!=null){
                setDadosFuncionarios({
                    ...dbPhoto.val()
                })
            } else{
                setDadosFuncionarios({})
            }
        })
    },[])

    const addEdit = obj => {
        if(idAtual==''){
            console.log(obj)
            fireDb.child('funcionarios').push(
                obj,
                error => {
                    if(error){
                        console.log(error)
                    }else{
                        setIdAtual('')
                    }
                }
            );
            window.open('Funcionário adicionado com sucesso')
        } else{
            fireDb.child(`funcionarios/${idAtual}`).set(
                obj,
                err=>{
                    if(err){
                        console.log(err)
                    }
                }
            );
            window.open('Funcionario editado com sucesso')
        }
        
    }
    const deletar = key =>{
        if(window.confirm('Deseja realmente deletar este funcionário')){
            fireDb.child(`funcionarios/${key}`).remove(
                err=>{
                    if(err){
                        console.log(err)
                    }
                }
            )
        }
    }
    return( 
        <div>
            
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                 <h1 className="display-4">Cadastro de Funcionarios</h1>
                 <p className="lead">Lista de funcionários e Cadastro de novos Funcionários</p>
                 </div>
             </div>
             <div className="row">
                <div className="col-md-5">
                    <FormularioCadastro {...setIdAtual({addEdit,idAtual,dadosFuncionarios})}/>
                </div> 
                <div className="col-md-7">
                    <table className="table table-boderless table stripped">
                        <thead className="thead-light">
                            <tr>
                               <td>Nome Completo</td>
                               <td>Data de Aniversario</td>
                               <td>CPF</td>
                               <td>Email</td>
                               <td>Data de Inicio</td>
                               <td>Team</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(dadosFuncionarios).map(id=>{
                                    return <tr>
                                        <td>{dadosFuncionarios[id].nome}</td>
                                        <td>{dadosFuncionarios[id].aniversario}</td>
                                        <td>{dadosFuncionarios[id].cpf}</td>
                                        <td>{dadosFuncionarios[id].email}</td>
                                        <td>{dadosFuncionarios[id].datadeinicio}</td>
                                        <td>{dadosFuncionarios[id].time}</td>

                                        <td>
                                            <a className="btn btn-primary" onClick={()=>{setIdAtual(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn btn-primary" onClick={()=> deletar(id)}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table> 
                </div>    
             </div>
        </div>
    )
}

export default Cadastro