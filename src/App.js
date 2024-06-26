import React from 'react';
import './index.css';
import {CreateRedmineVersion} from "./pages/create-redmine-version";
import {Config} from "./pages/config";
import {SideMenu} from "./components/side-menu/side-menu";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Management} from "./pages/management";
import {ListTask} from "./pages/list-task";
import {CreateTask} from "./pages/create-task";
import {Reports} from "./pages/reports";
import {ConfigRedmine} from "./pages/config-redmine";
import {ListRedmineVersion} from "./pages/list-redmine-version";
import {EditRedmineVersion} from "./pages/edit-redmine-version";
import {LoginForm} from "./components/login-form/login-form";
import {AbstractPage} from "./pages/abstract-page";
import {Home} from "./pages/home";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {MasterUser} from "./pages/master-user";
import {MasterProject} from "./pages/master-project";
import {EditUser} from "./pages/edit-user";
import {Loading} from "./components/loading/loading";
import {Message} from "./components/message/message";
import {MessageModal} from "./components/message-modal/message-modal";


class Top extends AbstractPage {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      userId: cookies.get('user_id') || -1
    };
    this.transitionToVersionDetailPage = this.transitionToVersionDetailPage.bind(this);
    this.transitionToCreateTaskPage = this.transitionToCreateTaskPage.bind(this);
    this.renderLoginPageStructure = this.renderLoginPageStructure.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.userId > 0) {
      window.location.href = "#/home";
    }
  }

  transitionToVersionDetailPage(name, value, key) {
    let state = {};
    state[name] = value;
    this.setState(state);
    document.getElementById("id-edit").click();
  }

  transitionToCreateTaskPage(name, value) {
    let state = {};
    state[name] = value;
    this.setState(state);
    document.getElementById("edit-task").click();
  }

  renderLoginPageStructure() {
    if (this.state.userId > 0) {
      return (
        <HashRouter>
          <div className="row" id="content-field" style={{
            paddingBottom: "10px"
          }}>
            <div className="col-2" id="side-menu-field">
              <SideMenu callback={this.logout}/>
            </div>
            <div className="col-10" id="main-content-field" style={{
              paddingLeft: "10px",
              overflowY: "scroll",
              height: "100%",
              paddingBottom: "10px"
            }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/create-redmine-version" element={<CreateRedmineVersion />} />
                <Route path="/list-redmine-version" element={<ListRedmineVersion callback={this.transitionToVersionDetailPage}/>} />
                <Route path="/edit-redmine-version" element={<EditRedmineVersion id={this.state.id}/>}/>
                <Route path="/list-task" element={<ListTask callback={this.transitionToCreateTaskPage} />} />
                <Route path="/list-task/create-task" element={<CreateTask id={this.state.task_id} />} />
                <Route path="/management" element={<Management />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/master-user" element={<MasterUser />} />
                <Route path="/master-user/edit-user" element={<EditUser id={this.state.user_id}/>} />
                <Route path="/master-project" element={<MasterProject />} />
                <Route path="/config" element={<Config />} />
                <Route path="/config-redmine" element={<ConfigRedmine />} />
              </Routes>
            </div>
          </div>
          <Loading />
          <MessageModal />
        </HashRouter>
      );
    } else {
      return (this.renderLoginForm());
    }
  }

  login(user) {
    let state = {
      userId: user.Id
    };
    const { cookies } = this.props;
    console.log(user);
    cookies.set('user_id', user.Id, { path: '/' });

    this.setState(state);
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove('user_id');
    window.location.reload();
  }

  renderLoginForm() {
    return (<LoginForm callback={this.login}></LoginForm>);
  }

  render() {
    return (
      <div class="top container-fluid">
        <script src="../public/style/style.js"></script>
        {this.renderLoginPageStructure()}
      </div>
    );
  }
}

// ========================================

export default withCookies(Top)
