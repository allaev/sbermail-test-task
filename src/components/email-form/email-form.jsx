import {useState, useEffect} from 'react';
import './styles/email-form.scss';

const EmailForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    topic: '',
    message: ''
  });

  const [emailTouched, setEmailTouched] = useState(false);
  const [topicTouched, setTopicTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);

  const [emailError, setEmailError] = useState(true);

  const blurHandler = e => {
    const name = e.target.name;
    switch (name) {
      case 'email':
        setEmailTouched(true);
        break;
      case 'topic':
        setTopicTouched(true);
        break;
      case 'message':
        setMessageTouched(true);
        break;
      default:
        return;
    }
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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailError = !re.test(String(e.target.value).toLowerCase());
    setEmailError(isEmailError);
  }

  const {email, topic, message} = formState;
  return (
    <div className="email-form">
      <h1 className="header-text">
        @Почта
      </h1>
      <form className="email-form__wrapper">
        <label className="email-form__field email-form__field_email">
          Email:
          <input 
            className={`input${(emailError && emailTouched) ? ' incorrect' : ''}`}
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
            className={`input${(!topic.length && topicTouched) ? ' incorrect' : ''}`} 
            type="text" name="topic" 
            onBlur={e => blurHandler(e)}
          />
        </label>
        <textarea
          value={message}
          onChange={changeInputHandler}
          className={`email-form__field email-form__field_message${(!message.length && messageTouched) ? ' incorrect' :''}`} 
          name="message" 
          onBlur={e => blurHandler(e)}
        />
        <input type="submit" value="Отправить" className="submit"/>
      </form>
    </div>
  )
}

export default EmailForm;