import TronWeb from "tronweb"
const useTronWeb = () => {
  const HttpProvider = TronWeb.providers.HttpProvider;
  const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
  const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
  const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
  const privateKey = "your private key";
  const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
  );
  
};
