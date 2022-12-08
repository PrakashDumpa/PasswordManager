import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
// import ShowPasswordsList from '../ShowPasswordsList'
import './index.css'
import ShowPasswordsList from '../ShowPasswordsList'

const colorsList = ['color1', 'color2', 'color3', 'color4', 'color5']

class Home extends Component {
  state = {
    website: '',
    user: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    isClick: false,
    // isLengthZero: false,
  }

  changeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  changeUserName = event => {
    this.setState({user: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  addButton = event => {
    event.preventDefault()
    const {website, user, password} = this.state
    const index = parseInt(Math.random() * 5)
    if (website !== '' && user !== '' && password !== '') {
      const newItem = {
        id: uuidv4(),
        website,
        user,
        password,
        addColors: colorsList[index],
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newItem],
        website: '',
        user: '',
        password: '',
        // isLengthZero: false,
      }))
    }
  }

  searching = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickDeleteButton = id => {
    // const {isClick} = this.state

    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList})
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({isClick: !prevState.isClick}))
  }

  renderListView = filteredList => {
    const {isClick} = this.state

    return (
      <ul className="list-unstyled unordered_list mt-4">
        {filteredList.map(each => (
          <ShowPasswordsList
            eachPasswordItem={each}
            key={each.id}
            onClickDeleteButton={this.onClickDeleteButton}
            isClick={isClick}
          />
        ))}
      </ul>
    )
  }

  renderEmptyView = () => (
    <div className="empty_view">
      <img
        className="noPasswordImage"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  render() {
    const {website, user, password, searchInput, passwordsList} = this.state
    const filteredList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg_container">
        <div className="main_container">
          <div className="logo_container mb-3">
            <img
              className="w-50 h-100"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
          </div>

          <div className="userDetails_container p-4 mb-3">
            <form className="user_container p-4" onSubmit={this.addButton}>
              <h1 className="text-light userDetails_container_heading">
                Add New Password
              </h1>
              <div className="input_container mb-3">
                <img
                  className="h-75 ml-1 "
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  onChange={this.changeWebsiteName}
                  className="h-100 w-100 input_box pl-2"
                  placeholder="Enter Website"
                  value={website}
                />
              </div>
              <div className="input_container mb-3">
                <img
                  className="h-75 ml-1 "
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  className="h-100 w-100 input_box pl-2"
                  placeholder="Enter Username"
                  onChange={this.changeUserName}
                  value={user}
                />
              </div>
              <div className="input_container mb-3">
                <img
                  className="h-75 ml-1 "
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  className="h-100 w-100 input_box pl-2"
                  placeholder="Enter Password"
                  onChange={this.changePassword}
                  value={password}
                />
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary w-25">
                  Add
                </button>
              </div>
            </form>
            <div className="userDetails_image_container">
              <img
                className="userDetails_image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
              />
            </div>
          </div>

          <div className="yourPasswords_container p-4 mb-3">
            <div className="d-flex justify-content-between">
              <div className="passwords_counting_section">
                <h1 className="passwords_counting_section_heading m-0">
                  Your Passwords
                </h1>
                <p className="count_container rounded-pill m-0">
                  {filteredList.length}
                </p>
              </div>
              <div className="searching_section">
                <div className="search_icon m-0">
                  <img
                    className="w-100 ml-2 m-0"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <input
                  type="search"
                  className="h-100 pl-2 search_box"
                  placeholder="Search"
                  onChange={this.searching}
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="w-100" />
            <div className="show_passwords_container">
              <div className="sizing">
                <input
                  id="box"
                  type="checkbox"
                  className="check_box m-0"
                  onClick={this.onClickCheckBox}
                />

                <label htmlFor="box" className="m-0 pl-2">
                  Show passwords
                </label>
              </div>
            </div>
            {filteredList.length === 0
              ? this.renderEmptyView()
              : this.renderListView(filteredList)}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
