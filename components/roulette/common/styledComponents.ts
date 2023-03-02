import styled from "styled-components";
import Image from "next/image";
// styled.img
export const NonDraggableImage = styled(Image)`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;
