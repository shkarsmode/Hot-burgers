import React from 'react';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';

class App extends React.Component{

	state = {
		burgers: {},
		order:{}
	}
	
	componentDidMount(){
		const {params} = this.props.match;

		const localStorageRef = localStorage.getItem(params.restaurantId);
		if(localStorageRef)		
			this.setState({order: JSON.parse(localStorageRef)});

		this.ref = base.syncState(`${params.restaurantId}/burgers`, {
			context: this,
			state: 'burgers'
		});
	}

	componentDidUpdate(){
		const {params} = this.props.match;
		localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order)); 

	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	addBurger = (burger) =>{
		console.log('adBurger', burger);

		// 1. Копия объекта state
		const burgers = {...this.state.burgers};
		// const burgers = {};
		// 2. Добавление нового бургера в переменную burgers
		burgers[`burger${Date.now()}`] = burger;
		// 3. Записать новый объект
		this.setState({burgers});
	}

	updateBurger = (key, updatedBurger) => {
		const burgers = {...this.state.burgers};
		burgers[key] = updatedBurger;
		this.setState({burgers});
	}

	loadSampleBurgers = () =>{
		this.setState({burgers: sampleBurgers})
	}

	addToOrder = (key) =>{
		// 1. Копия стейт
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});
	}

	render(){
		return(
			<div className="burger-paradise">
				<div className="menu">
					<Header title="Very Hot Burger"/>
					<ul className='burgers'>
						{Object.keys(this.state.burgers).map(key => {
							return <Burger 
							key={key}
							index={key}
							addToOrder={this.addToOrder}
							details={this.state.burgers[key]}
							/>
						})}
						
					</ul>
				</div>
				<Order burgers={this.state.burgers} order={this.state.order}/>
				<MenuAdmin 
				addBurger={this.addBurger} 
				loadSample={this.loadSampleBurgers}
				burgers={this.state.burgers}
				updateBurger={this.updateBurger}
				/>
			</div>
		)
	}
}


export default App;