import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default class Detalhes extends Component {

  state = {
    id: '',
    titulo: '',
    autor: '',
    descricao: '',
    minimo: 0,
    foto: '',
    lance_nome: '',
    lance_email: '',
    lance_fone: '',
    lance_valor: '',
    aviso: ''
  }

  componentDidMount() {
    // obtém os parâmetros passados para a classe
    const { match: { params } } = this.props

    const db = firebase.firestore()

    var docRef = db.collection("obras").doc(params.id);

    docRef.get().then(doc => {
      if (doc.exists) {
        this.setState({ id: doc.id, ...doc.data() })
      } else {
        // doc.data() will be undefined in this case
        console.log("Erro...");
      }
    }).catch(function (error) {
      console.log("Erro de conexão: ", error);
    });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()

    const lance = {
      nome: this.state.lance_nome,
      email: this.state.lance_email,
      fone: this.state.lance_fone,
      valor: this.state.lance_valor
    }

    const db = firebase.firestore()

    try {
      db.collection('obras').doc(this.state.id)
        .collection('lances').add(lance)
      this.setState({aviso: 'Ok! Lance cadastrado com sucesso'})  
    } catch (erro) {
      this.setState({aviso: 'Erro: '+erro})
    }
    this.tempoAviso()
  }

  tempoAviso = () => {
    setTimeout(() => {
      this.setState({aviso: ''})
    }, 5000)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-2">
            <div className="card">
              <img src={this.state.foto}
                className="card-img-top img-fluid"
                alt="Quadro" />
              <div className="card-body">
                <h4 className="card-title">
                  {this.state.titulo}</h4>
                <h6 className="card-title">Autor:
                  {this.state.autor}</h6>
                <p className="card-text">
                  {this.state.descricao}</p>
                <p className="card-text">
                  Lance Mínimo: {(this.state.minimo).toLocaleString('pt-br',
                    { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            <button className="btn btn-danger btn-lg btn-block">
              GOSTOU? DÊ UM LANCE!</button>
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  * Os leilões ocorrem no último dia útil do mês
                </p>
                <form onSubmit={this.handleSubmit}>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-user"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control"
                      placeholder="Nome Completo" 
                      name="lance_nome" 
                      onChange={this.handleChange}
                      value={this.state.lance_nome}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-at"></i>
                      </span>
                    </div>
                    <input type="email" className="form-control"
                      placeholder="E-mail para contato" 
                      name="lance_email" 
                      onChange={this.handleChange}
                      value={this.state.lance_email}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-phone"></i>
                      </span>
                    </div>
                    <input type="text" className="form-control"
                      placeholder="Telefone (com DDD)" 
                      name="lance_fone" 
                      onChange={this.handleChange}
                      value={this.state.lance_fone}  
                      />
                  </div>
                  <div className="input-group mt-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fas fa-dollar-sign"></i>
                      </span>
                    </div>
                    <input type="text" 
                      className="form-control"
                      placeholder="R$ do seu lance" 
                      name="lance_valor" 
                      onChange={this.handleChange}
                      value={this.state.lance_valor}  
                      />
                  </div>
                  <input type="submit" className="btn btn-danger float-right mt-3"
                    value="Enviar Lance" />
                  <Link to={'/'} className="btn btn-success float-left mt-3">
                    Retornar
                  </Link>
                </form>
              </div>
            </div>
            {this.state.aviso !== '' ?
            <div className='alert alert-info mt-3'>
              {this.state.aviso}
            </div>
            : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
