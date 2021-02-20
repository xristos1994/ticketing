import { useState } from 'react';
import Router from 'next/router';
import useRequest from './../../hooks/useRequest';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onPriceBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value) || isNaN(price) || price <= 0) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onTitleBlur = () => {
    setTitle(title.trim());
  };

  const isFormValid = () => {
    return (
      title.trim().length > 0 &&
      !(isNaN(parseFloat(price)) || isNaN(price) || price <= 0)
    );
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            className='form-control'
            onBlur={onTitleBlur}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Price</label>
          <input
            className='form-control'
            onBlur={onPriceBlur}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors}
        <button className='btn btn-primary' disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
