import React from "react";
import axios from "axios";

export class AbstractPage extends React.Component {
    constructor(props) {
        super(props);
        if (typeof window.electronAPI === "undefined") {
            window.electronAPI = {
                getEnv: function() {
                    return "WEB";
                },
                getTrackerList: async function(resolve, reject){
                    let trackerList = await axios.get('https://localhost:8081/trackers');
                    return trackerList.data;
                },
                getRedmineTrackerList: async function(resolve, reject){
                    let trackerList = await axios.get('https://localhost:8081/trackers');
                    return trackerList.data;
                },
                getRedmineVersionList: async function () {
                    let versionList = await axios.get('https://localhost:8081/versions');
                    return versionList.data;
                },
                loadConfig: async function () {
                    let configList = await axios.get('https://localhost:8081/config');
                    return configList.data;
                },
                saveConfig: async function(data) {
                    return await axios.post('https://localhost:8081/config', data);
                },
                authUser: async function(userName, password) {
                    let userInfo = await axios.post('https://localhost:8081/auth', {
                        user_name: userName,
                        password: password
                    });
                    console.log(userInfo);
                    return userInfo.data;
                },
                getUserList: async function() {
                    const userList = await axios.get('https://localhost:8081/user');
                    return userList.data;
                },
                updateUser: async function(userId, userName, mailAddress) {
                    return await axios.post('https://localhost:8081/user', {
                        id: userId,
                        user_name: userName,
                        mail_address: mailAddress
                    });
                },
                createUser: async function(userName, mailAddress, password) {
                    return await axios.post('https://localhost:8081/user', {
                        user_name: userName,
                        mail_address: mailAddress,
                        password: password
                    });
                }
            };
        }
    }

    saveInfo(stateKey, namePrefix) {
        return function(event) {
            let state = this.state;
            let index = event.target.name.replace(namePrefix, "");
            state[stateKey][index] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            this.setState(state);
        }.bind((this));
    }

    loadingStart() {
        document.getElementById('loading').style.display = 'block';
    }

    loadingEnd(message = "") {
        document.getElementById('loading').style.display = 'none';
    }

    showMessage(message) {
        document.getElementById('modal-open').click();
        document.getElementById('modal-body-default').innerHTML = message;
    }
}