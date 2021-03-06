import React, { useState, useEffect, useCallback } from "react";
import { COINGECKO_API } from "../../config/api-config";
import web3 from "web3";
import axios from "axios";
import StyledGeneralCardLayout from "../../shared/styles/StyledGeneralCardLayout";
import StyledGeneralCardWrapper from "../../shared/styles/StyledGeneralCardWrapper";
import  StyledGeneralButton  from "../../shared/styles/StyledGeneralButton";

const WithdrawBalance = ({ drizzle, drizzleState }) => {
  const [userInput, setUserInput] = useState();
  const [userBalance, setUserBalance] = useState()
  const [dataKey, setDataKey] = useState();
  const [transactionID, setTransactionID] = useState();
  const contract = drizzle.contracts.CrowdclickEscrow;
  const address = drizzle.contracts.CrowdclickEscrow.address;


  const fetchBalance = useCallback(async() => {
    const balance = await contract.methods.balancesOfUser(drizzleState.accounts[0]).call({from: drizzleState.accounts[0]})
    // console.log('datakey fetchbalance', dataKey)
    setUserBalance(balance)
  })

  useEffect(() => {
      if(!userBalance) {
          fetchBalance()
      }
    if (dataKey) {
      // console.log(drizzleState.transactionStack[dataKey]);
    }
  }, [dataKey, drizzleState.transactionStack, fetchBalance, userBalance]);

  const withdraw = async (e) => {
    e.preventDefault()
    const resp = await axios.get(
      `${COINGECKO_API}simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
      { withCredentials: false }
    );
    const currentEthPrice = resp.data.ethereum.usd;

    const withdrawalToEth = userInput / currentEthPrice;
    const withdrawalToWei = web3.utils.toWei(withdrawalToEth.toString());

    const dataKey = await contract.methods["withdrawUserBalance"].cacheSend(
      withdrawalToWei,
      {
        from: drizzleState.accounts[0],
        gas: 500000,
      }
    );
  };

  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Funds As A User</h1>
      </div>
      <StyledGeneralCardWrapper>
        <p>Your current earnings: {userBalance || ""} </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "60%",
          }}
          onSubmit={withdraw}
        >
          <label
            style={{ color: "#9EA0A5", fontWeight: 900 }}
            htmlFor="withdrawInput"
          >
            Amount in Ether:{" "}
          </label>
          <input
            style={{
              width: "380px",
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              height: "38px",
              borderRadius: "4px",
              border: " 1px solid #E2E5ED",
            }}
            id="withdrawInput"
            type="number"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <StyledGeneralButton
            buttonWidth="380px"
            buttonColor="blue"
            buttonTextColor="white"
            type="submit"
          >
            Confirm withdrawal
          </StyledGeneralButton>
        </form>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  );
};

export default WithdrawBalance;
