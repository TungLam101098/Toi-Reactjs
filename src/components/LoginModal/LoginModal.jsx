import React, {useState} from 'react';

import { Alert } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import modalAction from '../../actions/modal.action';
import faceIcon from '../../assets/img/icon/Face.svg';
import instagramIcon from '../../assets/img/icon/Instagram.svg';
import googleIcon from '../../assets/img/icon/Google.svg';
import './LoginModal.scss';

import authentication from './mock-data';

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const LoginModal = (props, ref) => {
  const [isAuth, setIsAuth] = useState(null);
  const dispatch = useDispatch();

  const handleShowForgotPassword = () => {
    dispatch(modalAction.forgotPassword());
  };
  const handleShowSignUp = () => {
    dispatch(modalAction.signUp());
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    
    const cacheEmail = values.email;
    dispatch(modalAction.saveEmail(cacheEmail));
    if (!authentication.isAuth) {
      setIsAuth(false);
      values.password = '';
      setSubmitting(false);
    }
  };

  return (
    <div className="login d-flex flex-column align-items-center" ref={ref}>
      <p className="login-title color-nero size-16 text-center">LOG IN</p>
      <p className="login-greeting size-25 font-title text-center">Hello there, welcome back!</p>
      {isAuth === false ? <Alert message="Email or password is incorrect" type="error" closable={true} /> : null}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LogInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form text-center w-100">
            <label className="login-label size-16 color-nero text-left w-100" htmlFor="login-email">EMAIL</label>
            <Field type="email" name="email" id="login-email" className="login-input size-16 w-100" placeholder="Email" />
            <ErrorMessage className="login-error color-contessa text-left mt-2" name="email" component="div" />
            <label className="login-label size-16 color-nero text-left w-100" htmlFor="login-password">PASSWORD</label>
            <Field type="password" name="password" id="login-password" className="login-input size-16 w-100" placeholder="Password" />
            <ErrorMessage className="login-error color-contessa text-left mt-2" name="password" component="div" />
            <div className="text-left mt-3">
              <div role="button" className="login-forgot-password" onClick={handleShowForgotPassword}>Forgot password</div>
            </div>
            <button type="submit" disabled={isSubmitting} className="login-btn text-white">
              LOG IN
            </button>
          </Form>
        )}
      </Formik>
      <p className="login-or size-16 text-uppercase">or log in with</p>
      <nav className="login-nav">
        <button className="login-nav-btn">
          <img src={faceIcon} alt=""/>
        </button>
        <button className="login-nav-btn">
          <img src={googleIcon} alt=""/>
        </button>
        <button className="login-nav-btn">
          <img src={instagramIcon} alt=""/>
        </button>
      </nav>
      <p className="color-dark-gray-1 login-signup text-uppercase">don&apos;t have an account, <button className="login-signup-btn color-nero text-uppercase" onClick={handleShowSignUp}>sign up here</button></p>
    </div>
  );
};


export default React.forwardRef(LoginModal);
