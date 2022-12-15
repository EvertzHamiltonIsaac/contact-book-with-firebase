import React from 'react'
import '../styles/modal.css'

const ModalCreate = ({ handleToChangeFirstName, handleToChangeLastName, handleToChangeEmail, firstName, lastName, email, isEdit, CreateToDatabase, handleSubmitChange, handleReset }) => {
    return (
        <div className='modal__container'>
            <div className="modal__card ">
            {
                isEdit ? <h3>Update Data</h3> 
                : <h3>Create Data</h3> 
            }
            <div className='modal__firstName'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name='firstName' id='IdfirstName' placeholder='Enter your firstName' value={firstName} onChange={handleToChangeFirstName} />
            </div>

            <div className='modal__lastName'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name='lastName' id='IdlastName' placeholder='Enter your lastName' value={lastName} onChange={handleToChangeLastName} />
            </div>

            <div className='modal__email'>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='Idemail' placeholder='Enter your email' value={email} onChange={handleToChangeEmail} />
            </div>

            {isEdit ? (
                <div className='btns__update__modal'>
                    <button onClick={handleSubmitChange} className='waves-effect waves-light btn'>Update</button>
                    <button onClick={handleReset} className='waves-effect waves-light btn red'>X</button>
                </div>
            ) : (
                <div className="btns__create__modal">
                    <button onClick={CreateToDatabase} className='waves-effect waves-light btn'>Create</button>
                    <button onClick={handleReset} className='waves-effect waves-light btn red' >X</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default ModalCreate