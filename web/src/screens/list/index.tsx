import React, { useState, useEffect } from 'react';
import './style.css';
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { PieChart, Pie, Cell, Legend } from 'recharts';
import InputMask from 'react-input-mask';
import { validateEmail, validateCPF, validateTelephone } from './validations'
import api from '../api'

interface User {
  name: string,
  telephone: string,
  sex: string
}

const COLORS = ['#007FFF', '#ff69b4']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function List() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<User[]>([])
  const [loader, setLoader] = useState(true)
  const [textSearch, setTextSearch] = useState('')

  // USER DATA
    const [newUserDataName, setNewUserDataName] = useState('')
    const [newUserDataCPF, setNewUserDataCPF] = useState('')
    const [newUserDataEmail, setNewUserDataEmail] = useState('')
    const [newUserDataSex, setNewUserDataSex] = useState('Masculino')
    const [newUserDataTelephone, setNewUserDataTelephone] = useState('')
  // ---------

  // ERROR 
    const [erroEmptyFields, setErroEmptyFields] = useState<Boolean>(false)
    const [erroCPF, setErroCPF] = useState<Boolean>(false)
    const [erroEmail, setErroEmail] = useState<Boolean>(false)
    const [erroTell, setErroTell] = useState<Boolean>(false)

    const [erroCPFAlreadyExisting, setErroCPFAlreadyExisting] = useState<Boolean>(false)
    const [erroEmailAlreadyExisting, setErroEmailAlreadyExisting] = useState<Boolean>(false)
    const [erroTellAlreadyExisting, setErroTellAlreadyExisting] = useState<Boolean>(false)

    const [erroConnect, setErroConnect] = useState<Boolean>(false)
  // -----

  const data = [
    {name: 'Masculino', value: users.filter(users => users.name.search(textSearch) > -1 && users.sex == 'Masculino').length},
    {name: 'Feminino', value: users.filter(users => users.name.search(textSearch) > -1 && users.sex == 'Feminino').length},
  ];

  const listUser = async (clear?: boolean) => {
    if(clear){
      setLoader(true)
      setErroConnect(false)
    }
    await api.get('/user')
    .then(r => {
      setUsers(r.data.users)
      setLoader(false)
    })
    .catch(e => {console.log(e); setErroConnect(true)})
  }
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetError = () => {
    setErroEmptyFields(false)
    setErroCPF(false)
    setErroEmail(false)
    setErroTell(false)
    setErroCPFAlreadyExisting(false)
    setErroEmailAlreadyExisting(false)
    setErroTellAlreadyExisting(false)
  }

  const resetInput = () => {
    setNewUserDataName('')
    setNewUserDataCPF('')
    setNewUserDataEmail('')
    setNewUserDataSex('')
    setNewUserDataTelephone('')
  }

  const createUser = async() => {
    resetError()
    var erro = 0

    if(
        !newUserDataName && 
        !newUserDataCPF &&
        !newUserDataEmail && 
        !newUserDataSex &&
        !newUserDataTelephone
      ){
      setErroEmptyFields(true)
      erro++
    }
    
    if(validateCPF(newUserDataCPF)){
      setErroCPF(true)
      erro++
    }

    if(validateEmail(newUserDataEmail)){
      
      setErroEmail(true)
      erro++
    }

    if(validateTelephone(newUserDataTelephone)){
      setErroTell(true)
      erro++
    }

    if(erro == 0){
      
      await api.post('/user', {
        name: newUserDataName,
        CPF: newUserDataCPF.replace('.','').replace('.','').replace('-',''),
        email: newUserDataEmail,
        sex: newUserDataSex,
        tell: newUserDataTelephone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
      })
      .then(r => {
        if(r.data.status == 'Success creating user'){          
          setTextSearch('')
          resetInput()
          setShow(false)
          listUser()
        }
      })
      .catch(e => {
        console.log(e.response.data)
        if(e.response.status == 403){
          switch(e.response.data.message){
            case 'CPF already used':
              setErroCPFAlreadyExisting(true)
            break;
            case 'Email already used':
              setErroEmailAlreadyExisting(true)
            break;
            case 'Telephone already used':
              setErroTellAlreadyExisting(true)
            break;
          }
        }
      })
    }
    
  }

  useEffect(() => {
    listUser()
  }, [])

  return (
    <>
      <div className='main-container-table'>        
        {
          loader ?
            <div className="loader" />
            :
            erroConnect ?
              <div className='container-error'>
                <h3>Erro ao conectar a api</h3>
                <Button variant="danger" onClick={() => listUser(true)}>Tentar novamente</Button>
              </div>
            :
            <>
              <div className='header-container-table'>
                <input className='input-search' placeholder='Pesquisar Aluno' value={textSearch} onChange={(event) => setTextSearch(event.target.value)} />
                <Button variant="outline-info" className='btn-registration' onClick={(handleShow)} >Cadastrar</Button>
              </div>

              {
                users.length > 0 ?
                <>
                  <PieChart width={160} height={160}>
                    <Pie
                      cx={75}
                      cy={75}
                      data={data}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>

                  <div className='container-legend'>
                    <div className='legend'>
                      <div className='legend-color' style={{backgroundColor: '#007FFF'}} />
                      <label className='text-legend'>Masculino</label>
                    </div>
                    <div className='legend'>
                      <div className='legend-color' style={{backgroundColor: '#ff69b4'}} />
                      <label className='text-legend'>Feminino</label>
                    </div>
                  </div>
                  <div className='container-table'>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Sexo</th>
                          <th>Tell</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          users.filter(users => users.name.search(textSearch) > -1).map((item: User, idx) => {
                            return(
                              <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.sex}</td>
                                <td>({item.telephone.toString().slice(0, 2)}) {item.telephone.toString().slice(2, 7)}-{item.telephone.toString().slice(7, 11)}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
                </>
                :
                <div className='container-error' style={{marginTop: '20px'}}>
                  <h3>Ainda nenhum aluno cadastrado</h3>
                </div>
              }
            </>

        }

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar aluno</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <div className='form'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome" value={newUserDataName} onChange={e => setNewUserDataName(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>CPF</Form.Label>
              <InputMask mask='999.999.999-99' className='form-control' placeholder='CPF' value={newUserDataCPF} onChange={e => setNewUserDataCPF(e.target.value)} />
              {
                erroCPF ? 
                  <Form.Text className="text-danger">
                    Favor inserir um CPF valido
                  </Form.Text>
                  : null
              }
              {
                erroCPFAlreadyExisting ? 
                  <Form.Text className="text-danger">
                    CPF ja usado
                  </Form.Text>
                  : null
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={newUserDataEmail} onChange={e => setNewUserDataEmail(e.target.value)} />
              {
                erroEmail ? 
                  <Form.Text className="text-danger">
                    Favor inserir um Email valido
                  </Form.Text>
                  : null
              }
              {
                erroEmailAlreadyExisting ? 
                  <Form.Text className="text-danger">
                    Email ja usado
                  </Form.Text>
                  : null
              }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telefone</Form.Label>
              <InputMask mask='(99) 99999-9999' className='form-control' placeholder='Telefone' value={newUserDataTelephone} onChange={e => setNewUserDataTelephone(e.target.value)}  />
              {
                erroTell ? 
                  <Form.Text className="text-danger">
                    Favor inserir um Telefone valido
                  </Form.Text>
                  : null
              }
              {
                erroTellAlreadyExisting ? 
                  <Form.Text className="text-danger">
                    Telefone ja usado
                  </Form.Text>
                  : null
              }
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>              
              <Form.Select value={newUserDataSex} onChange={e => setNewUserDataSex(e.target.value)} >
                <option value='Masculino'>Masculino</option>
                <option value='Feminino'>Feminino</option>
              </Form.Select>
            </Form.Group>

            <Modal.Footer>
              {
                erroEmptyFields ? 
                  <Form.Text className="text-danger">
                    Favor inserir todos os campos
                  </Form.Text>
                  : null
              }
              <Button variant="outline-danger" className='btn-registration' onClick={handleClose}>
                Fechar
              </Button>
              <Button variant="info" className='btn-registration text-light' onClick={createUser}>
                Cadastrar
              </Button>
            </Modal.Footer>
          </div>   

        </Modal.Body>

        
      </Modal>
    </>
  );
}

export default List;
