import styled from "styled-components";

interface ContainerProps {
  $fullWidth?: boolean
  $padding?: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${props => props.$fullWidth ? "100%" : "1200px"};
  margin: 0 auto;
  padding: ${props => props.$padding ? props.$padding : "20px"};

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  #header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
`;