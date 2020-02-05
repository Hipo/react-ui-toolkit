
### react-ui-toolkit 🧩
Hipo's React based UI Toolkit / [Demo](https://react-ui-toolkit.now.sh/)
  
### Usage  
After installing the `@hipo/react-ui-toolkit` package you can start with simple example  
  
```javascript  
import FormField from "@hipo/react-ui-toolkit/dist/Input";  
import Input from "@hipo/react-ui-toolkit/dist/Input";  
  
// or you can directly import the index  
// import {FormField, Input} from "@hipo/react-ui-toolkit"  
  
function LoginForm() {  
  return (  
    <div>  
      <FormField label="E-mail">  
        <Input name="email"/>  
      </FormField>  
        
      <FormField label="Password">  
        <Input name="password" type="password"/>  
      </FormField>  
    </div>  
  )  
}  
```  
  
### Styling  
Every component holds a minimum amount of CSS, to get more information you can search for `css-in-js`.    
- styled-components   
  
### Storybook  
- To run Storybook `npm run storybook`  
- To generate Storybook build `npm run build-storybook`  
  
### Development  
Minimum system versions  
- `node >= 8.x`  
- `npm >= 6.x`  
- `react >= 16.8`  
  
You can start to development with `npm run dev` command. The command watches for changes and builds the toolkit. If you want to generate a production ready build you can use `npm run build`.  
  
### Linter  
ESLint and Prettier will handle the linting task. You can set a watcher for `npm run prettier:fix` command in your IDE otherwise you need to run prettier manually or right before the production build it'll automatically runs.  
  
The ruleset can be found in [@hipo/eslint-config-base](https://github.com/Hipo/eslint-config-hipo-base),  [@hipo/eslint-config-react](https://github.com/Hipo/eslint-config-hipo-base)  
  
  
### TODO  
 - [ ] Add tests
 - [ ] Components should have basic CSS styles
 - [ ] Add source info of components to Storybook