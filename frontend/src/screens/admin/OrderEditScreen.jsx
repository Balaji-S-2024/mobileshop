import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
  } from './../../slices/ordersApiSlice';

const OrderEditScreen = () => {
  const { id: orderId } = useParams();
  const [name, setName] = useState(false);

  console.log(orderId);
  console.log(typeof orderId);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useDeliverOrderMutation(orderId);

  const [updateOrder, { isLoading: loadingUpdate }] = useDeliverOrderMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(orderId);
      toast.success('order updated successfully');
      navigate('/admin/orderlist');
      const res = navigate('/admin/orderlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (order) {
      setName(true);
    }
  }, [order]);

  return (
    <>
      <Link to='/admin/orderlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Order</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Delivered or Not</Form.Label>
              <Form.Control
                type='name'
                placeholder='Delivered or Not'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default OrderEditScreen;
