"use client";

import styled from "styled-components";

interface ContainerProps {
  $fullWidth?: boolean
  $centered?: boolean
  $padding?: string
  $background?: string
}

const Container = styled.div<ContainerProps>`
  max-width: ${props => props.$fullWidth ? '100%' : '1200px'};
  margin: ${props => props.$centered ? '0 auto' : '0'};
  padding: ${props => props.$padding || '20px'};
  background: ${props => props.$background || 'transparent'};
`

export { Container };
