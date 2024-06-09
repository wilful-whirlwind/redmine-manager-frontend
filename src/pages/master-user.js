import React, {useEffect, useState} from "react";
import {TitleLabel} from "../components/title-label/title-label";
import {Link} from "react-router-dom";

export function MasterUser() {
    const [userList, setUserList] = useState([]);
    // useEffectの引数の関数はasyncにしないこと！ 別画面に遷移したときにエラーになる。
    useEffect(() => {
        const callFunc = async function() {
            const result = await window.electronAPI.getUserList();
            if (result.status === 'success') {
                setUserList(result.userList);
            }
        }
        callFunc();
    }, []);
    console.log(userList);

    const renderRow = function(userList) {
        const rows = userList.map((user) =>
            <tr key={user.id}>
                <td>
                    <Link to={'edit-user'} className="btn btn-link" state={{ id: user.Id }}>
                        {user.Id}
                    </Link>
                </td>
                <td>
                    <a className="btn btn-link" href={user.url}>
                        {user.Name}
                    </a>
                </td>
                <td>
                {user.MailAddress}
                </td>
            </tr>
        );

        return (
            <table className="table mgr-tbl" id="task-list">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mail Address</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }

    return (
        <div class="content-main">
            <TitleLabel label="User List" />
            {renderRow(userList)}
        </div>
    );
}