import Tabs from "../Component/Tabs";
import Layout from "../Layout";
import bgimg from "../Assets/bg.png";

const Home = () => {
  return (
    <Layout>
      <div
        className=" bg-cover bg-center h-max"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <Tabs />
      </div>
    </Layout>
  );
};

export default Home;
