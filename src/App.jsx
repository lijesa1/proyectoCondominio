import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import VisitanteList from './components/VisitanteList'
import { getVisitantes, saveVisitante, udpatePhoto } from './api/VisitanteService';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VisitanteDetail from './components/VisitanteDetail';
import { toastError } from './api/ToastService';
import { ToastContainer } from 'react-toastify';
//import './App.css'

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    tower: '',
    title: '',
    status: '',
    departamento: '',
    motivo: '',
    fecha: '',
    personaContacto: '',
  });
  const getAllVisitantes = async (page = 0, size = 4) => {
    try {
      setCurrentPage(page);
      const { data } = await getVisitantes(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleNewVisitante = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveVisitante(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await udpatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        tower: '',
        title: '',
        status: '',
        departamento: '',
        motivo: '',
        fecha: '',
        personaContacto: '',
      })
      getAllVisitantes();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateVisitante = async (visitante) => {
    try {
      const { data } = await saveVisitante(visitante);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllVisitantes();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} nbOfVisitantes={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to={'/visitantes'} />} />
              <Route path="/visitantes" element={<VisitanteList data={data} currentPage={currentPage} getAllVisitantes={getAllVisitantes} />} />
              <Route path="/visitantes/:id" element={<VisitanteDetail updateVisitante={updateVisitante} updateImage={updateImage} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>Nuevo Visitante</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewVisitante}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Nombres</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Correo electrónico</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Título</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Celular</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Torre</span>
                <input type="text" value={values.tower} onChange={onChange} name='tower' required />
              </div>
              <div className="input-box">
                <span className="details">Departamento</span>
                <input type="text" value={values.departamento} onChange={onChange} name='departamento' required />
              </div>
              <div className="input-box">
                <span className="details">Motivo</span>
                <input type="text" value={values.motivo} onChange={onChange} name='motivo' required />
              </div>
              <div className="input-box">
                <span className="details">Fecha</span>
                <input type="date" value={values.fecha} onChange={onChange} name='fecha' required />
              </div>
              <div className="input-box">
                <span className="details">Contacto</span>
                <input type="text" value={values.personaContacto} onChange={onChange} name='personaContacto' required />
              </div>
              <div className="input-box">
                <span className="details">Estado</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Foto</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancelar</button>
              <button type='submit' className="btn">Guardar</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
