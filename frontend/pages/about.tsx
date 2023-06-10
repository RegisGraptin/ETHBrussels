import Head from "next/head";
import { Button } from "@taikai/rocket-kit";
import { useWeb3 } from "../hooks/useWeb3";
import { Container, Main, NavBar, BrandName, Menu , Footer, SubTitle, Content, Test}  from "../styles/home";
import ConnectModal from "../components/connect-wallet-modal";
import React, { useEffect, useState } from 'react';
import ClickableEthAddress  from "../components/clickable-eth-address";

export default function About() {

  const { connected } = useWeb3();
  const [isConnectModal, setConnectModal] = useState(false);

  return (
    <Container>
      <Head>
        <title>Web3 BoilerPlate by Lay3rX</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <BrandName>LayerX Web3 Boilerplate About</BrandName>
        <Menu>
          {!connected && (
            <Button
              ariaLabel="Connect"
              className="button"
              color="green"
              value="Connect"
              variant="solid"
              action={()=> setConnectModal(true)}
            />
          )}
          {connected && <ClickableEthAddress onClick={()=> setConnectModal(true)}/>}
        </Menu>
      </NavBar>
      {isConnectModal && <ConnectModal onClose={()=> setConnectModal(false)}/>}
      <Main>
        <Content>
          <SubTitle>Web3 Next.js boilerplate project based on 
            &nbsp;<strong style={{color: "#222"}}>Dappkit</strong>™ + 
            <strong style={{color: "#222"}}>RocketKit</strong>™&nbsp;  🙌
          </SubTitle>
        </Content>        
      </Main>
      <Test>test</Test>
      <Footer>Made with ❤️ by <strong>LayerX</strong> - 2023</Footer>
    </Container>
  );
}
