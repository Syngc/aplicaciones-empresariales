import React from 'react'
import {Button, Input} from 'react-materialize'

const New = (props) => {
  const {
    code,
    name,
    handler,
    nueva,
    one,
    cancel,
    create,
    err,
    msg
  } = props
  return (
    <div>
      <Input placeholder="Código" s={12} label="Código" id="codigo" name='code' value={code} onChange={handler}/>
      {
        !one && (
          nueva &&  (
            <Input placeholder="Nombre" s={12} label="Nombre" id="nombre" name='name' value={name} onChange={handler}/>
          )
        )
      }
      {
        !one && (
          <label>
            New:  
            <input
              name="nueva"
              type="checkbox"
              checked={nueva}
              onChange={handler} 
              style={{opacity:'1', position:'absolute', pointerEvents:'unset'}}
              />
          </label>
        )
      }
      <br></br>
      {
        err && (
          <span style={{color:'red'}}>{msg}</span>
        )
      }
      <div style={{width: '100%', textAlign: "right"}}>
        <Button flat onClick={cancel}>
          Cancelar
        </Button>  
        <Button flat onClick={create}>
          {
            one ? (
              'Unirse'
            ) : (
              'Crear'
            )
          }
        </Button>
      </div>
    </div>
  )
}

export default New
