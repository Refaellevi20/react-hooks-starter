export function Chart({ data }) {
    return (
        <ul className="chart">
            {data.map((item) => (
                <li key={item.title}>
                    <span title={item.title} style={{ height: item.value + '%' }}>
                        {item.value.toFixed(2) + '%'}
                    </span>
                </li>
            ))}
        </ul>
    )
}