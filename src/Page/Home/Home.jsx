import Header from "./Header/Header";
import Hold from "../../Components/Hold/Hold";
import useTitle from "../../hooks/useTitle";
import favCon from "../../../public/faviocn.svg"
import FQA from "../../Components/FQA/FQA";
import useLoading from "../../hooks/useLoadding";

const Home = () => {
    useTitle("Earn Edge| Home",favCon);
    const isLoading = useLoading(3000);
    return (
        <div>
            {isLoading ? <Hold text={"Almost Ready Wait a Moment"}/> :
                <div>
                    <Header />
                    <FQA/>
                </div>
            }
        </div>
    );
};

export default Home;