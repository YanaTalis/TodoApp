import React, { Component } from 'react'
import './TodoListItem.css'

export default class TodoListItem extends Component {
  state = {
    done: false,
    important: false,
  }

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
    } = this.props

    let classNames = 'todo-list-item'
    if (done) {
      classNames += ' done'
    }

    if (important) {
      classNames += ' important'
    }

    return (
      <div className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    )
  }
}

// const TodoListItemFu = ({ label, important = false }) => {
//   const style = {
//     color: important ? 'rgb(24, 122, 202)' : 'black',
//     fontWeight: important ? 'bold' : 'normal',
//   }

//   return (
//     <div className="todo-list-item">
//       <span className="todo-list-item-label" style={style}>
//         {label}
//       </span>

//       <button
//         type="button"
//         className="btn btn-outline-success btn-sm float-right"
//       >
//         <i className="fa fa-exclamation" />
//       </button>

//       <button
//         type="button"
//         className="btn btn-outline-danger btn-sm float-right"
//       >
//         <i className="fa fa-trash" />
//       </button>
//     </div>
//   )
// }
