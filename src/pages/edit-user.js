import React, {useEffect, useState} from "react";
import {TitleLabel} from "../components/title-label/title-label";
import { useLocation } from "react-router-dom";
import {AbstractPage} from "./abstract-page";

export function EditUser() {
    const abstractPage = new AbstractPage();
    const location = useLocation();
    const id_prop = location.state.id;
    const [id, setId] = useState(id_prop);
    const [name, setUserName] = useState();
    const [mailAddress, setMailAddress] = useState();
    const [password, setPassword] = useState();
    const btnLabel = id > 0 ? "更新" : "登録";
    useEffect(() => {
        const callFunc = async function() {
            abstractPage.loadingStart();
            const result = await window.electronAPI.getUserList();
            if (result.status === 'success') {
                const userList = result.userList;
                for (let i = 0; i < userList.length; i++) {
                    if (id !== userList[i].Id) {
                        continue;
                    }
                    setUserName(userList[i].Name);
                    setMailAddress(userList[i].MailAddress);
                    break;
                }
            }
            abstractPage.loadingEnd();
        }
        if (id > 0) {
            callFunc();
        }
    }, []);

    const updateUser = async (e) => {
        let message = "";
        abstractPage.loadingStart();
        if (id > 0) {
            await window.electronAPI.updateUser(id, name, mailAddress);
            message = "更新しました";
        } else {
           const result = await window.electronAPI.createUser(name, mailAddress, password);
           console.log(result);
           if (result.data.status === "success") {
               setId(result.data.user.Id);
               message = "登録しました";
           }
        }
        abstractPage.loadingEnd();
        abstractPage.showMessage(message);
    };

    const setPasswordForm = () => {
        if (id < 0) {
            return (
                <tr>
                    <th>Password</th>
                    <td>
                        <input
                            type={"password"}
                            className={"form-control"}
                            name={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </td>
                </tr>
            );
        } else {
            return (<></>);
        }
    }

    return (
        <div className="content-main">
            <TitleLabel label="Edit User"/>
            <table className="table mgr-tbl" id="task-list">
                <tbody>
                <tr>
                    <th>ID</th>
                    <td>{id}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        <input
                            className={"form-control"}
                            name={'name'}
                            value={name}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Mail Address</th>
                    <td>
                        <input
                            className={"form-control"}
                            name={'mail_address'}
                            value={mailAddress}
                            onChange={(e) => setMailAddress(e.target.value)}
                        />
                    </td>
                </tr>
                {setPasswordForm()}
                </tbody>
            </table>
            <div>
                <button onClick={updateUser} className={'btn btn-outline-secondary'}>
                    {btnLabel}
                </button>
            </div>
        </div>
    );
}