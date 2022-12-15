import { ref, set, update, remove, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import ModalCreate from '../components/ModalCreate'
import ModalEmail from '../components/ModalEmail'
import { useAuth } from '../context/AuthContext'
import { database } from '../firebase/firebase'
import '../styles/home.css'

const Home = () => {

  const { user, signout, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signout()
  }

  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("")

  //fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  //fields

  const [openModal, setOpenModal] = useState(false)
  const [openModalEmail, setOpenModalEmail] = useState(false)

  //handleToChanges
  const handleToChangeFirstName = (e) => {
    setFirstName(e.target.value);
  }
  const handleToChangeLastName = (e) => {
    setLastName(e.target.value);
  }
  const handleToChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  //handleToChanges

  //C.R.U.D
  const CreateToDatabase = () => {
    const uuid = uid();
    set(ref(database, `/${uuid}`), {
      uuid,
      firstName,
      lastName,
      email
    })

    setFirstName("");
    setLastName("");
    setEmail("");
    setOpenModal(false);
  }

  //Read
  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setContacts([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((firstName) => {
          setContacts((oldArray) => [...oldArray, firstName]);
        })
      }
    })
  }, [])
  //Update
  const handleUpdate = (data) => {
    setIsEdit(true);
    setOpenModal(true);
    setTempUuid(data.uuid);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  }

  const handleSubmitChange = () => {
    update(ref(database, `/${tempUuid}`), {
      firstName,
      lastName,
      email,
      uuid: tempUuid,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setOpenModal(false);
    setIsEdit(false);
  }
  //Delete
  const handleDelete = (data) => {
    remove(ref(database, `/${data.uuid}`))
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleReset = () => {
    setIsEdit(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setOpenModal(false);
  }

  const handleOpenModalEmail = (data) => {
    setOpenModalEmail(true)
    setEmail(data.email)
    setFirstName(data.firstName)
  }

  const handleCloseModalEmail = () => {
    setOpenModalEmail(false)
    setFirstName("")
    setEmail("")
  }

  return (
    <div className="Home__container container">
      {
        isLoading
          ?
          <h1>Esta cargando</h1>
          :
          <div className='CRUD'>
            {
              openModal ? 
              <ModalCreate 

              handleToChangeFirstName={handleToChangeFirstName}
              handleToChangeLastName={handleToChangeLastName}
              handleToChangeEmail={handleToChangeEmail}
              handleReset={handleReset}

              CreateToDatabase={CreateToDatabase}
              handleSubmitChange={handleSubmitChange}

              firstName={firstName}
              lastName={lastName}
              email={email}
              isEdit={isEdit}
              />
              :
              <></>
            }
            {
              openModalEmail ? 
              <ModalEmail

              handleCloseModalEmail={handleCloseModalEmail}

              firstName={firstName}
              email={email}
              />
              :
              <></>
            }

            <h1 className='tittle__home card-panel teal lighten-2'>My Contacts</h1>
            <div className="btn__create">
              <button className='waves-effect waves-light btn blue' onClick={handleOpenModal}>Create a New Contact</button>
            </div>
            <table className='personal__table responsive-table centered striped'>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Update</th>
                  <th>Send Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.uuid}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td><button className='waves-effect waves-light btn-small #fbc02d yellow darken-2' onClick={() => handleUpdate(contact)}>Update</button></td>
                    <td><button className='waves-effect waves-light btn-small green' onClick={() => handleOpenModalEmail(contact)}>Send</button></td>
                    <td><button className='waves-effect waves-light btn-small #f44336 red' onClick={() => handleDelete(contact)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="logout__btn">
              <button className='waves-effect waves-light btn #f44336 red' onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
      }
    </div>
  )
}

export default Home