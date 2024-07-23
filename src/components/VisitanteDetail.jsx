import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVisitante } from '../api/VisitanteService';
import { toastError, toastSuccess } from '../api/ToastService';

const VisitanteDetail = ({ updateVisitante, updateImage }) => {
    const inputRef = useRef();
    const [visitante, setVisitante] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        tower: '',
        title: '',
        status: '',
        photoUrl: ''
    });

    const { id } = useParams();

    const fetchVisitante = async (id) => {
        try {
            const { data } = await getVisitante(id);
            setVisitante(data);
            console.log(data);
            //toastSuccess('Contact retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const udpatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setVisitante((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            toastSuccess('Foto actualizada');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange = (event) => {
        setVisitante({ ...visitante, [event.target.name]: event.target.value });
    };

    const onUpdateVisitante = async (event) => {
        event.preventDefault();
        await updateVisitante(visitante);        
        fetchVisitante(id);
        toastSuccess('Visitante Actualizado');
    };

    useEffect(() => {
        fetchVisitante(id);
    }, []);

    return (
        <>
            <Link to={'/visitantes'} className='link'><i className='bi bi-arrow-left'></i>Volver a la lista de Visitantes</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={visitante.photoUrl} alt={`Profile photo of ${visitante.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{visitante.name}</p>
                        <p className='profile__muted'>JPG, GIF, o PNG. tamaño máximo de 10MB</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Cambiar Foto</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateVisitante} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={visitante.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Nombres</span>
                                    <input type="text" value={visitante.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Correo Electrónico</span>
                                    <input type="text" value={visitante.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Celular</span>
                                    <input type="text" value={visitante.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Torre</span>
                                    <input type="text" value={visitante.tower} onChange={onChange} name="tower" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Título</span>
                                    <input type="text" value={visitante.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Estado</span>
                                    <input type="text" value={visitante.status} onChange={onChange} name="status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default VisitanteDetail;