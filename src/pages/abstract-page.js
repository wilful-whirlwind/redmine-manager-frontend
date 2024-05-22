import React from "react";
import axios from "axios";

export class AbstractPage extends React.Component {
    constructor(props) {
        super(props);
        if (typeof window.electronAPI === "undefined") {
            window.electronAPI = {
                getTrackerList: async function(resolve, reject){
                    let trackerList = await axios.get('http://localhost:8081/trackers');
                    return trackerList;
                },
                getRedmineVersionList: async function () {
                    let versionList = await axios.get('http://localhost:8081/versions');
                    return versionList;
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
}