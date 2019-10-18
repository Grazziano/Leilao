import React from 'react'
import { Link } from 'react-router-dom'

const ObraLeilao = props => (
  <div className="card">
    <img className="card-img-top" src={props.foto} alt='Tela' />
    <div className="card-body">
      <h4 className="card-title">{props.titulo}</h4>
      <p className="card-text">Autor: {props.autor}<br/>
      Lance Mínimo: {(props.minimo).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
      <Link to={`/detalhes/${props.id}`} className="btn btn-danger btn-block">Ver Detalhes</Link>
    </div>
  </div>
)

export default ObraLeilao