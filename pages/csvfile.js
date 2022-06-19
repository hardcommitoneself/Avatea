import {useState} from "react";
import {API_URL} from "../src/helpers/constants";
import helpers from "../src/helpers";
import {useWallet} from "use-wallet";
import axios from 'axios';
import Papa from "papaparse";
import InputWithIconSubmit from "../src/components/core/Input/InputWithIconSubmit";
import {Chart} from "../src/components/pages/projects/Vesting/Chart";
import helper from "../src/helpers";
import {useEffect} from "react";

export default function File() {

    const wallet = useWallet();

    const [addresses, setAddresses] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [start, setStart] = useState(0);
    const [cliff, setCliff] = useState(0);
    const [correctedCliff, setCorrectedCliff] = useState(0);
    const [duration, setDuration] = useState(0);
    const [slicePeriodSeconds, setSlicePeriodSeconds] = useState(0);
    const [revocable, setRevocable] = useState(true);

    const handleFileSelect = (event) => {

        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const addressesArray = [];
                const amountsArray = [];

                results.data.map((d) => {
                    amountsArray.push(Object.values(d)[0]);
                    addressesArray.push(Object.values(d)[1]);

                });

                setAddresses(addressesArray);
                setAmounts(amountsArray);
            },
        });

    }

    useEffect(() => {
        setCorrectedCliff(parseInt(cliff) + parseInt(start))
    }, [cliff, start]);

    return (
        <div>
            <form>
                <input type="file" accept=".csv" onChange={handleFileSelect}/>
            </form>

            <table>
                <tr>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>

                {addresses.map((address, index) => {
                    return (
                        <tr key={address}>
                            <td>{address}</td>
                            <td>{amounts[index]}</td>
                        </tr>
                    )
                })}
            </table>
            start
            <InputWithIconSubmit
                id="start"
                name="start"
                type="number"
                placeholder="Duration"
                value={start}
                setValue={setStart}
            />
            cliff
            <InputWithIconSubmit
                id="cliff"
                name="cliff"
                type="number"
                placeholder="Duration"
                value={cliff}
                setValue={setCliff}
            />
            Duration
            <InputWithIconSubmit
                id="duration"
                name="duration"
                type="number"
                placeholder="Duration"
                value={duration}
                setValue={setDuration}
            />
            slicePeriodSeconds
            <InputWithIconSubmit
                id="slicePeriodSeconds"
                name="slicePeriodSeconds"
                type="number"
                placeholder="slicePeriodSeconds"
                value={slicePeriodSeconds}
                setValue={setSlicePeriodSeconds}
            />
            <Chart
                amountVested="100"
                cliff={correctedCliff}
                start={start}
                duration={duration}
                slicePeriodSeconds={slicePeriodSeconds}
                ticker="%"
            />
        </div>
    )
}
