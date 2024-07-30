import React from "react";
import {TitleLabel} from "../components/title-label/title-label";
import {SectionLabel} from "../components/section-label/section-label";
import {AbstractPage} from "./abstract-page";

export class ConfigRedmine extends AbstractPage {
    constructor(props) {
        super(props);

        this.saveInfo = this.saveInfo.bind(this);
        this.saveTrackerId = this.saveTrackerId.bind(this);
        this.saveTrackerMonHoursDivision = this.saveTrackerMonHoursDivision.bind(this);
        this.send = this.send.bind(this);
        this.initializeTrackerInfo = this.initializeTrackerInfo.bind(this);
        this.renderTrackerTable = this.renderTrackerTable.bind(this);
        this.state = {
            "redmineTrackerList": [],
            "man-hours_division": [],
            "tracker_id": 0,
        };
    }

    async componentDidMount() {
        this.loadingStart();
        await this.setValues()
        this.loadingEnd();
    }

    async setValues() {
        const redmineConfig = await window.electronAPI.getRedmineTrackerList();
        console.log(redmineConfig);
        let state = {};
        state["redmineTrackerList"] = redmineConfig.redmineTrackerList ?? {};
        state["man-hours_division"] = this.initializeTrackerInfo(redmineConfig.redmineTrackerList, redmineConfig.trackerMonHoursDivisionList, "0");
        state["tracker_id"] = this.initializeTrackerInfo(redmineConfig.redmineTrackerList, redmineConfig.trackerActiveList, false);
        this.setState(state);
    }

    initializeTrackerInfo(redmineTrackerList, trackerInfoList, defaultValue) {
        if (!Array.isArray(trackerInfoList)) {
            trackerInfoList = [];
        }

        if (trackerInfoList.length < redmineTrackerList.length) {
            for (let i = 0; i < redmineTrackerList.length; i++) {
                trackerInfoList[redmineTrackerList[i].id] = trackerInfoList[redmineTrackerList[i].id] ?? defaultValue;
            }
        } else if (trackerInfoList.length > redmineTrackerList.length) {
            let isExist = false;
            for (let i = 1; i <= trackerInfoList.length; i++) {
                isExist = false;
                for (let j = 0; j < redmineTrackerList.length; j++) {
                    if (redmineTrackerList[j].id === i) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    delete trackerInfoList[i];
                }
            }
        }
        return trackerInfoList;
    }

    async send() {
        await window.electronAPI.saveRedmineConfig(this.state);
    }

    saveInfo(stateKey, namePrefix) {
        return function(event) {
            console.log(event.target);
            let state = this.state;
            let trackerId = event.target.name.replace(namePrefix, "");
            state[stateKey][trackerId] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            this.setState(state);
            console.log(this.state);
        }.bind((this));
    }

    saveTrackerId(event) {
        this.saveInfo("tracker_id", "tracker_id_")(event);
    }

    saveTrackerMonHoursDivision(event) {
        this.saveInfo("man-hours_division", "division_")(event);
    }

    renderTrackerTable() {
        console.log(this.state);
        let saveTrackerId = this.saveTrackerId;
        let saveTrackerMonHoursDivision = this.saveTrackerMonHoursDivision;
        let state = this.state;
        const rows = this.state.redmineTrackerList.map( function(redmineTracker, index) {
         return (
             <tr key={redmineTracker.id}>
                 <td>
                     <input type="checkbox" name={"tracker_id_" + redmineTracker.id}
                            checked={state["tracker_id"][redmineTracker.id]} onChange={saveTrackerId}/>
                 </td>
                 <td>
                     {redmineTracker.id}
                 </td>
                 <td>
                     {redmineTracker.name}
                 </td>
                 <td>
                     <select className="form-select" name={"division_" + redmineTracker.id}
                             onChange={saveTrackerMonHoursDivision}>
                         <option value="0"
                                 selected={state["man-hours_division"][redmineTracker.id] === "0"}>開発
                         </option>
                         <option value="1"
                                 selected={state["man-hours_division"][redmineTracker.id] === "1"}>テスト
                         </option>
                     </select>
                 </td>
             </tr>
         );
        });

        return (
            <table className="table mgr-tbl">
                <thead>
                <tr>
                    <th>有効</th>
                    <th>ID</th>
                    <th>トラッカー名</th>
                    <th>利用区分</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="content-main">
                <TitleLabel label="Redmine設定"/>
                <SectionLabel label="トラッカー設定"/>
                {this.renderTrackerTable()}
                <button className="btn btn-outline-primary" onClick={() => this.send()}>登録</button>
            </div>
        );
    }
}