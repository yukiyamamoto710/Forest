import React from 'react';

class AddQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    //invoke the post command
  }

  render() {
    return (
      <div>
        Add Question:
        <form onSubmit={this.handleSubmit}>
          <input placeholder='Add A Question' name='question' value={this.state.question} onChange={this.handleChange}/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default AddQ;