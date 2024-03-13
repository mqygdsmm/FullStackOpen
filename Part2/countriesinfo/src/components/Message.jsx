const Message = ({message}) => {
    if (!message) {
        return null
    }
    const {directive, data} = message
    switch (directive) {
        case 'tooMany': {
            return (
            <div>
                {data}
            </div>
            )
        }
        case 'candidate': {
            const candidates = data
            return (
            <div>
                {candidates.map(candidate => <div key={candidate}>{candidate}</div>)}
            </div>
            )
        }
        case 'info': {
            const info = data
            return (
            <div>
                <h1>{info.name.common}</h1>
                <p>capital {info.capital.join(',')}</p>
                <p>area {info.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(info.languages).map(value => <li key={value}>{value}</li>)}
                </ul>
                <img src={info.flags.png} />
            </div>
            )
        }
        default:
            return null
    }
}

export default Message