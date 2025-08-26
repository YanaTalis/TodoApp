import React, { Component } from 'react'

import AppHeader from '../AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import ItemAddForm from '../ItemAddForm'

import './App.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [],
    term: '',
    filter: 'all',
    theme: 'light', // светлая тема по умолчанию
  }

  // Метод для переключения темы
  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }))
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)

      const newData = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)]

      return {
        todoData: newData,
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newData = [newItem, ...todoData]

      return {
        todoData: newData,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const ind = arr.findIndex((el) => el.id === id)
    const oldItem = arr[ind]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)]
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  render() {
    const { todoData, term, filter } = this.state

    const showItems = this.filter(this.search(todoData, term), filter)

    const countDone = todoData.filter((el) => el.done).length

    const countTodo = todoData.length - countDone

    // Theme class for body
    document.body.className = this.state.theme + '-theme'
    return (
      <div className="todo-app">
        <button
          className="btn btn-sm btn-outline-secondary mb-2"
          onClick={this.toggleTheme}
          aria-label="Toggle theme"
          style={{ fontSize: '1.3rem', lineHeight: 1 }}
        >
          {this.state.theme === 'light' ? (
            <span role="img" aria-label="dark mode">
              🌙
            </span>
          ) : (
            <span role="img" aria-label="light mode">
              ☀️
            </span>
          )}
        </button>
  <AppHeader toDo={countTodo} done={countDone} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={showItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
}
