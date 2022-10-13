import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";


const Login = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [CONFIG, SET_CONFIG] = useState({
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
  });

  const fetchDataRequest = () => {
    return {
      type: "CHECK_DATA_REQUEST",
    };
  };

  const fetchDataSuccess = (payload) => {
    return {
      type: "CHECK_DATA_SUCCESS",
      payload: payload,
    };
  };

  const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());
  
        dispatch(
          fetchDataSuccess({
          })
        );
    };
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };


  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };



  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  return (
      <div>
        {blockchain.account === "" ||
    blockchain.smartContract === null ? (
        <button className="lognBtn" style={{paddingLeft: 20, paddingRight: 20, marginLeft: 20}} onClick={() => {dispatch(connect())}}>Connect w/ MetaMask</button>
        ) : (
          <>
        <p className="outside" style={{ color: "red"}}><b>CONNECTED!</b></p>
        </>
    )}
                {blockchain.errorMsg !== "" ? (
          <>
          <br></br>

              <p style={{textAlign: 'center', color: 'red'}}><b> {blockchain.errorMsg}</b></p>
          </>
        ) : null}

      </div>
  );
}

export default Login;
