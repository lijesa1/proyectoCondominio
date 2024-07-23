import React from 'react'
import { Link } from 'react-router-dom'

const Visitante = ({ visitante }) => {
  return (
    <Link to={`/visitantes/${visitante.id}`} className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <img src={visitante.photoUrl} alt={visitante.name}  />
                </div>
                <div className="contact__details">
                    <p className="contact_name">{visitante.name.substring(0, 15)} </p>
                    <p className="contact_title">{visitante.title}</p>
                </div>
            </div>
            <div className="contact__body">
                <p><i className="bi bi-envelope"></i> {visitante.email.substring(0, 20)} </p>
                <p><i className="bi bi-geo"></i> {visitante.tower}</p>
                <p><i className="bi bi-telephone"></i> {visitante.phone}</p>
                <p>{visitante.status === 'Active' ? <i className='bi bi-check-circle'></i> : 
                    <i className='bi bi-x-circle'></i>} {visitante.status}</p>
            </div>
        </Link>
  )
}

export default Visitante