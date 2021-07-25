import React from 'react';
import restaurants from '../sample-restaurants';

class Landing extends React.Component{
	state = {
		display: false,
		title: "",
		url: ""
	};

	displayList = () => {
		const {display} = this.state; // const display = this.state.display;
		this.setState({display: !display})
	};

	getTitle = (rest) => {
		const {title, url} = rest;
		this.setState({title, url, display: false}); //title: title, url: url
		
	};

	gotToRest = () => {
		const {url} = this.state;
		console.log(url);
		this.props.history.push(`/restaurant/${url}`);
	};

	rowUp = () => {
		let i = -1;
		let y;
		if(this.state.title){
			restaurants.map(rest => {
				i++;
				if(rest.title == this.state.title){
					if(i==0) y = restaurants.length-1;
					else y = --i;
				}
			});
			this.setState({title: restaurants[y].title, url: restaurants[y].url});
		}
	};

	rowDown = () => {
		let i = -1;
		let y;
		if(this.state.title){
			restaurants.map(rest => {
				i++;
				if(rest.title == this.state.title){
					if(i==restaurants.length-1) y = 0;
					else y = ++i;
				}
			});
			this.setState({title: restaurants[y].title, url: restaurants[y].url});
		}
	};

	closeDisp = () =>{
		console.log('close!');
	};

	render(){
		return(
			<div className="restaurant_select">
				<div className="restaurant_select_top">
					<div onClick={this.displayList} className="restaurant_select_top-header font-effect-outline">
						{ this.state.title ? this.state.title : 'Выбери ресторан'}
					</div>
					<div className="arrow_picker">
						<div onClick={this.rowUp} className="arrow_picker-up"></div>
						<div onClick={this.rowDown} className="arrow_picker-down"></div>
					</div>
				</div>

				{this.state.display ? (
				<div className="restaurant_select_bottom">
					<ul>
						{restaurants.map(rest => {
							return <li onClick={() => this.getTitle(rest)} key={rest.id}>{rest.title}</li>;
						})}
					</ul>
				</div>): null}

				{this.state.title && !this.state.display ? (
					<button onClick={this.gotToRest}>Перейти в ресторан</button>) : null}
			
			</div>

		
		);
	}
}

export default Landing;