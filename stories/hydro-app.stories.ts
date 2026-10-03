import { html, TemplateResult } from 'lit';
import '../src/hydro-app.js';

export default {
  title: 'HydroApp',
  component: 'hydro-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <hydro-app style="--hydro-app-background-color: ${backgroundColor}" .header=${header}></hydro-app>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
