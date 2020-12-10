import { createGlobalStyle } from 'styled-components';
const globalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');
:root {
  --white-shade: #fafafa;
  --black: #000000;
  --white: #ffffff;
  --int-blue: #360ccc;
  
}
*, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    
};
html {
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  font-family: 'Padauk', sans-serif;
  
}
`;
export default globalStyle;
