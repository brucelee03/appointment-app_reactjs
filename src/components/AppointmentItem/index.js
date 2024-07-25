import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStarred = () => {
    toggleIsStarred(id)
  }

  const starredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-details">
      <div className="bar">
        <div>
          <p className="title">{title}</p>
        </div>
        <button
          type="button"
          onClick={onClickStarred}
          data-testid="star"
          className="button"
        >
          <img src={starredImgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
