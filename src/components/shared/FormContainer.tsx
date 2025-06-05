import styled from "styled-components";

interface FormContainerProps {

}

const FormContainer = styled.div<FormContainerProps>`
  width: 400px;
  height: calc(100vh - 40px);
  margin: 0 auto;
  display: grid;
  place-items: center;
`

export { FormContainer };
