import React from 'react';
import Visitante from "./Visitante"

const VisitanteList = ({ data, currentPage, getAllVisitantes }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>Sin Visitantes. Por favor agregue un nuevo Visitante</div>}

            <ul className='contact__list'>
                {data?.content?.length > 0 && data.content.map(visitante => <Visitante visitante={visitante} key={visitante.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getAllVisitantes(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllVisitantes(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllVisitantes(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }
        </main>
    )
}

export default VisitanteList