import React from "react";
import {AbstractPage} from "../../pages/abstract-page";

/**
 * ログインフォームクラス
 */
export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
        this.authUser = this.authUser.bind(this);
        this.state = {
            user_name: "",
            password: ""
        };
    }

    changeState(key) {
        return function(event) {
            let stateValue = {};
            stateValue[key] = event.target.value;
            this.setState(stateValue);
        }.bind(this);
    }

    async authUser() {
       const result = await window.electronAPI.authUser(this.state.user_name, this.state.password);
       if (result.status === "success") {
           if (result.user) {
               this.props.callback(result.user);
           }
       }
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                position: 'relative'
            }}>
                <div style={{
                    width: '30%',
                    position: 'absolute',
                    top: '30%',
                    right: '35%'
                }}>
                    <h2 style={{
                        display: "inline-block",
                        marginTop: "12px",
                        borderLeft: "solid 7px #2c3034",
                        borderBottom: "solid 1px #2c3034",
                        paddingLeft: "3px",
                        paddingRight: "7px",
                        marginBottom: "12px"
                    }}>Project Management Helper</h2>
                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="user_name" name={'user_name'} value={this.state.user_name} onChange={this.changeState('user_name')}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name={'password'} value={this.state.password} onChange={this.changeState('password')}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.authUser}>Login</button>
                </div>
            </div>
        );
    }
}
