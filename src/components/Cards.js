import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>My projects</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore my portfolio, this page!'
              label='Portfolio'
              path='/'
            />
            <CardItem
              src='images/img-10.jpg'
              text='A chat that connects with Discord'
              label='Chat'
              path='/chat'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-11.jpg'
              text='Login/Register page with Supabase'
              label='Tbd'
              path='/signup'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Soon... To be done...'
              label='Tbd'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Soon... To be done...'
              label='Tbd'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
