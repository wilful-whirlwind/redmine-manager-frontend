import React, {useRef} from "react";
import {TitleLabel} from "../components/title-label/title-label";
import {SectionLabel} from "../components/section-label/section-label";
import {InputText} from "../components/input-text/input-text";
import {Message} from "../components/message/message";
import {AbstractPage} from "./abstract-page";

export class MasterProject extends AbstractPage {
    constructor(props) {
        super(props);
        this.state = {
            majorVersion: "",
            minorVersion: "",
            maintenanceVersion: "",
            developmentPeriodFrom: "",
            developmentPeriodTo: "",
            qaPeriodFrom: "",
            qaPeriodTo: "",
            releaseDate: ""
        }
        this.getInputTextValue = this.getInputTextValue.bind(this);
    }

    //stateのcountの値を更新するコールバック関数
    getInputTextValue( name, value ){
        let state = {};
        state[name] = value;
        this.setState(state) ;
    }
    render() {
        return (
            <div class="content-main">
                <TitleLabel label="Project Template List" />
            </div>
        );
    }
}