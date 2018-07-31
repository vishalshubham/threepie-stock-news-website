import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Dispatch } from 'redux';
import 'src/build/client/scripts/containers/login/styles/LoginContainer.css';
import { loginSession } from 'src/client/scripts/store/actions';

interface LoginContainerProps {
	username?: any;
	password?: any;
  dispatch?: Dispatch<any>;
}

class LoginContainer extends React.Component<LoginContainerProps, any> {

	constructor(props) {
    super(props);
    this.state = {
			username: '',
			password: ''
    };
	}

	public emitEmpty = () => {
    this.setState({ username: '' });
	}
	
	public onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
	}

	public onChangePassword = (e) => {
    this.setState({ password: e.target.value });
	}

	public handleSubmit = (e) => {
		const username = this.state.username;
		const password = this.state.password;
		this.props.dispatch(loginSession({
			username,
			password,
			isSessionActive: false
    }));
  }

  public render(): JSX.Element {
		const { username } = this.state.username;
		const suffix = username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
			<div className="login-container">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Input
						className="login-form-input-username"
  	      	placeholder="Enter your username"
	        	prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
      	  	suffix={suffix}
  	  	    onChange={this.onChangeUserName}
    	  	/>
					<Input
						className="login-form-input-password"
						placeholder="Enter your password"
						type="password"
        		prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      		  suffix={suffix}
  		      onChange={this.onChangePassword}
	      	/>
					<Button type="primary" htmlType="submit" className="login-form-button">
            Log in
      	  </Button>
				</Form>
      </div>
    );
  }
}

export default LoginContainer;
