import React, { Component } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import ObraLeilao from './ObraLeilao'

export default class Leilao extends Component {

  state = {
    obras: []
  }

  // método acionado logo após a construção da view
  componentDidMount() {
    this.loadObras()
  }

  loadObras = () => {
    let obras = []

    firebase.firestore().collection('obras').orderBy('titulo').onSnapshot(snapshot => {

      snapshot.docChanges().forEach(change => {

        if (change.type === "added") {
          obras.push({ id: change.doc.id, ...change.doc.data() })
        }

        if (change.type === "modified") {
          obras = obras.map(obra => obra.id === change.doc.id ?
            { id: change.doc.id, ...change.doc.data() }
            : obra)
        }

        if (change.type === "removed") {
          obras = obras.filter(obra => obra.id !== change.doc.id)
        }
      })
      this.setState({ obras })
    })
  }

  render() {
    return (
      <div className="container mt-2">
        <div className='card-columns'>
          {this.state.obras.map((obra) => (
            <ObraLeilao key={obra.id}
              id={obra.id}
              titulo={obra.titulo}
              foto={obra.foto}
              autor={obra.autor}
              minimo={obra.minimo} />
          ))}
        </div>
      </div>
    )
  }
}
