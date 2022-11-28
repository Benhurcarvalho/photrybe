import React, { Component } from 'react';
import { requestLogin } from '../Services/LoginApi'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        shouldShowEmailWarning: false,
        shouldShowPasswordWarning: false,
        isLoginFailed: false,
    }

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        
        const { email, password } = this.state;
        const ShowEmailWarning = !(email.includes('@') && email.toLowerCase().includes('.com'));
        const ShowPasswordWarning = !(password.length > 7);
        this.setState({
            shouldShowEmailWarning: ShowEmailWarning,
            shouldShowPasswordWarning: ShowPasswordWarning,
        }, this.requestLoginIfPossible)
    }

    requestLoginIfPossible = () => {
        const { shouldShowEmailWarning, shouldShowPasswordWarning } = this.state;
        const canRequestLogin = !shouldShowEmailWarning && !shouldShowPasswordWarning;
      
        if (canRequestLogin) {
          this.setState({ isLoading: true }, this.makeLogin);
        }
      }

      makeLogin = async () => {
        const { email, password } = this.state;
        const response = await requestLogin(email, password);
        const data = await response.json();
        console.log(data)
      
        this.setState({ isLoading: false }, () => {
          if (response.statusCode === 401) {
            this.loginFailed();
            return;
          }
      
          if (data.isAdmin) {
            this.props.history.push('/admin')
          } else {
            this.props.history.push('/home')
          }
        });
      }

    loginFailed = () => {
        this.setState({
            isLoginFailed: true,
        })
    }

  render() {
    const { 
        email,
        password,
        shouldShowEmailWarning,
        shouldShowPasswordWarning,
        isLoginFailed,
        isLoading,
    } = this.state;
    return (
      <div className='login-form-container'>
        <form className='form login-form box' onSubmit={ this.handleSubmit}>

            <h4 className='heading login-form-container-title'>Boas vindas ao Photrybe 

            <samp className='icon is-right'>
                <i className="fa-solid fa-camera">
            </i></samp>
            </h4>

            {
                isLoginFailed && 
                <div className='notification is-danger'>
                    Senha ou email incorretos!
                </div>
            }

            <div className='field control has-icons-left'>
                <input
                  className='input is-medium'
                  type="text" 
                  name='email'
                  id='email'
                  placeholder='Digite seu e-mail'
                  onChange={this.handleChange}
                  value={email}
                />
                <span className='icon is-small is-left'>
                    <i className='fas fa-envelope'></i>
                </span>
                { shouldShowEmailWarning &&
                    <p className='help is-danger'>Email deve estar no formato correto</p>
                }
            </div>

            <div className='field control has-icons-left'>
                <input
                  className='input is-medium'
                  type="password" 
                  name='password'
                  id='password'
                  placeholder='Digite sua senha'
                  onChange={this.handleChange}
                  value={password}
                />
                <span className='icon is-small is-left'>
                    <i className='fas fa-lock'></i>
                </span>
                { shouldShowPasswordWarning &&
                    <p className='help is-danger'>Senha deve ter no mínimo 8 caracteres</p>
                }
            </div>

            <div className='field is-grouped is-grouped-right'>
                <p className='control'>
                    <button className={`button is-primary ${ isLoading && 'is-loading'}`}>Login</button>
                </p>
            </div>
        </form>
      </div>
    )
  }
}
