import Head from "next/head";
import { Button, Icon } from "@taikai/rocket-kit";
import { useWeb3 } from "../hooks/useWeb3";
import { Container, Main, NavBar, BrandName, Menu , Footer, Title1, Title2, Title3, Title4, SubTitle, Content, Banner, Section}  from "../styles/home";
import ConnectModal from "../components/connect-wallet-modal";
import React, { useEffect, useState } from 'react';
import ClickableEthAddress  from "../components/clickable-eth-address";
import Link from 'next/link';
import Image from 'next/image';
import { ERC1155Standard, ERC721Collectibles, Web3Connection } from "@taikai/dappkit";

export default function Home() {

  const { connected } = useWeb3();
  const [isConnectModal, setConnectModal] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > window.innerHeight * 0.9);
    });
  }, []);

  async function nftCollection() {

    let MULTISIG_CONTRACT = "0xc5EF893518208119968B294eE95d341C48c0f2e0";

    const web3Connection = new Web3Connection({
      web3Host: 'http://127.0.0.1:7545'
    });

    await web3Connection.start();
    await web3Connection.connect();
    const deployer = new ERC1155Standard(web3Connection);

    await deployer.loadAbi();
    const tx = await deployer.deployJsonAbi("https://api.npoint.io/47687dcd634e96f824e3");

    /* Instantiate and use your new ERC1155 Token Contract*/
    const erc1155Contract = new ERC1155Standard(web3Connection, tx.contractAddress);
    await erc1155Contract.start();

    erc1155Contract.mint(MULTISIG_CONTRACT, 0, 1000, '0x00');
    console.log(erc1155Contract);

  }

  return (
    <Container>
      <Head>
        <title>TokenEstate - NFT Market</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={`g-nav fixed flex items-center justify-between w-full px-5 md:px-10 py-2 z-20 backdrop-blur-md ${scroll ? 'text-purple' : 'text-white'}`}>
        <BrandName className="!mb-0 invisible absolute pointer-events-none">TokenEstate - NFT Market</BrandName>
        <svg width="514" height="143" viewBox="0 0 514 143" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M141 92V97.319H151.674V117.502H158.997V97.319H169.671V92H141Z" fill="white"/>
        <path d="M173.387 106.354C173.387 112.839 177.723 117.502 186.393 117.502H194.008C202.678 117.502 207.014 112.839 207.014 106.354V103.148C207.014 96.6632 202.678 92 194.008 92H186.393C177.723 92 173.387 96.6632 173.387 103.148V106.354ZM187.996 96.9182H192.368C197.505 96.9182 199.472 98.8491 199.472 103.294V106.208C199.472 110.616 197.505 112.584 192.368 112.584H187.996C182.896 112.584 180.929 110.616 180.929 106.208V103.294C180.929 98.8491 182.896 96.9182 187.996 96.9182Z" fill="white"/>
        <path d="M232.953 117.502H241.623L227.779 103.658L239.474 92H230.803L219.109 103.658L232.953 117.502ZM218.963 117.502V92H211.422V117.502H218.963Z" fill="white"/>
        <path d="M244.246 106.828C244.246 113.167 248.29 117.502 254.702 117.502H273.756V112.183H255.686C253.463 112.183 251.788 110.726 251.788 108.176V107.046H272.918V101.873H251.788V100.634C251.788 98.667 253.063 97.319 255.686 97.319H273.756V92H254.666C248.29 92 244.246 96.3718 244.246 102.674V106.828Z" fill="white"/>
        <path d="M277.581 92V117.502H285.122V98.9584L301.006 117.502H312.082V92L304.54 92.1093V110.835L288.438 92H277.581Z" fill="white"/>
        <path d="M316.49 106.828C316.49 113.167 320.534 117.502 326.945 117.502H345.999V112.183H327.929C325.707 112.183 324.031 110.726 324.031 108.176V107.046H345.161V101.873H324.031V100.634C324.031 98.667 325.306 97.319 327.929 97.319H345.999V92H326.909C320.534 92 316.49 96.3718 316.49 102.674V106.828Z" fill="white"/>
        <path d="M357.948 106.645H372.12C376.674 106.645 376.528 112.183 372.12 112.219H351.755V117.502H375.108L375.071 117.466C380.208 117.028 382.758 113.422 382.831 109.779C382.904 105.807 379.953 101.8 374.051 101.8H360.207C356.018 101.8 356.163 96.8818 360.207 96.8818H381.046V92H356.965L357.001 92.0364C352.265 92.4372 349.897 95.7524 349.824 99.1041C349.751 102.784 352.484 106.609 357.948 106.645Z" fill="white"/>
        <path d="M386.875 92V97.319H397.549V117.502H404.872V97.319H415.546V92H386.875Z" fill="white"/>
        <path d="M415.474 117.502H423.452C423.452 117.502 427.714 106.281 430.483 100.015C431.248 98.3026 432.123 97.8654 434.272 97.8654C436.422 97.8654 437.296 98.3026 438.061 100.015C440.83 106.281 445.092 117.502 445.092 117.502H453.071C453.071 117.502 446.732 101.326 444.109 96.0439C442.433 92.6558 440.138 92 436.531 92H432.013C428.407 92 426.112 92.6558 424.436 96.0439C421.813 101.326 415.474 117.502 415.474 117.502Z" fill="white"/>
        <path d="M451.577 92V97.319H462.251V117.502H469.574V97.319H480.249V92H451.577Z" fill="white"/>
        <path d="M483.964 106.828C483.964 113.167 488.008 117.502 494.42 117.502H513.474V112.183H495.404C493.182 112.183 491.506 110.726 491.506 108.176V107.046H512.636V101.873H491.506V100.634C491.506 98.667 492.781 97.319 495.404 97.319H513.474V92H494.384C488.008 92 483.964 96.3718 483.964 102.674V106.828Z" fill="white"/>
        <path d="M84.1493 52.5817V46.5006C97.4863 56.1245 106.188 71.7985 106.189 89.4692C106.189 118.666 82.4344 142.421 53.2361 142.421C24.0394 142.421 0.284546 118.666 0.284546 89.4692C0.284546 71.7985 8.986 56.1245 22.326 46.5006V52.5817C11.7936 61.4209 5.08721 74.6758 5.08721 89.4692C5.08721 106.381 13.8536 121.285 27.0823 129.875V0L41.3479 7.86257V136.131C42.9049 136.527 44.4913 136.847 46.1041 137.087V38.6643L60.3697 46.53V137.089C61.9809 136.849 63.5674 136.529 65.1229 136.132V77.4138L79.3916 85.2748V129.873C92.6186 121.285 101.387 106.383 101.387 89.4692C101.387 74.6758 94.6786 61.4209 84.1493 52.5817Z" fill="white"/>
        </svg>

        <Menu className="g-nav__menu ml-5">
          <a href="#s-token">Tokenization</a>
          <a href="#s-project">Project</a>
          <a href="#s-building">Building</a>
          <a href="#s-market">Market</a>
          <a href="#s-legal">Legals</a>
        </Menu>
      </NavBar>
      {isConnectModal && <ConnectModal onClose={()=> setConnectModal(false)}/>}
      <Main>
        <Content className="">
          <Banner className="header-main">
            <figure>
              <video src="/video-intro.mp4" autoPlay muted loop></video>
            </figure>

            <div className="header-main__content">
              <Title3 className="title-sm mb-2">OWNERSHIP REINVENTED</Title3>
              <Title2 className="">Fractional and effortless<br/>real estate investing</Title2>
            </div>
          </Banner>

          <Section className="s-token" id="s-token">
            <Title2 className="text-purple">Benefits of Tokenization</Title2>

            <div className="md:grid-parent">
              <div className="col-span-4">
                <div className="card">
                  <div className="content">
                    <ul className="list-token">
                      <li className="title-token">Efficiency</li>
                      <li><Icon icon="check" fill="#4329A6" />Digitalization and automation of process.</li>
                      <li><Icon icon="check" fill="#4329A6" />Automated compliance and governance.</li>
                      <li><Icon icon="check" fill="#4329A6" />Elimination of Human errors.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="card">
                  <div className="content">
                    <ul className="list-token">
                      <li className="title-token">Features</li>
                      <li><Icon icon="check" fill="#4329A6" />Greater Liquidity</li>
                      <li><Icon icon="check" fill="#4329A6" />Fractional ownership / democratization.</li>
                      <li><Icon icon="check" fill="#4329A6" />Accessibility</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="card">
                  <div className="content">
                    <ul className="list-token">
                      <li className="title-token">Benefits</li>
                      <li><Icon icon="check" fill="#4329A6" />Intangible benefits.</li>
                      <li><Icon icon="check" fill="#4329A6" />Record of transactions.</li>
                      <li><Icon icon="check" fill="#4329A6" />Transparency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section className="s-project" id="s-project">
            <Title2 className="text-purple">The project</Title2>

            <div className="md:grid-parent spacing-big">
            <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="share" fill="#4329A6" />
                  </div>
                  <h2>Blockchain Technology</h2>
                  <p>A secure system safeguarding data and transactions, ensuring integrity and security.</p> 
                </div>
              </div>
              <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="rules" fill="#4329A6" />
                  </div>
                  <h2>Greater Transparency</h2>
                  <p>Security tokens embed ownership rights, responsibilities, and history, ensuring unchangeable ownership.</p>
                </div>
              </div>
              <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="trophy" fill="#4329A6" />
                  </div>
                  <h2>Increased Liquidity</h2>
                  <p>Tokenization facilitates easier trade of assets like private securities or real estate, expanding investor pool and asset value.</p>
                </div>
              </div>
              <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="language" fill="#4329A6" />
                  </div>
                  <h2>Globalization</h2>
                  <p>Tokenization could normalize global trading of physical assets, creating new markets and enabling direct, quick asset exchange worldwide.</p>
                </div>
              </div>
              <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="addMember" fill="#4329A6" />
                  </div>
                  <h2>Reduced Barriers To Entry</h2>
                  <p>Tokenization lowers minimum investment amounts and periods, making investment more accessible and flexible.</p>
                </div>
              </div>
              <div className="card col-span-4">
                <div className="content">
                  <div className="icon-card">
                    <Icon icon="security" fill="#4329A6" />
                  </div>
                  <h2>Protect Brand Reputation</h2>
                  <p>Tokenization ensures product quality standards, fostering customer trust and maintaining brand reputation.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section className="s-building" id="s-building">
            <Title2 className="text-purple">The building</Title2>

            <div className="md:grid-parent mb-20">
              <figure className="md:col-span-5">
                <Image src="/building-1.jpeg" alt="Appartment picture" width="400" height="400" />
              </figure>
              <div className="md:col-span-4 md:col-start-7 flex flex-col justify-center">
                <Title3 className="text-purple">Benalmadena</Title3>
                <p>Benalmadena is a municipality in the province of Malaga and consists of three main areas: Benalmadena Pueblo, Benalmadena Costa and Arroyo de la Miel. The city of Malaga (and the nearest airport) is about 12 km to the west, and Marbella is 42 km to the east. The area has grown rapidly in recent decades due to tourism and has become one of the Costa del Sol's prime investment areas and holiday spots.</p>
                <p>Benalmadena enjoys a subtropical Mediterranean climate, with hot summers and warm winters. Cooling breezes from the sea make the summer heat manageable, temperatures are an average of 30 ºC in summer and 17 ºC in winter.</p>
              </div>
            </div>

            <div className="md:grid-parent mb-20">
              <div className="md:col-span-4 flex flex-col justify-center">
                <Title3 className="text-purple">The location</Title3>
                <p>Selwo Marina is a sea life park that is home to many plant and animal species from all over the world, including dolphins, penguins, sealions, exotic birds, crocodiles, snakes, piranhas, anacondas, sea rays and much more. What’s more, Selwo Marina is a conservation centre where you can learn about how to respect and protect animals’ natural habitats.</p>
                <p>Benalmadena Costa has 10kms of beach. From the quiet cove to the family focused beaches with plenty of activities. The beaches are a mixture of man-made, golden sand and shingle, all are generally well maintained and clean. Take relaxing stroll along the Paseo Marítimo and enjoy all that Benalmadena has to offer.</p>
              </div>
              <figure className="md:col-span-5 md:col-start-7">
                <Image src="/building-02.jpeg" alt="Appartment pictur" width="400" height="400" />
              </figure>
            </div>
          </Section>

          <Section className="s-market" id="s-market">
            <div className="text-center mb-20">
              <Title2 className="text-purple mb-1">The market</Title2>
              <p>Invest in the appartments by buying NFTs sharehold.</p>
              <div className="flex justify-center items-center">
                {!connected && (
                  <Button
                    ariaLabel="Connect your wallet"
                    className="btn"
                    value="Connect your wallet"
                    action={()=> setConnectModal(true)}
                  />
                )}
                {connected && <ClickableEthAddress onClick={()=> setConnectModal(true)}/>}
                <a href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask" target="_blank" rel="noreferrer" className="btn btn-secondary ml-5">
                  <span className="flex justify-center">
                    <span style={{ height: '14px', width: '14px', display: 'inline-block', marginRight: '6px' }}>
                      <Icon icon="metamask" fill="#4329A6" />
                    </span>
                    Create a wallet
                  </span>
                </a>
              </div>
            </div>

            <div className="md:grid-parent mb-20">
              {/* Building 01 */}
              <div className="card real col-span-4">
                <figure className="relative">
                  <figcaption className="price">695.000$ (1.444 tokens)</figcaption>
                  <div className="absolute w-full p-3 flex justify-between">
                    <figcaption className="pill">New building</figcaption>
                    <figcaption className="pill">2022</figcaption>
                  </div>
                  <Image src="/appartment-01.jpeg" alt="Appartment pictur" width="400" height="400" />
                </figure>
                <div className="content">
                  <h4 className="title-xs">Type</h4>
                  <p>Middle Floor Apartment</p>

                  <h4 className="title-xs">Address</h4>
                  <p>29630 Benalmádena, Málaga, España.</p>

                  <h4 className="title-xs">Size</h4>
                  <p className="mb-10">111 m<sup>2</sup> Living Room, 33 m<sup>2</sup> Terrace</p>

                  <h4 className="title-xs">Extras</h4>
                  <p className="mb-10">Pools</p>

                  <div className="flex justify-between pt-5">
                      <h4 className="title-xs"><strong>3</strong> Rooms</h4>
                      <h4 className="title-xs"><strong>2</strong> bathrooms</h4>
                  </div>
                  <div className="pt-10">
                    <Button
                      ariaLabel="Purchase NFT"
                      className="btn"
                      value="Purchase NFT"
                    />
                  </div>
                </div>
              </div>
              
              {/* Building 02 */}
              <div className="card col-span-4">
                <figure>
                  <div className="absolute w-full p-3 flex justify-between">
                    <figcaption className="pill">Coming soon</figcaption>
                  </div>
                  <Image src="/blank-building.png" alt="Appartment pictur" width="400" height="400" />
                </figure>
                <div className="content">
                  <h4 className="title-xs">Type</h4>
                  <p>/</p>

                  <h4 className="title-xs">Address</h4>
                  <p>/</p>

                  <h4 className="title-xs">Size</h4>
                  <p className="mb-10">/</p>

                  <h4 className="title-xs">Extras</h4>
                  <p className="mb-10">/</p>

                  <div className="flex justify-between pt-5">
                      <h4 className="title-xs"><strong>/</strong> Rooms</h4>
                      <h4 className="title-xs"><strong>/</strong> bathrooms</h4>
                  </div>
                </div>
              </div>
              {/* Building 03 */}
              <div className="card col-span-4">
                <figure>
                  <div className="absolute w-full p-3 flex justify-between">
                    <figcaption className="pill">Coming soon</figcaption>
                  </div>
                  <Image src="/blank-building.png" alt="me" width="400" height="400" />
                </figure>
                <div className="content">
                  <h4 className="title-xs">Type</h4>
                  <p>/</p>

                  <h4 className="title-xs">Address</h4>
                  <p>/</p>

                  <h4 className="title-xs">Size</h4>
                  <p className="mb-10">/</p>

                  <h4 className="title-xs">Extras</h4>
                  <p className="mb-10">/</p>

                  <div className="flex justify-between pt-5">
                      <h4 className="title-xs"><strong>/</strong> Rooms</h4>
                      <h4 className="title-xs"><strong>/</strong> bathrooms</h4>
                  </div>
                </div>
              </div>
            </div>

            <Title2 className="text-purple mb-4 text-center text-[28px]">Location of the appartments</Title2>
            <div className="et_pb_tab_content"><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq2wVyr3HOKzPbFyOqxFRyPFcnKaFiqlY" async></script>
              <iframe loading="lazy" width="100%" height="480" frameBorder="0" scrolling="no" src="https://maps.google.it/maps?q=29630 Málaga&amp;output=embed"></iframe>
            </div>
          </Section>

          <Section className="s-legal py-40" id="s-legal">
            <Title2 className="text-purple">Legal and Regulatory Compliance</Title2>

            <div className="md:grid-parent">
              <div className="col-span-5">
                <p>TokenEstate is committed to ensuring responsible and transparent operations, taking all necessary measures to meet regulatory requirements and safeguard the interests of its users and stakeholders. This section provides an overview of the legal framework and regulatory compliance measures implemented by the project.</p>
              </div>
              <div className="col-span-5 col-start-8">
                <p>The TokenEstate operates within the legal framework of its jurisdiction, adhering to all relevant laws and regulations, including:</p>
                <ul className="list-legal">
                  <li>Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) regulations</li>
                  <li>Know Your Customer (KYC) requirements</li>
                  <li>Data protection and privacy laws</li>
                  <li>Intellectual property rights and copyright laws</li>
                </ul>
              </div>
            </div> 
          </Section>
        </Content>        
      </Main>

      <Footer className="g-footer bg-purple text-white px-10">
        <div className="md:grid-parent">
          <div className="col-span-4">
            <Image src="/logo-vertical.svg" width="120" height="120" alt=""></Image>
          </div>
          <div className="col-span-8">
            <div className="flex h-full">
              <div className="mr-10">
                <p><b>Administration</b></p>
                <nav>
                  <Link href="/create">Create an NFT</Link>
                  <Link href="/admin">Admin page</Link>
                </nav>
              </div>
              <div className="mr-10">
                <p><b>Documentation</b></p>
                <nav>
                <a href="/docs_tokenestate.pdf"  target="_blank" rel="noopener noreferrer">Download documentation</a>
                </nav>
              </div>
              <div className="ml-auto flex flex-col justify-end">
                <p className="g-footer__love mb-0">Made with &#x2764; by our team - 2023</p>
              </div>
            </div>
          </div>
        </div>
      </Footer>
    </Container>
  );
}
