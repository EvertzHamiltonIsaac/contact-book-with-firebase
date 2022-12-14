import { ref, set, update, remove, onValue } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { useAuth } from '../context/AuthContext'
import { database } from '../firebase/firebase'


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
    setTempUuid(data.uuid);
    setFirstName(data.firstName);
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
    setIsEdit(false);
  }
  //Delete
  const handleDelete = (data) => {
    remove(ref(database, `/${data.uuid}`))

  }

  console.log(user);
  return (
    <div className="Home__container">
      {
        isLoading
          ?
          <h1>Esta cargando</h1>
          :
          <div className='CRUD'>
            <div>
              <input type="text" value={firstName} onChange={handleToChangeFirstName} />
            </div>
            <div>
              <input type="text" value={lastName} onChange={handleToChangeLastName} />
            </div>
            <div>
              <input type="text" value={email} onChange={handleToChangeEmail} />
            </div>

            {isEdit ? (
              <div>
                <button onClick={handleSubmitChange}>Submit Changes</button>
                <button onClick={() => {
                  setIsEdit(false);
                  setFirstName("");
                }}>X</button>
              </div>
            ) : (
              <button onClick={CreateToDatabase}>Submit</button>
            )}
            {contacts.map(contact => (
              <div key={contact.uuid}>
                <h1>{contact.firstName}</h1>
                <button onClick={() => handleUpdate(contact)}>Update</button>
                <button onClick={() => handleDelete(contact)}>Delete</button>
              </div>
            ))}
            <button onClick={handleSignOut}>Sign Out</button>
          </div>   
      }
    </div>

  )
}

export default Home