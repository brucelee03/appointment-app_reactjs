import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    showOnlyStarred: false,
  }

  onAddingTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddingDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    const {showOnlyStarred} = this.state
    this.setState({showOnlyStarred: !showOnlyStarred})
  }

  render() {
    const {
      titleInput,
      dateInput,
      appointmentsList,
      showOnlyStarred,
    } = this.state
    return (
      <div className="appointment-section">
        <div className="appointment-card">
          <div className="adding-appointment-section">
            <form
              onSubmit={this.onClickAddAppointment}
              className="appointment-form"
            >
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                onChange={this.onAddingTitle}
                value={titleInput}
                placeholder="Title"
                id="title"
                className="input"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                onChange={this.onAddingDate}
                value={dateInput}
                id="date"
                className="input"
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <div className="appointments-list-container">
            <div className="list-nav">
              <div>
                <h1 className="sub-heading">Appointments</h1>
              </div>
              <button
                type="button"
                onClick={this.onClickStarredButton}
                className="starred-btn"
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {showOnlyStarred
                ? appointmentsList
                    .filter(appointment => appointment.isStarred === true)
                    .map(eachAppointment => (
                      <AppointmentItem
                        key={eachAppointment.id}
                        appointmentDetails={eachAppointment}
                        toggleIsStarred={this.toggleIsStarred}
                      />
                    ))
                : appointmentsList.map(eachAppointment => (
                    <AppointmentItem
                      key={eachAppointment.id}
                      appointmentDetails={eachAppointment}
                      toggleIsStarred={this.toggleIsStarred}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
