import Chart from 'react-google-charts'

export default function JobHuntChart() {
    return (
        <div style={{ marginTop: '2rem', overflowX: 'auto', overflowY: 'hidden' }}>
            <Chart
                width={900}
                height={500}
                chartType="Sankey"
                loader={<div>Loading chart...</div>}
                data={[
                    ['From', 'To', 'Weight'],
                    ['Job applied to: 73', 'Replies: 19', 19],
                    ['Replies: 19', 'Pre-assessments: 5', 5],
                    ['Replies: 19', 'Withdrawn by me: 10', 8],
                    ['Replies: 19', 'Interviews: 9', 6],
                    ['Interviews: 9', 'Offers: 4', 1],
                    ['Interviews: 9', 'Additional interviews: 3', 3],
                    ['Interviews: 9', 'Withdrawn by me: 10', 1],
                    ['Interviews: 9', 'Ghosted: 4', 4],
                    ['Additional interviews: 3', 'Offers: 4', 3],
                    ['Pre-assessments: 5', 'Rejection: 14', 1],
                    ['Pre-assessments: 5', 'Withdrawn by me: 10', 1],
                    ['Pre-assessments: 5', 'Interviews: 9', 3],
                    ['Job applied to: 73', 'Rejection: 14', 13],
                    ['Job applied to: 73', 'No reply: 41', 41],
                ]}
            />
            {/* <div id="sankey_basic" style={{ width: '900px', height: '500px' }}></div> */}
        </div>
    )
}