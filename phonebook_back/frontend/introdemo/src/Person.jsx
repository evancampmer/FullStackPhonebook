const Person = (props) => {
    return (
      <p>
        {props.name} {props.number}
        <button onClick={props.deleteEntry}>delete</button>
      </p>
    )
  }
export default Person