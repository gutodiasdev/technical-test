import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  #logo {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #register {
    font-size: 12px;
    align-self: flex-end;

    a {
      text-decoration: underline;
    }
  }
`

export { Form };
