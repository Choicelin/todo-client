import React from 'react';
import css from './css/style.css';
import $ from 'jquery';

class TypeNew extends React.Component{
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(e){
		e.preventDefault();
		var inputDom = this.refs.inputnew;
		var newthing = inputDom.value.trim();
		if(newthing !== ''){
			var obj = {content:newthing,completed: false}
			$.ajax({
					url:'http://localhost:3000/save',
					type: 'POST',
					dataType: 'json',
					data: obj,
					success:(data) =>{
						this.props.refresh();
					},
					error: function(err){
						console.log(err);
					}
			});
		}
		inputDom.value = '';
	}
	render(){
		return (
			<form onSubmit={this.handleAdd}>
				<input type="text" ref="inputnew" className={css.todoInput} placeholder="typing a newthing todo" autoComplete="off" />
			</form>
		)
	}
}

export default TypeNew;