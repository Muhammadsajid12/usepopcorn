import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader-style">
      <Bars
        height="25"
        width="40"
        color="#808080"
        ariaLabel="bars-loading"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
