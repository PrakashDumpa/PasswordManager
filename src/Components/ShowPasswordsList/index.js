import './index.css'

const ShowPasswordsList = props => {
  const {eachPasswordItem, onClickDeleteButton, isClick} = props
  const {user, website, password, id, addColors} = eachPasswordItem

  const firstLetter = website[0].toUpperCase()

  const deleteButton = () => {
    onClickDeleteButton(id)
  }

  const addClassToDeleteButton = isClick
    ? 'delete_Button'
    : 'clickAfterDeleteButton'

  return (
    <li className="listItem p-3">
      <div className="w-25">
        <div className={`rounded-circle letter_container ${addColors}`}>
          <p className="m-0 letter">{firstLetter}</p>
        </div>
      </div>
      <div className="description_container ml-2">
        <div className="">
          <p className="m-0">{website}</p>
          <p className="m-0">{user}</p>
          {isClick ? (
            <p className="m-0">{password}</p>
          ) : (
            <img
              className="stars_image m-0"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button
          type="button"
          className={addClassToDeleteButton}
          onClick={deleteButton}
          // eslint-disable-next-line react/no-unknown-property
          testid="delete"
        >
          <img
            className="delete_image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default ShowPasswordsList
