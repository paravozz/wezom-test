import React from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import './style.scss';


export default ({ children, text }) => {
	const [isCopied, setIsCopied] = React.useState(false);


	React.useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 3000);
		}
	}, [isCopied]);


	return (
		<div className="copyable--container">
			<CopyToClipboard onCopy={() => setIsCopied(true)} text={text}>
				<Tooltip title={isCopied ? 'Copied' : 'Copy'}>
					{
						isCopied
							? <CheckOutlined style={{ color: '#52c41a' }} />
							: <CopyOutlined style={{ color: '#1890ff' }} />
					}
				</Tooltip>
			</CopyToClipboard>
			{children}
		</div>
	)
};
