import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-success navbar-dark">
         <Link className="navbar-brand" to="/">Leilão de Obras de Arte</Link>
      </nav>
    )
  }
}
