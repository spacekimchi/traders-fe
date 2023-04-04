import { ReactComponent as ChartPipe } from '../icons/chart-pipe-svgrepo-com.svg';

interface IconProps {
	name: string,
	color: string,
	size: number,
}

export default function Icons(prop: IconProps) {
	const ICONS: {[key: string]: any} = {
		chartPipe: <ChartPipe height={prop.size} width={prop.size} color={prop.color}/>
	};
	return (
		<>
			{ICONS[prop.name]}
		</>
	);
}
