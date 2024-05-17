import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Timer = ({ value}) => {
    return (
        <>
            <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, top: 0, position: 'absolute' }}>
                <div style={{ width: 200, height: 200, }}>
                    <CircularProgressbar value={value} styles={{color:"#0000"}} minValue={0} maxValue={60} text={value} />
                </div>
            </div>
        </>
    )
}

export default Timer