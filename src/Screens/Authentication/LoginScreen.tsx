import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
import { gql, useMutation } from '@apollo/client'
import Swal from "sweetalert2";
import { setting } from "../../libs/settings";

const LOGIN_MUTATION = gql`
  mutation signIn($input: SignInInput) {
    signIn(input: $input) {
      token
    }
  }
`

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      }
    },
    onError(err) {
      const error = JSON.parse(err?.message);
      Swal.fire({
        icon: 'error',
        title: "Failed",
        text: `${error.errorMessage}`,
        footer: 'Click to see more',
        confirmButtonText: 'Ok',
      });
    },
    onCompleted: ({ signIn }) => {
      localStorage.setItem('token', signIn?.token)
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login to System',
        footer: `Welcome to ${setting.title}`,
        showConfirmButton: false,
        timer: 2000,
      })
      window.location.replace('/')
    }
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn({
      variables: {
        input: {
          email,
          password
        },
      }
    })
  };

  return (
    <>
      <div className="dashboard-main-width">
        <div className="box-form-log-in">
          <Row>
            <Col xl="6" lg="6" md="6" className="box-back-color">
              <div className="content-form-left">
                <div className="title-form">
                  <span>SALA PORTAL</span>
                </div>
                <div className="description-form">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eligendi earum provident amet nihil quos doloremque sed blanditiis est. Porro.
                  </p>
                </div>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6" className="form-ui-login">
              <div className="form-login">
                <div className="icon-logo">
                  <FaUserAlt />
                </div>
                <div className="form-container">
                  <form onSubmit={onSubmit}>
                    <div>
                      <label>Email Adress</label>
                    </div>
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="bottom-padd"></div>
                    <div>
                      <label>Password</label>
                    </div>
                    <div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button>Login</button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
