import { createContext } from "react";
import { useState, useContext } from "react";
export const Context = createContext();

export const ContextProvider = ({children}) =>{
    const [status_function, setStatus_function] = useState(false)
    const [status_function_exit, setStatus_function_exit] = useState(false)
    const [score_point, setScore_point] = useState(false)

    const [web_enabled, setweb_enabled] = useState(false)
    const [authenticate_, setAuthenticate_] = useState(false)

    const [address_context, setAddress_context] = useState(false)
    const [balance_context, setBalance_context] = useState(false)

    const [game_balance_, setGame_balance_] = useState(null)

    const [web_enabled_loading, setWeb_enabled_loading] = useState(false)

    const [authenticate_loading, setAuthenticate_loading] = useState(false)

    const [game_status, setGame_status] = useState(false)

    const [alert_status_play, setAlert_status_play] = useState(false)

    const [alert_status_exit, setAlert_status_exit] = useState(false)

    const [gmt_token_won, setGmt_token_won] = useState(0)

    const [stake_amount, setStake_amount] = useState(0)

    const [stake_address, setStake_address] = useState(0)

    const [game_abi, setGame_abi] = useState(null)

    const [stake_status, setStake_status] = useState(null)

    const [unstake_status, setUnstake_status] = useState(null)

    const [current_stake_status, setCurrent_stake_status] = useState(null)

    const [current_timestamp, setCurrent_timestamp] = useState(null)

    const [rate_stake, setRate_stake] = useState(null)

    const [stake_set, setStake_set] = useState(null)

    const [amount_stake, setAmount_stake] = useState(null)

    const [time_stamp, setTime_stamp] = useState(null)

    const [current_game, setCurrent_game] = useState(null)

    const [fruit_play, setFruit_play] = useState(null)

    const [flamingo_play, setFlamingo_play] = useState(null)

    const [award_token, setAward_token] = useState(null)

    return(
        <Context.Provider value ={{status_function, setStatus_function, status_function_exit, setStatus_function_exit,
        score_point, setScore_point, game_balance_, setGame_balance_,
        web_enabled, setweb_enabled, authenticate_, setAuthenticate_, game_balance_, setGame_balance_, address_context, setAddress_context
        , balance_context, setBalance_context, web_enabled_loading, setWeb_enabled_loading, authenticate_loading, setAuthenticate_loading,
        game_status, setGame_status, alert_status_play, setAlert_status_play, alert_status_exit, setAlert_status_exit,
        gmt_token_won, setGmt_token_won, stake_amount, setStake_amount, stake_address, setStake_address, game_abi, setGame_abi,
        stake_status, setStake_status, stake_status, setStake_status, current_stake_status, setCurrent_stake_status, rate_stake, setRate_stake,
        current_timestamp, setCurrent_timestamp, stake_set, setStake_set, amount_stake, setAmount_stake,
        time_stamp, setTime_stamp, current_game, setCurrent_game, fruit_play, setFruit_play, flamingo_play, setFlamingo_play, 
        unstake_status, setUnstake_status, award_token, setAward_token}}>
            {children}
        </Context.Provider>
    )
}