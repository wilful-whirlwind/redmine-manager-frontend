import React, {useEffect, useState} from "react";
import {TitleLabel} from "../components/title-label/title-label";
import { useLocation } from "react-router-dom";
import {AbstractPage} from "./abstract-page";

export function EditUser() {
    const abstractPage = new AbstractPage();
    const location = useLocation();
    const id = location.state.id;
    const [name, setUserName] = useState();
    const [mailAddress, setMailAddress] = useState();
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
        callFunc();
    }, []);

    const updateUser = async (e) => {
        abstractPage.loadingStart();
        await window.electronAPI.updateUser(id, name, mailAddress);
        abstractPage.loadingEnd();
    };

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
                </tbody>
            </table>
            <div>
                <button onClick={updateUser} className={'btn btn-outline-secondary'}>更新</button>
            </div>
        </div>
    );
}