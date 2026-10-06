import React from "react";
import './MnbCurrencyRates.css';

export default class MnbCurrencyRates extends React.Component {
    state = {
        date: '',
        rates: [],
        error: null,
    }

    async componentDidMount() {
        // Call GET /api/rates HTTP REST API endpoint
        const res = await fetch('/api/rates')
        const json = await res.json()
        console.log('MnbCurrencyRates json', json)
        // TODO - set state from response
    }

    render() {
        const {date='', rates=[], error=null} = this.state

        return <section className="mnb">

            {error && <p className="mnb-error">Hiba: error</p>}

            <div className="mnb-layout">
                <div className="mnb-table-wrap">
                    <table className="mnb-table">
                        <thead>
                            <tr>
                                <th>Deviza</th>
                                <th>Egység</th>
                                <th>Árfolyam (HUF)</th>
                            </tr>
                        </thead>
                        <tbody>TODO - fill table</tbody>
                    </table>
                </div>

                <form className="mnb-form" >
                    <h3>Átváltó</h3>
                    <label>
                        Összeg
                        <input type="number" name="amount" min="0" step="any" />
                    </label>
                    <label>
                        Ebből
                        <select name="from" >TODO - fill options</select>
                    </label>
                    {/* TODO - handle button click */}
                    <button type="button"  title="Felcserélés">⇅</button>
                    <label>
                        Ebbe
                        <select name="to" >TODO - fill options</select>
                    </label>
                    <output className="mnb-result"></output>
                </form>
            </div>
        </section>
    }
}