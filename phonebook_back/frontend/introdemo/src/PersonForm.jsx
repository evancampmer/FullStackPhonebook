const PersonForm = (props) => {
    return (
      <form onSubmit = {props.addP}>
      <div>
        name: <input 
                value = {props.newN}
                onChange = {props.changeN} />
      </div>
      <div>
        number: <input 
                  value = {props.newNum}
                  onChange = {props.changeNum} />
      </div>
      <div> 
        <button type="submit">add</button>
      </div>
    </form>
    )
  }
export default PersonForm  