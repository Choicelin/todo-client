import React from 'react'
import css from './css/style.css'
import $ from 'jquery'

class List extends React.Component{
	constructor(props) {
		super(props);
		this.handleDel = this.handleDel.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleDataBase = this.handleDataBase.bind(this);
		this.flag = true;
	}

	handleDel(id, index){
		console.log('handleDel');
		console.log(id);
		$.ajax({
			url: 'http://localhost:3000/delete',
			type: 'POST',
			dataType: 'json',
			data: {delete: id},
			success: (data) => {
				console.log('del props');
				this.props.delOne(index);
			},
			error: function(err){
				console.log(err);

			}	
		});
		
	}
	handleComplete(id,idx){
		$.ajax({
			url: 'http://localhost:3000/updateCompleted',
			type: 'POST',
			dataType: 'json',
			data: {updateData:[{_id:id},{completed:!this.props.todo[idx].completed}]},
			success: (data) =>{
				this.props.refresh();
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	handleDataBase(id,idx,e){
		$.ajax({
			url: 'http://localhost:3000/update',
			type: 'POST',
			dataType: 'json',
			data: {updateData:[{_id:id},{content:e.target.value}]},
			success: (data)=>{
				this.props.refresh();
			}
		});
		// let that = this;
		// return function(e){
		// 	var oLiIndex = e.target.parentNode.getAttribute('data-index');
		// 	var liList = e.target.parentNode.parentNode.children;
		// 	var dataId = null;
		// 	var dataValue = null;
		// 	$.ajax({
		// 		url: 'http://localhost:3000/start',
		// 		type: 'POST',
		// 		dataType: 'json',
		// 		success: function(data){
		// 			dataId = data[oLiIndex]._id;
		// 			dataValue = liList[oLiIndex].children[0].value;
		// 			var obj = {};
		// 			data[oLiIndex].content = liList[oLiIndex].children[0].value;
		// 			data[oLiIndex].completed = data[oLiIndex].completed;
		// 			obj.todolist = data;
		// 			that.props.onUpdate(obj);
		// 		},
		// 		complete: function(){
		// 			$.ajax({
		// 				url: 'http://localhost:3000/update',
		// 				type: 'POST',
		// 				dataType: 'json',
		// 				data: {updateData:[{_id:dataId},{content:dataValue}]},
		// 				success: function(data){},
		// 				error: function(err){
		// 					console.log(err);
		// 				}
		// 			});
		// 		}
		// 	});
		// }	 
	}
	render(){
		console.log('what happen of list?');
		console.log(this.props.todo);
		if(this.props.todo.length > 0) {

			return (
				<ul className={css.forUl}>
				{
					this.props.todo.map(function(item,index){
						console.log(item);
						return (
							<li className={css.forLi} key={item._id} data-index={index}>
								<input type="text" onBlur={this.handleDataBase.bind(this,item._id, index)} className={css.forLabel} defaultValue={item.content}/>

								<button className={css.forDel} onClick={this.handleDel.bind(this,item._id, index)} data-key={index}>删除</button>
								<button className={css.forComplete} onClick={this.handleComplete.bind(this,item._id, index)}>完成</button>
							</li>
						)
					}.bind(this))
				}
				</ul>
			);
		}else{
			return (
				<div></div>
			)
		}
		
	}
}

export default List