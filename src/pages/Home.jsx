import { ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { database } from '../firebase/firebase'

const Home = () => {

  //fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  //fields

  //handleToChanges
  const handleToChangeFirstName = (e) => {

  }
  const handleToChangeLastName = (e) => {

  }
  const handleToChangeEmail = (e) => {

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
  //C.R.U.D

  return (
    <div>Home</div>
  )
}

export default Home