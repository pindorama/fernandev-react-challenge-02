import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
});
const [error,setError] = useState(null);
const [isRequesting, setRequesting] = useState(false);

 const handleInputChange = (event) => {
 
  const {name, value} = event.target;
  setFormData({...formData, [name]: value});
};

const isFormValid = formData.email.length > 0 || formData.password.length > 6;

 const handelSubmit = () => {
  setError(null);
  setRequesting(true);
  let values = { email: formData.email, password: formData.password };
 login(values)
 .then(()=>{
  alert('congratulations');

 })
 .catch((error) => {
  alert('e-mail or password wrong.');

  setError(error);
  }).finally(() => {
    setRequesting(false);
  });

  };


  return (

    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className='errorMessage'>{error.message}</div>}
       
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input 
          value={formData.email}
           onChange={handleInputChange} 
           name= "email"
          type={'email'}
            id={'email'}
              autoComplete='off' />
        </div>
       
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input value={formData.password} onChange={handleInputChange}  name= "password" id={'password'} type={'password'} />
        </div>

        <div className='button'>
          <button type="submit" disabled={!isFormValid || isRequesting} onClick={handelSubmit} >Login</button>
        </div>
      </div>
    </div>
  );
}
