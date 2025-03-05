const Notification = ({ message1, message2 }) => {
    if ((message1 === null) && (message2 == null)) {
      return null
    }
    else if ((message1 === null) && (message2 !== null)) {
        return (
            <div className='error'>
                {message2}
            </div>
        )
    } else {
        return (
        <div className='success'>
            {message1}
        </div>
        )
    }
  }
export default Notification