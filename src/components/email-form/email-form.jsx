import {useState, useEffect} from 'react';
import Header from '../header/header';
import { validateEmail } from '../../utils/utils';
import './styles/email-form.scss';

const EmailForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    topic: '',
    message: ''
  });

  const [blurState, setBlurState] = useState({
    email: false,
    topic: false,
    message: false
  });

  const [emailError, setEmailError] = useState(true);
  const [formError, setFormError] = useState(true);

  useEffect(() => {
    const isFormError = (emailError || Object.values(formState).some(x => x === ''));
    setFormError(isFormError);
  }, [emailError, formState])
  
  const blurHandler = e => {
    e.persist();
    setBlurState(prevState => ({
      ...prevState, ...{
        [e.target.name]: true
      }
    }))
  }

  const changeInputHandler = e => {
    e.persist();
    setFormState(prevState => ({
      ...prevState, ...{
        [e.target.name]: e.target.value
      }
    }))
  }

  const emailHandler = e => {
    changeInputHandler(e);
    const isEmailError = !validateEmail(e.target.value);
    setEmailError(isEmailError);
  }

  const submitHandler = e => {
    e.preventDefault();
    alert('Сообщение было успешно отправлено на указанный адрес');
    window.location.reload();
  }

  const {email, topic, message} = formState;
  return (
    <div className="email-form">
      <Header
        headerText="Почта"
      />
      <form className="email-form__wrapper" onSubmit={submitHandler}>
        <label className="email-form__field email-form__field_email">
          Email:
          <input
            className={`input${blurState.email ? (emailError ? ' incorrect' : ' correct') : ''}`}
            value={email}
            onChange={emailHandler}
            type="text" name="email" 
            onBlur={e => blurHandler(e)}
          />
        </label>
        <label className="email-form__field email-form__field_topic">
          Тема:
          <input 
            value={topic}
            onChange={changeInputHandler}
            className={`input${blurState.topic ? (topic.length ? ' correct' :' incorrect') : ''}`} 
            type="text" name="topic" 
            onBlur={e => blurHandler(e)}
          />
        </label>
        <textarea
          value={message}
          onChange={changeInputHandler}
          className={`email-form__field email-form__field_message${blurState.message ? (message.length ? ' correct' :' incorrect') : ''}`} 
          name="message" 
          onBlur={e => blurHandler(e)}
        />
        <input
          disabled={formError}
          type="submit" 
          value="Отправить" 
          className={`submit${formError ? ' invalid' : ''}`}
        />
      </form>
    </div>
  )
}

export default EmailForm;