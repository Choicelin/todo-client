import React from 'react';
import List from './List'
import TypeNew from './TypeNew'
import css from './css/style.css'
import $ from 'jquery'

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			todolist: []
		};
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleUpdate(obj){
		this.setState(obj);

	}
	
	componentDidMount(){
		this.getDatas();
	}


	getDatas() {
		console.log('getDatas')
		$.ajax({
			url:'http://localhost:3000/start',
			type: 'GET',
			dataType: 'json',
			success: (data)=>{
				console.log(data);
				var obj = {};
				obj.todolist = data;
				this.handleUpdate(obj);
				var liList = this.refs.wrap.children[1].children;
				for(var i=0; i<liList.length; i++){
					if(data[i].completed==true){
						liList[i].className = css.active;
					}else{
						liList[i].className = css.forLi;
					}
				}
			},
			error: (err)=>{
				console.log(err);
			}
		});
	}

	delOne = (index) => {
		var todolist = this.state.todolist;
		todolist.splice(index, 1);
		this.setState({todolist:todolist});
	}

	render() {
		console.log('render()');
	    return (
	    	<div className={css.wrap} ref="wrap">
	    		<TypeNew onAdd={this.handleUpdate} todo={this.state} refresh={this.getDatas.bind(this)}/>
	    		<List refresh={this.getDatas.bind(this)} delOne={this.delOne} todo={this.state.todolist} onUpdate={this.handleUpdate}/>
	    	</div>
	    );
    }
}


export default App;