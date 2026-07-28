import './Header.css';

export default function Header() {
	return (
		<header className="header">
			<h2>
				Disbursement
			</h2>
			<div>
				<button>
					Activity
				</button>
				<button>
					Import
				</button>
				<button className="add">
					Add Disbursement
				</button>
			</div>
		</header>
	)
}