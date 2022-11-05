import { useState } from 'react';
import QRCode from 'react-qr-code';

function QR(props) {
const [value, setValue] = useState();
const [back, setBack] = useState('#FFFFFF');
const [fore, setFore] = useState('#000000');
const [size, setSize] = useState(100);

return (
	<div className="QR">
		<QRCode
			title="GeeksForGeeks"
			value={props.value}
			bgColor={back}
			fgColor="#EE5A24"
			size="100"
		/>
	</div>
);
}

export default QR;
