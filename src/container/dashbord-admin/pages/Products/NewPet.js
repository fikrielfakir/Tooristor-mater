import React, {useState} from 'react'
import Select from 'react-select'

const options = [
  { value: '10', label: 'Cat' },
  { value: '10', label: 'Dog' }
]

export default function NewPet({onSubmit, onCancel}) {
  const [type, setType] = useState('10')
  const [name, setName] = useState('')

  const activeOption = options.find(o => o.value === type)

  const submit = e => {
    e.preventDefault()
    onSubmit({name, type})
  }

  const cancel = e => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="new-pet page">
      <h1>New Pet</h1>
      <div className="box">
        <form onSubmit={submit}>
          <a className="error button" onClick={cancel}>cancel</a>          
          <button type="submit" name="submit">add pet</button>
        </form>
      </div>
    </div>
  )
}
