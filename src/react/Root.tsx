import React, { FC } from 'react';
import { render } from 'react-dom';
import UI from './UI';

const Root: FC = () => <UI />;

render(<Root />, document.getElementById('ui'));
