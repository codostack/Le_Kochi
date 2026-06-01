// import Headercontent3 from "./components/content2";
import HomeHeader from "./components/HomeHeader";
import LeKochiPlatform from "./components/play";
import SignatureDishes from "./components/Signatrue";

export default function Home() {

  return (
    <div>
<HomeHeader />
{/* <Headercontent3/> */}
<SignatureDishes/>
<LeKochiPlatform/>
    </div>
  );
}