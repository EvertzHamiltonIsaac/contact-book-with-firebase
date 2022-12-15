import React from 'react';
import emailjs from '@emailjs/browser';
import '../styles/modal.css'

const ModalEmail = ({ email, handleCloseModalEmail, firstName }) => {

  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_rwx3s0x', 'template_uk7ascm', e.target, 'eXPAhbcAOn_n_buXB')
      .then((result) => {
        console.log(result.text);
        handleCloseModalEmail();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <section className="modal__container">
      <article className="modal__email__card">
        <h3>Mailer</h3>
        <form className='modalEmail__form' onSubmit={handleSendEmail}>

          <div className="form__email">
            <label htmlFor="user_email">Email</label>
            <input type="email" name="user_email" value={email} />
          </div>

          <div className="form__name">
            <label htmlFor="user_name">Name</label>
            <input type="text" name="user_name" value={firstName} />
          </div>
          
          <div className="form__textArea input-field">
            <label htmlFor="user_message">Message</label>
            <textarea name="user_message" id="textarea1" className='materialize-textarea' cols="30" rows="10"></textarea>
          </div>

          <div className="modalEmail__btns">
            <button className='waves-effect waves-light btn-small green'>Send</button>
          </div>
        </form>
        <div className="modalEmail__btn">
          <button onClick={handleCloseModalEmail} className="waves-effect waves-light btn-small #f44336 red">X</button>
        </div>
      </article>
    </section>
  )
}

export default ModalEmail