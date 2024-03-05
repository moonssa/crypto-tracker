import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { URL } from "./Coins";
interface Params {
  coinId: string;
}
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteState {
  name: string;
}
function Coin() {
  const { coinId } = useParams<Params>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  const { state } = useLocation<RouteState>();
  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`${URL}/${coinId}`)).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceInfo);

      console.log(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title> {state?.name || "Loading"} </Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
