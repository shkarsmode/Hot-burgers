import React from 'react';

class Order extends React.Component{

	renderOrder = (key) => {
		const burger = this.props.burgers[key];
		const count = this.props.order[key];

		if(!burger) return null;

		const isAvailable = burger && burger.status === 'available';
		if(!isAvailable)
			return <li class='unavailable' key={key}>Извините, {burger ? burger.name : 'бургер'} временно недоступен</li>

		return <li key={key}>
			<span>
				<span>{count}</span>
				шт. {burger.name}
				<span> {count*burger.price}</span>
				<button className='cancelItem'>&times;</button>
			</span>
		</li>
	}

	render(){
		const orderId = Object.keys(this.props.order);
		const total = orderId.reduce((prevTotal, key) => {
			const burger = this.props.burgers[key];
			const count = this.props.order[key];
			
			const isAvailable = burger && burger.status === 'available';

			if(!burger) return null;

			if(isAvailable) return prevTotal + burger.price * count;
			
			return prevTotal;
			
		}, 0);
		
		return(
			<div className="order-wrap">
				<h2>Ваш Заказ</h2>
							
				<ul className='order'>
					{orderId.map(this.renderOrder)}
				</ul>

				<div className='total'>
					<div className='total_wrap'>
						<div className='total_wrap-final'>
							Итого: {total} ₽
						</div>
					</div>
					</div> 
				
			</div>
		);
	}
}

export default Order;