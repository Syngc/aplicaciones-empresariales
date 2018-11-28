import React from 'react'
import Select from 'react-select'

const repositoryList = (props) => {
  const {
    repos,
    value,
    handler
  } = props
  let options = repos.map((element) => {
    return {
      value: element.html_url,
      label: element.name
    }
  })
  return (
    <React.Fragment>
      <Select 
        options={options} 
        value={value}
        onChange={handler}
        placeholder="Repositorios"
      />
    </React.Fragment>
  )
}

export default repositoryList
