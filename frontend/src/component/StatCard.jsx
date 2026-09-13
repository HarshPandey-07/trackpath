const StatCard = ({ title, value }) => {
	return (
		<div className="flex flex-col justify-around align-middle bg-(--cards) min-h-24 w-fit md:w-48 p-4 rounded-xl border border-(--border) shadow-(--shadow)">
			<p>{title}</p>
			<h1>{value}</h1>
		</div>
	);
};

export default StatCard;
