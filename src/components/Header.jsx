import React from 'react'

const Header = ({ toggleModal, nbOfVisitantes }) => {
    return (
        <header className='header'>
            <div className='container'>
                <h3>Total Visitantes ({nbOfVisitantes})</h3>
                <button onClick={() => toggleModal(true)} className='btn'>
                    <i className='bi bi-plus-square'></i>Nuevo Visitante
                </button>
            </div>
        </header>
    )
}

export default Header