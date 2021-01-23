import React from 'react';
import Slider from 'react-slick';

import './ButtonCarousel/buttonCarousel.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ButtonCarousel ({setButtonNumber}){
		const settings = {
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 21,
				slidesToScroll: 18,
		};

		const buttons = [];

		for (let index = 1; index < 91; index++) {
				buttons.push(<button onClick={()=>setButtonNumber(index)} className="btn btn-success btn-carousel-btn active m-2">{index}</button>);
		}

		return (
				<div className="btn-carousel">
						<Slider {...settings}>
								{buttons}
						</Slider>
				</div>
		);
}

