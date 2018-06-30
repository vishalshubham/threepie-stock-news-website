import * as React from 'react';
import { Spin, Alert } from 'antd';

interface LoadingProps {
	content?: JSX.Element;
}

export default class Loading extends React.Component<LoadingProps, any> {

	public render(): JSX.Element {
    return (
			<Spin tip="Loading..." size="large">
   			{this.props.content}
  		</Spin>
    );
  }
    
}
